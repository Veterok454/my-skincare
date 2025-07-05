import React from 'react';

const NewsLetterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };
  return (
    <div className='text-center'>
      <p className='text-2xl  font-medium text-gray-600'>
        Subscribe now & get 20% off
      </p>

      <form
        onSubmit={onSubmitHandler}
        className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border border-gray-400 pl-3 '
      >
        <input
          className='w-full  sm:flex-1 outline-none'
          type='email'
          placeholder='Enter your email'
          required
        />
        <button
          style={{ letterSpacing: '4px' }}
          className='bg-red-end text-white text-xs px-10 py-4 hover:bg-red-start  active:bg-red-end uppercase tracking-wider transition duration-300 ease-in-out transform hover:scale-105'
          type='submit'
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsLetterBox;
