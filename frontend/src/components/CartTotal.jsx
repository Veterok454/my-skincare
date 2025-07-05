import React, { useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext.js';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = ({ onTotalsChange }) => {
  const { cartItems } = useContext(CartContext);
  const { currency } = useContext(ShopContext);

  // Sum of all items
  const itemsTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  //  Delivery
  const deliveryCharge = 10;

  // Total Amount
  const totalAmount = itemsTotal + deliveryCharge;

  useEffect(() => {
    if (onTotalsChange) {
      onTotalsChange({
        itemsTotal,
        deliveryCharge,
        totalAmount,
      });
    }
  }, [itemsTotal, deliveryCharge, totalAmount, onTotalsChange]);

  return (
    <div className='w-full'>
      <div>
        <Title text1='CART' text2='TOTALS' />
      </div>
      <div className='flex flex-col gap-2 mt-2 text-base text-gray-600'>
        <div className='flex justify-between'>
          <p>Cart subtotal:</p>
          <p>
            {currency}
            {itemsTotal.toFixed(2)}
          </p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <p>Delivery:</p>
          <p>
            {currency}
            {deliveryCharge.toFixed(2)}
          </p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <b>Total:</b>
          <b>
            {currency}
            {totalAmount.toFixed(2)}
          </b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
