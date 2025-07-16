import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, subName, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link
      className='text-gray-700 cursor-pointer flex flex-col h-full'
      to={`/product/${id}`}
    >
      <div className='overflow-hidden'>
        <img
          className='hover:scale-110 transition ease-in-out'
          src={image}
          alt='product'
        />
      </div>
      <div className='pt-3 pb-1 text-sm min-h-[3rem]'>
        {name} {'–'} {subName}
      </div>

      <div className='text-sm font-medium mt-auto'>
        {currency}
        {price}
      </div>
    </Link>
  );
};

export default ProductItem;
