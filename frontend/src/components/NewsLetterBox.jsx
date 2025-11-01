import React from 'react';
import { Link } from 'react-router-dom';

const NewsLetterBox = () => {
  return (
    <div className='text-center mt-16 mb-16'>
      <div className='w-full flex justify-center mb-3'>
        <div className='flex flex-col sm:flex-row justify-around gap-2 sm:gap-4 text-center text-xs sm:text-sm md:text-base text-gray-700'>
          <p className='text-2xl text-gray-600 font-medium'>Ready to glow?</p>
          <Link
            to='/collection'
            className='bg-red-end text-white px-8 py-3 text-sm hover:bg-red-start active:bg-red-end uppercase tracking-wider transition duration-300 ease-in-out transform hover:scale-105'
          >
            Explore our collection
          </Link>
        </div>
      </div>
      <p className=' text-xs sm:text-sm md:text-base text-center text-gray-600'>
        Explore our range designed to elevate your daily skincare ritual.
      </p>
    </div>
  );
};

export default NewsLetterBox;
