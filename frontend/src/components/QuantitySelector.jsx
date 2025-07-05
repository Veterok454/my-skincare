import React, { useState } from 'react';

const QuantitySelector = ({ min = 1, max = 10, onChange }) => {
  const [quantity, setQuantity] = useState(min);

  const handleDecrease = () => {
    if (quantity > min) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onChange && onChange(newQuantity);
    }
  };

  const handleIncrease = () => {
    if (quantity < max) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onChange && onChange(newQuantity);
    }
  };

  return (
    <div className='flex items-center gap-2 '>
      <button
        onClick={handleDecrease}
        className='px-2  bg-white hover:bg-red-end hover:text-white border border-gray-400 rounded'
      >
        −
      </button>
      <span className='text-lg font-medium p-1'>{quantity}</span>
      <button
        onClick={handleIncrease}
        className='px-2 bg-white hover:bg-red-end  hover:text-white border border-gray-400 rounded'
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
