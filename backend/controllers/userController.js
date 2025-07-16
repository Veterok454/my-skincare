import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

// Create JWT token
const createToken = (id, role = 'user') => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Middleware for token verification
const verifyToken = (token) => {
  if (!token) throw new Error('No token provided');
  return jwt.verify(token, process.env.JWT_SECRET);
};

// User Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: 'Email and password are required' });

    if (!validator.isEmail(email))
      return res
        .status(400)
        .json({ success: false, message: 'Please enter a valid email' });

    const user = await userModel.findOne({ email }).select('+password');
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "User doesn't exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(401)
        .json({ success: false, message: 'Invalid credentials' });

    if (typeof user.updateLastLogin === 'function') {
      await user.updateLastLogin();
    }

    const token = createToken(user._id, user.isAdmin ? 'admin' : 'user');
    res.json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error('Login error:', error);
    res
      .status(500)
      .json({ success: false, message: 'Login failed: ' + error.message });
  }
};

// User Register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({
        success: false,
        field: !name ? 'name' : !email ? 'email' : 'password',
        message: 'All fields are required',
      });

    if (name.trim().length < 2)
      return res.status(400).json({
        success: false,
        field: 'name',
        message: 'Name must be at least 2 characters',
      });

    if (!validator.isEmail(email))
      return res.status(400).json({
        success: false,
        field: 'email',
        message: 'Please enter a valid email',
      });

    if (password.length < 8 || !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password))
      return res.status(400).json({
        success: false,
        field: 'password',
        message:
          'Password must be at least 8 characters with uppercase, lowercase and number',
      });

    const exists = await userModel.findOne({ email });
    if (exists)
      return res
        .status(409)
        .json({ success: false, message: 'User already exists' });

    const newUser = new userModel({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      cartData: [],
    });

    const user = await newUser.save();
    const token = createToken(user._id, user.isAdmin ? 'admin' : 'user');

    res.status(201).json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error('Registration error:', error);

    if (error.code === 11000)
      return res
        .status(409)
        .json({ success: false, message: 'Email already exists' });

    res.status(500).json({
      success: false,
      message: 'Registration failed: ' + error.message,
    });
  }
};

// Admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: 'Email and password are required' });

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ email, role: 'admin' }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });
      return res.json({
        success: true,
        token,
        admin: { email, role: 'admin' },
      });
    }

    res
      .status(401)
      .json({ success: false, message: 'Invalid admin credentials' });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({
      success: false,
      message: 'Admin login failed: ' + error.message,
    });
  }
};

// Get cart
const getUserCart = async (req, res) => {
  try {
    const cart = req.user.cartData || [];

    res.json({
      success: true,
      cart,
    });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get cart: ' + error.message,
    });
  }
};

// Update cart
const updateUserCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { cart } = req.body;

    if (!Array.isArray(cart))
      return res
        .status(400)
        .json({ success: false, message: 'Cart must be an array' });

    const cleanedCart = cart.map((item, index) => {
      if (!item.productId || !item.name || !item.price || !item.quantity) {
        throw new Error(`Incomplete item at position ${index + 1}`);
      }
      return {
        ...item,
        image: Array.isArray(item.image) ? item.image[0] : item.image,
      };
    });

    await userModel.findByIdAndUpdate(userId, { cartData: cleanedCart });

    res.json({
      success: true,
      message: 'Cart updated successfully',
    });
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update cart: ' + error.message,
    });
  }
};

// Add to cart
const addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const item = req.body;

    if (!item.productId || !item.name || !item.price || !item.quantity)
      return res
        .status(400)
        .json({ success: false, message: 'Incomplete item data' });

    const user = await userModel.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });

    const existingIndex = user.cartData.findIndex(
      (p) => p.productId === item.productId && p.size === item.size
    );

    if (existingIndex !== -1) {
      user.cartData[existingIndex].quantity += item.quantity;
    } else {
      user.cartData.push({
        ...item,
        image: Array.isArray(item.image) ? item.image[0] : item.image,
      });
    }

    await user.save();

    res.json({
      success: true,
      message: 'Product added to cart successfully',
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add to cart: ' + error.message,
    });
  }
};

// Remove from cart
const removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, size } = req.body;

    if (!productId)
      return res
        .status(400)
        .json({ success: false, message: 'Product ID is required' });

    const user = await userModel.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });

    user.cartData = user.cartData.filter(
      (item) => !(item.productId === productId && (!size || item.size === size))
    );

    await user.save();

    res.json({
      success: true,
      message: 'Product removed from cart successfully',
    });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove from cart: ' + error.message,
    });
  }
};

export {
  loginUser,
  registerUser,
  adminLogin,
  getUserCart,
  updateUserCart,
  addToCart,
  removeFromCart,
};
