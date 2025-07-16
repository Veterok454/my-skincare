import Review from '../models/reviewModel.js';

export const addReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;

    if (!productId || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    const review = new Review({
      productId,
      userId: req.user._id,
      userName: req.user.name,
      rating: parseInt(rating),
      comment,
    });

    try {
      await review.save();
    } catch (err) {
      if (err.code === 11000) {
        return res.status(409).json({
          success: false,
          message: 'You have already submitted a review for this product',
        });
      }
      throw err;
    }

    res.status(201).json({
      success: true,
      message: 'Review submitted and pending admin approval',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await Review.find({ productId, isApproved: true }).sort({
      createdAt: -1,
    });

    res.json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const approveReview = async (req, res) => {
  try {
    const { reviewId, adminComment } = req.body;

    const updated = await Review.findByIdAndUpdate(
      reviewId,
      { isApproved: true, adminComment },
      { new: true }
    );

    res.json({ success: true, message: 'Review approved', review: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .sort({ createdAt: -1 })
      .populate('productId', 'name');
    res.json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
