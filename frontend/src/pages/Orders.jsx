import React, { useCallback, useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = useCallback(async () => {
    if (!token) return;

    try {
      const response = await axios.get(backendUrl + '/api/order/user/orders', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Fetched orders:', response.data.orders);
      setOrderData(response.data.orders || []);
    } catch (error) {
      console.error('Failed to load orders:', error);
    }
  }, [token, backendUrl]);

  useEffect(() => {
    loadOrderData();
  }, [loadOrderData]);

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div>
        {orderData.length === 0 && (
          <p className='text-center text-gray-500 mt-10'>
            You have no orders yet.
          </p>
        )}

        {orderData.map((order, orderIndex) => (
          <div key={orderIndex}>
            {order.items.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row gap-4'
              >
                <div className='flex gap-4 sm:gap-6 md:flex-1'>
                  <img
                    className='w-20 h-full object-cover rounded-md'
                    src={item.image[0]}
                    alt='product image'
                  />
                  <div className='flex flex-col gap-1'>
                    <p className='sm:text-base font-semibold'>{item.name}</p>
                    <div
                      className='flex flex-wrap items-center gap-1
                     text-base text-gray-700'
                    >
                      <p>
                        {currency}
                        {item.price}
                      </p>
                      <p>
                        Quantity:{' '}
                        {item.quantity > 0 ? item.quantity : 'Invalid quantity'}
                      </p>
                      <p>
                        Subtotal: {currency}
                        {(item.price * (item.quantity || 1)).toFixed(2)}
                      </p>
                    </div>
                    <p>
                      Date:{' '}
                      <span className='text-gray-400'>
                        {new Date(order.createdAt).toDateString()}
                      </span>
                    </p>
                    <p>
                      Payment:{' '}
                      <span className='text-gray-400'>
                        {order.paymentMethod}
                      </span>
                    </p>
                  </div>
                </div>

                <div className='md:w-1/4 flex justify-start md:justify-center items-center'>
                  <div className='flex items-center gap-2'>
                    <span className='w-2 h-2 rounded-full bg-green-400'></span>
                    <span className='text-sm md:text-base'>{order.status}</span>
                  </div>
                </div>

                <div className='md:w-1/4 flex justify-start md:justify-end items-center'>
                  <button
                    onClick={loadOrderData}
                    className='border px-4 py-2 text-sm font-medium rounded-sm hover:bg-gray-100 transition'
                    type='button'
                  >
                    Track Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
