import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';
import Stripe from 'stripe';
import paypal from '@paypal/checkout-server-sdk';
import mongoose from 'mongoose';

// Global variables
const currency = 'GBP';
const deliveryCharge = 10;

// Validation for order data
const validateOrderData = (items, address) => {
  if (!items || !Array.isArray(items)) {
    throw new Error('Invalid items format');
  }

  if (!address || !address.street || !address.city) {
    throw new Error('Complete address is required');
  }

  const filteredItems = items.filter((item) => item.quantity > 0);
  if (filteredItems.length === 0) {
    throw new Error('No valid items in order');
  }

  // Validation for each product
  filteredItems.forEach((item, index) => {
    if (!item.name || !item.price || !item._id) {
      throw new Error(`Invalid item data at position ${index + 1}`);
    }
    if (item.price <= 0) {
      throw new Error(`Invalid price for item: ${item.name}`);
    }
    if (item.quantity <= 0) {
      throw new Error(`Invalid quantity for item: ${item.name}`);
    }
  });

  return filteredItems;
};

// Validation for userId
const validateUserId = (userId) => {
  if (!userId) {
    throw new Error('User ID is required');
  }
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error('Invalid user ID format');
  }
};

// Calculation of the order value
const calculateOrderAmount = (items) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);

// Gateway initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing orders using COD Method
const placeOrder = async (req, res) => {
  try {
    const { userId, items, address } = req.body;

    if (req.user.id !== userId) {
      return res.status(403).json({
        success: false,
        message: 'User ID mismatch — forbidden',
      });
    }

    // Validation
    validateUserId(userId);
    const filteredItems = validateOrderData(items, address);

    const itemsAmount = calculateOrderAmount(filteredItems);
    const totalAmount = itemsAmount + deliveryCharge;

    const orderData = {
      userId,
      items: filteredItems,
      address,
      paymentMethod: 'COD',
      payment: false,
      itemsAmount,
      deliveryCharge,
      totalAmount,
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // Clearing the basket
    await userModel.findByIdAndUpdate(userId, { cartData: [] });

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      orderId: newOrder._id,
      totalAmount: newOrder.totalAmount,
    });
  } catch (error) {
    console.error('COD order error:', error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Placing orders using Stripe Method
const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, address } = req.body;
    const { origin } = req.headers;

    if (!origin) {
      return res.status(400).json({
        success: false,
        message: 'Origin header is required',
      });
    }

    // Checking userId matching
    if (req.user.id !== userId) {
      return res.status(403).json({
        success: false,
        message: 'User ID mismatch — forbidden',
      });
    }

    // Validation
    validateUserId(userId);
    const filteredItems = validateOrderData(items, address);
    const itemsAmount = calculateOrderAmount(filteredItems);
    const totalAmount = itemsAmount + deliveryCharge;

    const orderData = {
      userId,
      items: filteredItems,
      address,
      paymentMethod: 'Stripe',
      payment: true,
      itemsAmount,
      deliveryCharge,
      totalAmount,
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // Create line items for Stripe
    const line_items = filteredItems.map((item) => ({
      price_data: {
        currency,
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    // Add shipping
    line_items.push({
      price_data: {
        currency,
        product_data: {
          name: 'Delivery Charges',
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: 'payment',
    });

    res.json({
      success: true,
      session_url: session.url,
      orderId: newOrder._id,
      totalAmount,
    });
  } catch (error) {
    console.error('Stripe order error:', error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Verify Stripe Payment
const verifyStripe = async (req, res) => {
  try {
    const { orderId, success } = req.body;
    const userId = req.user.id;

    // Validation
    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: 'Order ID is required',
      });
    }

    validateUserId(userId);

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order ID format',
      });
    }

    if (success === 'true') {
      const updatedOrder = await orderModel.findByIdAndUpdate(
        orderId,
        {
          payment: true,
          status: 'Payment Confirmed',
        },
        { new: true }
      );

      if (!updatedOrder) {
        return res.status(404).json({
          success: false,
          message: 'Order not found',
        });
      }

      // Clear the user basket
      await userModel.findByIdAndUpdate(userId, { cartData: [] });

      res.json({
        success: true,
        message: 'Payment verified successfully',
      });
    } else {
      // Delete order if payment is cancelled
      const deletedOrder = await orderModel.findByIdAndDelete(orderId);

      if (!deletedOrder) {
        return res.status(404).json({
          success: false,
          message: 'Order not found',
        });
      }

      res.json({
        success: false,
        message: 'Payment cancelled',
      });
    }
  } catch (error) {
    console.error('Stripe verification error:', error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Initialize PayPal environment
const Environment =
  process.env.NODE_ENV === 'production'
    ? paypal.core.LiveEnvironment
    : paypal.core.SandboxEnvironment;

const paypalClient = new paypal.core.PayPalHttpClient(
  new Environment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET
  )
);

const placeOrderPaypal = async (req, res) => {
  try {
    const { userId, items, address } = req.body;
    const { origin } = req.headers;

    if (!origin) {
      return res.status(400).json({
        success: false,
        message: 'Origin header is required',
      });
    }

    // Validation
    validateUserId(userId);
    const filteredItems = validateOrderData(items, address);

    const cleanedItems = filteredItems.map((item) => ({
      ...item,
      image: Array.isArray(item.image) ? item.image[0] : item.image,
    }));

    const itemsAmount = calculateOrderAmount(filteredItems);
    const totalAmount = itemsAmount + deliveryCharge;

    const orderData = {
      userId,
      items: cleanedItems,
      address,
      paymentMethod: 'PayPal',
      payment: true,
      itemsAmount,
      deliveryCharge,
      totalAmount,
    };

    const newOrder = await new orderModel(orderData).save();

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer('return=representation');

    // Breakdown for PayPal
    const paypalItems = cleanedItems.map((item) => ({
      name: item.name.substring(0, 127),
      quantity: item.quantity.toString(),
      unit_amount: {
        currency_code: 'GBP',
        value: item.price.toFixed(2),
      },
    }));

    // Calculation breakdown for PayPal
    const breakdown = {
      item_total: {
        currency_code: 'GBP',
        value: itemsAmount.toFixed(2),
      },
      shipping: {
        currency_code: 'GBP',
        value: deliveryCharge.toFixed(2),
      },
    };

    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          reference_id: newOrder._id.toString(),
          amount: {
            currency_code: 'GBP',
            value: totalAmount.toFixed(2),
            breakdown,
          },
          items: paypalItems,
          shipping: {
            name: {
              full_name: `${address.firstName} ${address.lastName}`,
            },
            address: {
              address_line_1: address.street,
              admin_area_2: address.city,
              postal_code: address.postcode,
              country_code: 'GB',
            },
          },
          description: `Order ${newOrder._id} - ${paypalItems.length} items`,
        },
      ],
      application_context: {
        brand_name: 'Mia Skin Care',
        landing_page: 'NO_PREFERENCE',
        user_action: 'PAY_NOW',
        return_url: `${origin}/verify?success=true&orderId=${newOrder._id}&provider=paypal`,
        cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}&provider=paypal`,
      },
    });

    const response = await paypalClient.execute(request);

    await orderModel.findByIdAndUpdate(newOrder._id, {
      paymentId: response.result.id, // PayPal Order ID
    });

    const approvalUrl = response.result.links.find(
      (l) => l.rel === 'approve'
    )?.href;
    if (!approvalUrl) throw new Error('PayPal approval URL not found');

    res.json({
      success: true,
      session_url: approvalUrl,
      orderId: newOrder._id,
      paypalOrderId: response.result.id,
      totalAmount,
    });
  } catch (error) {
    console.error('PayPal order error:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Verify PayPal Payment
const verifyPaypal = async (req, res) => {
  try {
    const { orderId, paypalOrderId } = req.body;
    const userId = req.user.id;

    if (!orderId || !paypalOrderId) {
      return res.status(400).json({
        success: false,
        message: 'Order ID and PayPal Order ID are required',
      });
    }

    validateUserId(userId);

    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    if (order.paymentId !== paypalOrderId) {
      return res.status(400).json({
        success: false,
        message: 'PayPal Order ID mismatch',
      });
    }

    const request = new paypal.orders.OrdersCaptureRequest(paypalOrderId);
    request.requestBody({});

    const capture = await paypalClient.execute(request);

    if (capture.result.status === 'COMPLETED') {
      const updatedOrder = await orderModel.findByIdAndUpdate(
        orderId,
        {
          payment: true,
          status: 'Payment Confirmed',
          paymentId: capture.result.id,
        },
        { new: true }
      );

      await userModel.findByIdAndUpdate(userId, { cartData: [] });

      return res.json({
        success: true,
        message: 'PayPal payment verified successfully',
        captureId: capture.result.id,
        order: updatedOrder,
      });
    } else {
      await orderModel.findByIdAndUpdate(orderId, {
        status: 'Payment Failed',
        notes: `PayPal capture status: ${capture.result.status}`,
      });

      return res.status(400).json({
        success: false,
        message: 'PayPal payment capture failed',
        status: capture.result.status,
      });
    }
  } catch (error) {
    console.error('PayPal verification error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Canceling Paypal Order
const cancelPaypalOrder = async (req, res) => {
  try {
    const { orderId, userId } = req.body;

    // Checking userId matching
    if (req.user.id !== userId) {
      return res.status(403).json({
        success: false,
        message: 'User ID mismatch — forbidden',
      });
    }

    validateUserId(userId);

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order ID format',
      });
    }

    // Delete Order if user canceled payment
    const deletedOrder = await orderModel.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    res.json({
      success: true,
      message: 'PayPal order cancelled successfully',
    });
  } catch (error) {
    console.error('PayPal cancel error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// All Orders data for Admin Panel
const allOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, paymentMethod } = req.query;

    // Create filter object
    const filter = {};
    if (status && status !== 'all') {
      filter.status = status;
    }
    if (paymentMethod && paymentMethod !== 'all') {
      filter.paymentMethod = paymentMethod;
    }

    // Pagination
    const pageSize = parseInt(limit);
    const skip = (parseInt(page) - 1) * pageSize;

    // Validate pagination parameters
    if (pageSize < 1 || pageSize > 100) {
      return res.status(400).json({
        success: false,
        message: 'Limit must be between 1 and 100',
      });
    }

    if (parseInt(page) < 1) {
      return res.status(400).json({
        success: false,
        message: 'Page must be greater than 0',
      });
    }

    const orders = await orderModel
      .find(filter)
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize);

    const total = await orderModel.countDocuments(filter);

    res.json({
      success: true,
      orders,
      pagination: {
        page: parseInt(page),
        pageSize,
        total,
        pages: Math.ceil(total / pageSize),
      },
    });
  } catch (error) {
    console.error('All orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders: ' + error.message,
    });
  }
};

// User Order data for Frontend
const userOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    validateUserId(userId);

    const orders = await orderModel.find({ userId }).sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error('User orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user orders: ' + error.message,
    });
  }
};

// Update order status from Admin Panel
const updateStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    // Validation
    if (!orderId || !status) {
      return res.status(400).json({
        success: false,
        message: 'Order ID and status are required',
      });
    }

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order ID format',
      });
    }

    // Check if order exists
    const existingOrder = await orderModel.findById(orderId);
    if (!existingOrder) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Order status updated successfully',
      order: updatedOrder,
    });
  } catch (error) {
    console.error('Update status error:', error);

    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json({
        success: false,
        message: 'Validation error: ' + validationErrors.join(', '),
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to update order status: ' + error.message,
    });
  }
};

export {
  verifyStripe,
  verifyPaypal,
  placeOrder,
  placeOrderStripe,
  placeOrderPaypal,
  allOrders,
  userOrders,
  updateStatus,
};
