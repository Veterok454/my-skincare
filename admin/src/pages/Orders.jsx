import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../config';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = useCallback(async () => {
    if (!token) return;

    try {
      const response = await axios.get(backendUrl + '/api/order/admin/list', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || 'Something went wrong'
      );
    }
  }, [token]);

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.put(
        backendUrl + `/api/order/admin/${orderId}/status`,
        { status: event.target.value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          'Failed to update status'
      );
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [fetchAllOrders]);

  return (
    <div>
      <h3>Orders</h3>
      <div>
        {orders.map((order, index) => (
          <div
            className='grid grid-cols-1 sm:grid-cols-[1fr_2fr] lg:grid-cols-[0.5fr_2fr_2fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700'
            key={order._id || index}
          >
            <img className='w-12' src={assets.parcel_icon} alt='parcel icon' />
            <div>
              <div>
                {order.items.map((item, i) => (
                  <p key={i}>
                    {item.name} - {item.quantity} x {currency}
                    {item.price.toFixed(2)}
                  </p>
                ))}
                <p className='mt-2 font-semibold'>
                  Subtotal: {currency}
                  {order.itemsAmount?.toFixed(2)}
                </p>
              </div>
            </div>
            <div>
              <p className=' mb-2 font-semibold'>
                {order.address.firstName} {order.address.lastName}
              </p>
              <div>
                <p>{order.address.street}, </p>
                <p>
                  {order.address.city}
                  {','} {order.address.postcode}
                </p>
              </div>
              <p>{order.address.phone}</p>
              {order.userId?.email && <p>{order.userId.email}</p>}
              <p className='mt-3'>Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            </div>

            <select
              onChange={(e) => statusHandler(e, order._id)}
              value={order.status}
              className='p-2 font-semibold'
            >
              <option value='Order Placed'>Order Placed</option>
              <option value='Pending Payment'>Pending Payment</option>
              <option value='Payment Confirmed'>Payment Confirmed</option>
              <option value='Processing'>Processing</option>
              <option value='Shipped'>Shipped</option>
              <option value='Out for Delivery'>Out for Delivery</option>
              <option value='Delivered'>Delivered</option>
              <option value='Cancelled'>Cancelled</option>
              <option value='Refunded'>Refunded</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
