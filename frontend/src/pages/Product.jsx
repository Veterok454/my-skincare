import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext.js';
import { CartContext } from '../context/CartContext.js';
import { toast } from 'react-toastify';
import axios from 'axios';
import QuantitySelector from '../components/QuantitySelector.jsx';
import RelatedProducts from '../components/RelatedProducts.jsx';

const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products, currency, token, backendUrl } = useContext(ShopContext);
  const { addToCart } = useContext(CartContext);

  const [productData, setProductData] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const [activeTab, setActiveTab] = useState('description');

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchReviews = useCallback(async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/reviews/${productId}`
      );
      if (response.data.success) {
        setReviews(response.data.reviews.filter((r) => r.isApproved));
      }
    } catch (error) {
      console.error('Failed to load reviews', error);
    }
  }, [backendUrl, productId]);

  const fetchProductData = useCallback(() => {
    const item = products.find((item) => item._id === productId);
    if (item) {
      setProductData(item);
      setSelectedImage(item.image?.[0] || '');
    }
  }, [productId, products]);

  useEffect(() => {
    fetchProductData();
    fetchReviews();
  }, [fetchProductData, fetchReviews]);

  const handleAdd = () => {
    if (!token) {
      toast.info('Please login to use the cart');
      navigate('/login');
      return;
    }
    addToCart(productData, quantity);
    // Show "Added!" state
    setIsAdded(true);
    // Reset back to "Add to Cart" after 2 seconds
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!rating || !comment.trim()) {
      toast.error('Please provide both rating and comment');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${backendUrl}/api/reviews/add`,
        { productId, rating: parseInt(rating), comment: comment.trim() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        toast.success('Review submitted for approval');
        setRating('');
        setComment('');
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error('Failed to submit review');
      }
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <span key={i} className='text-yellow-500'>
            ★
          </span>
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <span key={i} className='text-yellow-500'>
            ☆
          </span>
        );
      } else {
        stars.push(
          <span key={i} className='text-gray-300'>
            ☆
          </span>
        );
      }
    }
    return stars;
  };

  if (!productData) return <div className='opacity-0'></div>;

  const thumbnailImages = productData.image?.slice(1, 5) || [];
  const averageRating = calculateAverageRating();

  return (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/*Product Data */}
      <div className='flex gap-6 sm:gap-6 flex-col sm:flex-row'>
        {/*Product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {thumbnailImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Product thumbnail ${index + 1}`}
                className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
          <div className='w-full sm:w-[90%]'>
            <img
              className='w-full h-auto'
              src={selectedImage}
              alt='Main product'
            />
          </div>
        </div>
        {/*Product Info */}
        <div className='flex-1'>
          <h1 className='font-bold text-2xl text-red-start sm:text-xl lg:mt-5'>
            {productData.name}
          </h1>

          <h2 className='font-semibold text-2xl text-red-start  sm:text-xl lg:mt-2'>
            {productData.subName}
          </h2>
          <h3 className=' text-xl text-red-start  sm:text-xl lg:mt-2'>
            ({productData.size})
          </h3>

          <div className='flex items-center gap-1 lg:mt-2'>
            <div className='flex items-center'>
              {renderStars(averageRating)}
            </div>
            <span className='text-sm text-gray-600'>({averageRating})</span>
          </div>

          <p className=' text-2xl text-red-start font-medium lg:mt-5'>
            {currency}
            {productData.price}
          </p>
          <div className='flex flex-row items-center gap-8 text-red-start text-xl lg:mt-5 '>
            <p>Quantity:</p>
            <QuantitySelector
              min={1}
              max={10}
              onChange={handleQuantityChange}
              quantity={quantity}
            />
          </div>
          <button
            onClick={handleAdd}
            disabled={isAdded}
            style={{ letterSpacing: '2px' }}
            className={`
              mt-3 px-8 py-3 text-sm text-white uppercase lg:mt-5 tracking-wider 
              transition-all duration-300 ease-in-out transform hover:scale-105
              ${
                isAdded
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-red-end hover:bg-red-start active:bg-red-end'
              }
              disabled:cursor-not-allowed
            `}
            type='submit'
          >
            {isAdded ? (
              <span className='flex items-center justify-center gap-2'>
                Added!
              </span>
            ) : (
              'Add to cart'
            )}
          </button>
          <hr className='mt-3 sm:w-4/5 lg:mt-5' />
          <div className='text-sm text-gray-500 mt-1 flex flex-col lg:mt-5'>
            <p>100% Original product.</p>
            <p>Luxurious Beauty Essentials.</p>
            <p>Purposeful, Indulgent yet Effective.</p>
          </div>
        </div>
      </div>
      {/*Description and Review Section */}
      <div className='mt-3 lg:mt-10'>
        <div className='flex'>
          <button
            onClick={() => setActiveTab('description')}
            className={`border px-5 py-3 text-sm ${
              activeTab === 'description' ? 'bg-white font-bold' : 'bg-gray-100'
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`border px-5 py-3 text-sm ${
              activeTab === 'reviews' ? 'bg-white font-bold' : 'bg-gray-100'
            }`}
          >
            Reviews ({reviews.length})
          </button>
        </div>

        <div className='flex flex-col gap-4 border px-6 py-6 w-full text-gray-500'>
          {activeTab === 'description' ? (
            <>
              <p>{productData.description}</p>
              <h2 className='text-gray-600 font-bold'>✨ Key Benefits:</h2>
              <ul>
                {(productData.benefits || []).slice(0, 5).map((b, i) => (
                  <li key={i}>✓ {b}</li>
                ))}
              </ul>
              <p className='font-bold text-gray-600'>
                {productData.conclusion}
              </p>
            </>
          ) : (
            <>
              {/* Reviews Summary */}
              {reviews.length > 0 && (
                <div className='mb-6 p-4 bg-gray-50 rounded'>
                  <h3 className='font-semibold text-gray-700 mb-2'>
                    Customer Reviews
                  </h3>
                  <div className='flex items-center gap-4'>
                    <div className='flex items-center gap-2'>
                      {renderStars(averageRating)}
                      <span className='font-medium text-gray-700'>
                        {averageRating} out of 5
                      </span>
                    </div>
                    <span className='text-sm text-gray-600'>
                      Based on {reviews.length} review
                      {reviews.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
              )}

              {/* Reviews List */}
              <div className='space-y-4'>
                {reviews.length === 0 ? (
                  <p className='text-center py-8 text-gray-500'>
                    No reviews yet. Be the first to review!
                  </p>
                ) : (
                  reviews.map((review, index) => (
                    <div key={index} className='border-b pb-4 last:border-b-0'>
                      <div className='flex items-center gap-2 mb-2'>
                        <span className='font-semibold text-gray-700'>
                          {review.userName}
                        </span>
                        <div className='flex items-center gap-1'>
                          {renderStars(review.rating)}
                          <span className='text-sm text-gray-600'>
                            ({review.rating}/5)
                          </span>
                        </div>
                        <span className='text-sm text-gray-500'>
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className='text-gray-600 mb-2'>{review.comment}</p>
                      {review.adminComment && (
                        <div className='bg-blue-50 p-2 rounded text-sm'>
                          <span className='font-medium text-red-start'>
                            Admin note:
                          </span>
                          <span className='text-red-start ml-2'>
                            {review.adminComment}
                          </span>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* Review Form */}
              {token && (
                <div className='mt-6 pt-6 border-t'>
                  <h3 className='font-semibold text-gray-700 mb-4'>
                    Write a Review
                  </h3>
                  <form onSubmit={handleSubmitReview} className='space-y-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Rating *
                      </label>
                      <select
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className='border border-gray-300 rounded px-3 py-2'
                        required
                      >
                        <option value=''>Select Rating</option>
                        {[5, 4, 3, 2, 1].map((r) => (
                          <option key={r} value={r}>
                            {r} Star{r !== 1 ? 's' : ''}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Your Review *
                      </label>
                      <textarea
                        className='border border-gray-300 rounded px-3 py-2 w-full h-24 resize-none'
                        placeholder='Share your thoughts about this product...'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                        maxLength={500}
                      />
                      <div className='text-sm text-gray-500 mt-1'>
                        {comment.length}/500 characters
                      </div>
                    </div>

                    <button
                      type='submit'
                      style={{ letterSpacing: '2px' }}
                      disabled={isSubmitting}
                      className='px-6 py-3 bg-red-end text-white rounded hover:bg-red-start 
                               active:bg-red-end uppercase tracking-wider text-sm
                               transition-all duration-300 ease-in-out transform hover:scale-105
                               disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Review'}
                    </button>
                  </form>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {/*display related products  */}
      <RelatedProducts />
    </div>
  );
};

export default Product;
