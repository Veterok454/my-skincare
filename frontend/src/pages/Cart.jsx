import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext.js';
import { ShopContext } from '../context/ShopContext.js';
import Title from '../components/Title.jsx';
import CartTotal from '../components/CartTotal.jsx';
import { assets } from '../assets/assets.js';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, updateCartItemQuantity, removeFromCart } =
    useContext(CartContext);
  const { currency } = useContext(ShopContext);
  const navigate = useNavigate();

  const [totals, setTotals] = useState({
    itemsTotal: 0,
    deliveryCharge: 0,
    totalAmount: 0,
  });

  const handleCheckout = () => {
    navigate('/place-order', {
      state: {
        ...totals,
      },
    });
  };

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'MY'} text2={'CART'} />
      </div>

      {cartItems.length === 0 ? (
        <p>Cart empty</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item._id}
              className='grid grid-cols-1  sm:grid-cols-[0.4fr_2fr_1fr_1fr_0.4fr] items-center gap-4 border-b border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700'
            >
              <img
                src={
                  Array.isArray(item.image) && item.image.length > 0
                    ? item.image[0]
                    : '/fallback.jpg'
                }
                alt={item.name}
                className='w-16 sm:w-20 object-cover rounded'
              />

              <div>
                <p className='text-sm sm:text-lg font-semibold'>{item.name}</p>

                <p>
                  {currency} {item.price.toFixed(2)}
                </p>
              </div>

              <div className='text-sm sm:text-lg'>
                <span>Quantity: </span>
                <input
                  type='number'
                  min='1'
                  value={item.quantity}
                  onChange={(e) => {
                    const qty = parseInt(e.target.value);
                    if (qty >= 1) updateCartItemQuantity(item._id, qty);
                  }}
                  className='w-16 border p-1 text-center'
                />
              </div>

              <p className='text-sm sm:text-lg'>
                Subtotal: {currency}
                {(item.price * item.quantity).toFixed(2)}
              </p>

              <button onClick={() => removeFromCart(item._id)}>
                <img
                  src={assets.bin_icon}
                  alt='Remove'
                  className='w-4 mr-4 sm:w-5 m-auto'
                />
              </button>
            </div>
          ))}

          <CartTotal onTotalsChange={setTotals} />

          {/* CHECKOUT BUTTON */}
          <div className='flex justify-end mt-8'>
            <button
              onClick={handleCheckout}
              className='bg-red-end text-white px-8 py-3 text-sm hover:bg-red-start active:bg-red-end uppercase tracking-wider transition duration-300 ease-in-out transform hover:scale-105'
              type='button'
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
