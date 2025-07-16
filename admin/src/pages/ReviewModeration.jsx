import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { backendUrl } from '../config';
import { toast } from 'react-toastify';

const ReviewModeration = ({ token }) => {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = useCallback(async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/reviews/admin/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        setReviews(res.data.reviews);
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
      toast.error('Failed to load reviews');
    }
  }, [token]);

  const handleApprove = async (reviewId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/reviews/admin/approve`,
        { reviewId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        toast.success('Review approved');
        fetchReviews();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return (
    <div>
      <h3 className='text-xl font-semibold mb-4'>Review Moderation</h3>
      {reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        <div className='flex flex-col gap-4'>
          {reviews.map((review) => (
            <div
              key={review._id}
              className='border p-4 rounded shadow-sm bg-white'
            >
              <p>
                <strong>User:</strong> {review.userName}
              </p>
              <p>
                <strong>Product:</strong>{' '}
                {typeof review.productId === 'object'
                  ? review.productId.name || 'Unnamed product'
                  : String(review.productId)}
              </p>
              <p>
                <strong>Rating:</strong> {review.rating} / 5
              </p>
              <p>
                <strong>Comment:</strong> {review.comment}
              </p>
              <p>
                <strong>Status:</strong>{' '}
                {review.isApproved ? 'Approved' : 'Pending...'}
              </p>
              {!review.isApproved && (
                <button
                  onClick={() => handleApprove(review._id)}
                  className='mt-2 px-4 py-2 bg-red-start text-white rounded hover:bg-red-end'
                >
                  Approve
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewModeration;
