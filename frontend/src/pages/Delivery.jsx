import React, { useContext } from 'react';
import Title from '../components/Title';
import { ShopContext } from '../context/ShopContext';

const Delivery = () => {
  const { currency } = useContext(ShopContext);
  return (
    <div>
      <div className='text-2xl text-center p-8 border-t'>
        <Title text1={'DELIVERY'} text2={'OPTIONS'} />
      </div>
      <div className='border px-10 md:px-20 py-10 md:py-20 mx-10 md:mx-20 text-gray-600 shadow-xl rounded-xl '>
        <div className='flex justify-between text-xl font-semibold'>
          <p className=''>Tracked Delivery</p>
          <p>{currency}3.95</p>
        </div>
        <ul>
          <li>- Delivered in 2-3 days from dispatch</li>
          <li>- Free on all orders over £80.00</li>
        </ul>

        <div className='flex justify-between text-xl font-semibold pt-5'>
          <p>Click and Collect now</p>
          <p>{currency}1.50</p>
        </div>
        <ul>
          <li>- Free for orders over £30.00</li>
          <li>- £1.50 for orders under £30.00</li>
          <li>- Choose from over 8500 collection points</li>
          <li>- Save your favourite locations for future orders</li>
          <li>
            - Receive a notification when your order is available for collection
          </li>
          <li>
            - Delivered within 2-3 days and available for collection for a
            further 10 days
          </li>
        </ul>
        <div className='flex justify-between text-xl font-semibold pt-5'>
          <p>Next Day Delivery</p>
          <p>{currency}5.99</p>
        </div>
        <ul>
          <li>
            - Enjoy Complimentary Next Day Delivery available on orders over
            £100
          </li>
          <li>
            - Order before 1am for next day delivery, 7 days per week.
            Restrictions apply. Restrictions apply
          </li>
        </ul>
        <p className=' font-semibold'>
          During busy period's some Premium/Express delivery services may be
          temporarily unavailable
        </p>
        <div className='flex justify-between text-xl font-semibold pt-5'>
          <p>Next Day Click & Collect</p>
          <p>{currency}5.99</p>
        </div>

        <ul>
          <li>Choose from over 8500 collection points</li>
          <li>Save your favourite locations for future orders </li>
          <li>
            Receive a notification when your order is available for collection
          </li>
          <li>
            Delivered within 1 day and available for collection for a further 10
            days
          </li>
          <li>
            Order before 1am for next day delivery, 7 days per week.
            Restrictions apply
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Delivery;
