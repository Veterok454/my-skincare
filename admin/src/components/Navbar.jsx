import React from 'react';
import { assets } from '../assets/assets';

const Navbar = ({ setToken }) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
      <img className='w-[max(10%,80px)]' src={assets.logo} alt='Logotype' />
      <button
        onClick={() => setToken('')}
        style={{ letterSpacing: '4px' }}
        className='bg-red-end text-white text-xs px-10 py-4 rounded-full hover:bg-red-start  active:bg-red-end uppercase tracking-wider transition duration-300 ease-in-out transform hover:scale-105'
        type='submit'
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
