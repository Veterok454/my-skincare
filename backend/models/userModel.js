import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
      select: false,
    },
    cartData: {
      type: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product',
            required: true,
          },
          name: {
            type: String,
            required: true,
            trim: true,
          },
          price: {
            type: Number,
            required: true,
            min: [0, 'Price cannot be negative'],
            validate: {
              validator: function (value) {
                return Number.isFinite(value) && value >= 0;
              },
              message: 'Price must be a valid positive number',
            },
          },
          quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity must be at least 1'],
            default: 1,
            validate: {
              validator: function (value) {
                return Number.isInteger(value) && value > 0;
              },
              message: 'Quantity must be a positive integer',
            },
          },
          size: {
            type: String,
            required: false,
          },
          image: {
            type: [String],
            required: true,
            validate: {
              validator: function (arr) {
                return arr.length > 0;
              },
              message: 'At least one image is required',
            },
          },
          addedAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      default: [],
    },
    role: {
      type: String,
      enum: {
        values: ['user', 'admin', 'moderator'],
        message: 'Role must be either user, admin, or moderator',
      },
      default: 'user',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
    },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      postCode: { type: String },
      country: { type: String },
    },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

// Indexes for better productivity
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ role: 1 });
userSchema.index({ isActive: 1 });
userSchema.index({ createdAt: -1 });
userSchema.index({ lastLogin: -1 });

// Middleware for password hashing before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method for comparing passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method for updating last Login
userSchema.methods.updateLastLogin = function () {
  this.lastLogin = new Date();
  return this.save({ validateBeforeSave: false });
};

// Virtual fields in the cart
userSchema.virtual('cartItemsCount').get(function () {
  if (!Array.isArray(this.cartData)) return 0;
  return this.cartData.reduce((total, item) => total + item.quantity, 0);
});

userSchema.virtual('cartTotal').get(function () {
  if (!Array.isArray(this.cartData)) return 0;
  return this.cartData.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
});

userSchema.virtual('fullAddress').get(function () {
  const { street, city, state, zipCode, country } = this.address || {};
  return [street, city, state, zipCode, country].filter(Boolean).join(', ');
});

userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

// Method for adding to the cart
userSchema.methods.addToCart = function (productData) {
  const existingItemIndex = this.cartData.findIndex(
    (item) =>
      item.productId.toString() === productData.productId.toString() &&
      item.size === productData.size
  );

  if (existingItemIndex > -1) {
    this.cartData[existingItemIndex].quantity += productData.quantity || 1;
  } else {
    this.cartData.push({
      ...productData,
      addedAt: new Date(),
    });
  }

  return this.save();
};

// Method for removing from the cart
userSchema.methods.removeFromCart = function (productId, size) {
  this.cartData = this.cartData.filter(
    (item) =>
      !(
        item.productId.toString() === productId.toString() && item.size === size
      )
  );
  return this.save();
};

userSchema.methods.clearCart = function () {
  this.cartData = [];
  return this.save();
};

userSchema.methods.updateCartItemQuantity = function (
  productId,
  size,
  quantity
) {
  const itemIndex = this.cartData.findIndex(
    (item) =>
      item.productId.toString() === productId.toString() && item.size === size
  );

  if (itemIndex > -1) {
    if (quantity <= 0) {
      this.cartData.splice(itemIndex, 1);
    } else {
      this.cartData[itemIndex].quantity = quantity;
    }
  }

  return this.save();
};

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;
