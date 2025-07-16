import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'product',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
      maxLength: 500,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      validate: {
        validator: function (v) {
          return Number.isInteger(v) && v >= 1 && v <= 5;
        },
        message: 'Rating must be an integer between 1 and 5',
      },
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    adminComment: {
      type: String,
      default: '',
      trim: true,
    },
  },

  { timestamps: true }
);

reviewSchema.index({ productId: 1, isApproved: 1 });
reviewSchema.index({ userId: 1, productId: 1 }, { unique: true });
reviewSchema.index({ createdAt: -1 });

const Review = mongoose.models.review || mongoose.model('review', reviewSchema);

export default Review;
