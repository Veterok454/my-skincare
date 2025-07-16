import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProducts = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);
  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 6));
  }, [products]);
  return (
    <div className='my-10'>
      <div className='text-center text-3xl py-8'>
        <Title text1={'CUSTOMERS'} text2={'ALSO BUY'} />
      </div>
      <div className='grid grid-cols-2  md:grid-cols-3 lg:grid-cols-6 gap-4 gap-y-6'>
        {bestSeller.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image?.[1] || '/fallback.jpg'}
            name={item.name}
            subName={item.subName}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
