import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    subName: {
      type: String,
      required: [true, 'Product subName is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    keyBenefits: {
      type: String,
      required: false,
    },
    benefits: {
      type: [String],
      required: [true, 'Product benefits are required'],
      validate: [
        {
          validator: function (arr) {
            return arr.length > 0 && arr.length <= 10;
          },
          message: 'Must have between 1 and 10 benefits',
        },
        {
          validator: function (arr) {
            return arr.every((benefit) => benefit.trim().length > 0);
          },
          message: 'Benefits cannot be empty',
        },
      ],
    },
    conclusion: {
      type: String,
      required: [true, 'Conclusion is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
      validate: {
        validator: function (value) {
          return Number.isFinite(value) && value >= 0;
        },
        message: 'Price must be a valid positive number',
      },
    },
    image: {
      type: [String],
      required: [true, 'At least one image is required'],
      validate: {
        validator: function (arr) {
          return Array.isArray(arr) && arr.length === 5;
        },
        message: 'Must have exactly 5 images',
      },
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
    },
    subCategory: {
      type: String,
      required: [true, 'SubCategory is required'],
    },
    size: {
      type: String,
      required: [true, 'Size is required'],
      trim: true,
    },
    bestseller: {
      type: Boolean,
      default: false,
    },

    sortIndex: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.index({ sortIndex: 1 });

const productModel =
  mongoose.models.product || mongoose.model('product', productSchema);

export default productModel;
