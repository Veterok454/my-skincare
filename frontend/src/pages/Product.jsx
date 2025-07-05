import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext.js';
import { assets } from '../assets/assets.js';
import RelatedProducts from '../components/RelatedProducts.jsx';
import QuantitySelector from '../components/QuantitySelector.jsx';
import { CartContext } from '../context/CartContext.js';
import { CartProvider } from '../context/CartProvider.jsx';

const Product = () => {
  const { productId } = useParams();
  const { products, currency } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [isAdded, setIsAdded] = useState(false);

  const fetchProductData = useCallback(() => {
    const item = products.find((item) => item._id === productId);
    if (item) {
      setProductData(item);
      setImage(item.image[3] || item.image[0]);
    }
  }, [productId, products]);

  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    addToCart(productData, quantity);

    // Show "Added!" state
    setIsAdded(true);

    // Reset back to "Add to Cart" after 2 seconds
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  useEffect(() => {
    fetchProductData();
  }, [fetchProductData]);

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/*Product Data */}
      <div className='flex gap-6 sm:gap-6 flex-col sm:flex-row'>
        {/*Product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
                alt='product image'
              />
            ))}
          </div>
          <div className='w-full sm:w-[90%]'>
            <img className='w-full h-auto ' src={image} alt='product image' />
          </div>
        </div>
        {/*Product Info */}
        <div className='flex-1'>
          <h1 className='font-bold text-2xl text-red-start sm:text-xl lg:mt-5'>
            {productData.name} {''} ({productData.size})
          </h1>
          <h2 className='font-semibold text-2xl text-red-start  sm:text-xl lg:mt-2'>
            {productData.subName}
          </h2>

          <div className='flex items-center gap-1 lg:mt-2'>
            <img src={assets.star_icon} alt='star icon' className='w-3' />
            <img src={assets.star_icon} alt='star icon' className='w-3' />
            <img src={assets.star_icon} alt='star icon' className='w-3' />
            <img src={assets.star_icon} alt='star icon' className='w-3' />
            <img src={assets.star_dull_icon} alt='star icon' className='w-3' />
            <p className=' text-red-start pl-2'>(122)</p>
          </div>

          <p className=' text-2xl text-red-start font-medium lg:mt-5'>
            {currency}
            {productData.price}
          </p>
          <div className='flex flex-row items-center gap-8 text-red-start text-xl lg:mt-5 '>
            <p>Quantity:</p>
            <QuantitySelector
              min={1}
              max={10}
              onChange={handleQuantityChange}
              quantity={quantity}
            />
          </div>
          <button
            onClick={handleAdd}
            disabled={isAdded}
            style={{ letterSpacing: '2px' }}
            className={`
              mt-3 px-8 py-3 text-sm text-white uppercase lg:mt-5 tracking-wider 
              transition-all duration-300 ease-in-out transform hover:scale-105
              ${
                isAdded
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-red-end hover:bg-red-start active:bg-red-end'
              }
              disabled:cursor-not-allowed
            `}
            type='submit'
          >
            {isAdded ? (
              <span className='flex items-center justify-center gap-2'>
                <svg
                  className='w-4 h-4'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                    clipRule='evenodd'
                  />
                </svg>
                Added!
              </span>
            ) : (
              'Add to card'
            )}
          </button>
          <hr className='mt-3 sm:w-4/5 lg:mt-5' />
          <div className='text-sm text-gray-500 mt-1 flex flex-col lg:mt-5'>
            <p>100% Original product.</p>
            <p>Luxurious Beauty Essentials.</p>
            <p>Purposeful, Indulgent yet Effective.</p>
          </div>
        </div>
      </div>
      {/*Description and Review Section */}
      <div className='mt-3 lg:mt-10'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-1 border px-6 py-6 w-full  text-gray-500'>
          <p>{productData.description}</p>
          <h2 className=' text-gray-600 font-bold'>✨ Key Benefits:</h2>
          <ul>
            <li>{productData.benefits[0]}</li>
            <li>{productData.benefits[1]}</li>
            <li>{productData.benefits[2]}</li>
            <li>{productData.benefits[3]}</li>
            <li>{productData.benefits[4]}</li>
          </ul>
          <p className=' font-semibold'>{productData.conclusion}</p>
        </div>
      </div>
      {/*display related products and latest collection */}
      <RelatedProducts />
    </div>
  ) : (
    <div className='opacity-0'></div>
  );
};

export default Product;
