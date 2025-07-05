import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { CartContext } from '../context/CartContext';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Verify = () => {
  const { token: contextToken, backendUrl, userId } = useContext(ShopContext);
  const { clearCart } = useContext(CartContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');
  const provider = searchParams.get('provider'); // stripe or paypal

  useEffect(() => {
    const token = contextToken || localStorage.getItem('token');
    if (!token) {
      toast.error('Unauthorized: Missing token');
      navigate('/login');
      return;
    }

    const verify = async () => {
      try {
        const endpoint =
          provider === 'paypal'
            ? `${backendUrl}/api/order/verifyPaypal`
            : `${backendUrl}/api/order/verifyStripe`;

        const payload =
          provider === 'paypal'
            ? { orderId, paypalOrderId: searchParams.get('token') }
            : { orderId, success };

        const response = await axios.post(endpoint, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          clearCart();
          toast.success('Payment verified successfully');
          navigate('/orders');
        } else {
          toast.error(response.data.message || 'Verification failed');
          navigate('/cart');
        }
      } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || err.message);
        navigate('/cart');
      }
    };

    if (orderId) {
      verify();
    }
  }, [
    contextToken,
    orderId,
    success,
    provider,
    backendUrl,
    navigate,
    clearCart,
    searchParams,
    userId,
  ]);

  return (
    <div className='py-20 text-center text-gray-500'>Verifying payment...</div>
  );
};

export default Verify;
