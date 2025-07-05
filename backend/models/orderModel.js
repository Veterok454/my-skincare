import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Product ID is required'],
    },
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0.01, 'Price must be greater than 0'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [1, 'Quantity must be at least 1'],
      max: [100, 'Quantity cannot exceed 100'],
    },
    size: {
      type: String,
      trim: true,
    },
    image: {
      type: [String],
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length > 0,
        message: 'At least one image is required',
      },
    },
  },
  { _id: false }
);

// Address schema
const addressSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
    },
    street: {
      type: String,
      required: [true, 'Street address is required'],
      trim: true,
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
    },
    postcode: {
      type: String,
      required: [true, 'Postcode is required'],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'User ID is required'],
    },
    items: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: (arr) => arr.length > 0,
        message: 'Order must contain at least one item',
      },
    },
    itemsAmount: {
      type: Number,
      required: true,
      min: [0, 'Items amount must be a positive number'],
    },
    deliveryCharge: {
      type: Number,
      default: 10,
      min: [0, 'Delivery charge cannot be negative'],
    },
    totalAmount: {
      type: Number,
      required: true,
      min: [0, 'Total amount must be a positive number'],
    },
    address: {
      type: addressSchema,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: 'Order Placed',
      enum: {
        values: [
          'Order Placed',
          'Pending Payment',
          'Payment Confirmed',
          'Processing',
          'Shipped',
          'Out for Delivery',
          'Delivered',
          'Cancelled',
          'Refunded',
        ],
      },
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ['COD', 'Stripe', 'PayPal'],
    },
    payment: {
      type: Boolean,
      required: true,
      default: false,
    },
    paymentId: String,
    trackingNumber: String,
    notes: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual fields
orderSchema.virtual('paymentStatus').get(function () {
  if (this.paymentMethod === 'COD') {
    return this.status === 'Delivered' ? 'Paid on Delivery' : 'Pending COD';
  }
  return this.payment ? 'Paid' : 'Pending';
});

// Indexes
orderSchema.index({ userId: 1, createdAt: -1 });
orderSchema.index({ status: 1 });
orderSchema.index({ paymentMethod: 1 });
orderSchema.index({ 'address.postcode': 1 });
orderSchema.index({ createdAt: -1 });

// Middleware
orderSchema.pre('save', function (next) {
  const itemIds = this.items.map((item) => item._id.toString());
  const uniqueIds = [...new Set(itemIds)];

  if (itemIds.length !== uniqueIds.length) {
    return next(new Error('Duplicate items found in order'));
  }

  // Calculate itemsAmount and totalAmount before saving
  this.itemsAmount = this.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  this.totalAmount = this.itemsAmount + (this.deliveryCharge || 0);

  // Initial status/payment logic
  if (this.isNew) {
    if (this.paymentMethod === 'COD') {
      this.status = 'Order Placed';
      this.payment = false;
    } else {
      this.status = 'Pending Payment';
      this.payment = false;
    }
  }

  next();
});

orderSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate();

  if (update.status === 'Shipped' && !update.trackingNumber) {
    update.trackingNumber = `TR${Date.now()}${Math.random()
      .toString(36)
      .substr(2, 4)
      .toUpperCase()}`;
  }

  next();
});

// Method to cancel order
orderSchema.methods.cancel = function (reason) {
  this.status = 'Cancelled';
  this.notes = reason || 'Order cancelled by user';
  return this.save();
};

const orderModel =
  mongoose.models.order || mongoose.model('order', orderSchema);

export default orderModel;
