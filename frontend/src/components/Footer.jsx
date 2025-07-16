import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div>
      <hr className='mt-20' />
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-1 text-sm'>
        <div>
          <Link to='/'>
            <img
              className='mb-5 w-16 md:w-24 lg:w-36 transition duration-300 ease-in-out transform hover:scale-105'
              src={assets.logo}
              alt='logotype'
            />
          </Link>

          <p className='w-full md:w-2/3 text-gray-600'>
            You deserve better. You deserve rituals, not routines. You deserve
            care that feels luxurious yet purposeful, indulgent yet effective.
            Imagine textures that melt into your skin, scents that calm the
            mind, and ingredients that actually make a difference - every single
            day. That’s what Miy delivers.
          </p>
        </div>
        <div>
          <p className='text-xl  text-gray-600 font-medium mb-5'>Company</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <NavLink
              to='/'
              className='flex flex-col gap-1 tracking-wider transition duration-300 ease-in-out transform hover:scale-105'
            >
              <p>Home</p>
            </NavLink>
            <NavLink
              to='/about'
              className='flex flex-col gap-1 tracking-wider transition duration-300 ease-in-out transform hover:scale-105'
            >
              <p>About Us</p>
            </NavLink>

            <NavLink
              to='/terms-conditions'
              className='flex flex-col gap-1 tracking-wider transition duration-300 ease-in-out transform hover:scale-105'
            >
              <p>Terms & Conditions</p>
            </NavLink>
            <NavLink
              to='/privacy-policy'
              className='flex flex-col gap-1 tracking-wider transition duration-300 ease-in-out transform hover:scale-105'
            >
              <p>Privacy Policy</p>
            </NavLink>
            <NavLink
              to='/delivery'
              className='flex flex-col gap-1 tracking-wider transition duration-300 ease-in-out transform hover:scale-105'
            >
              <p>Delivery</p>
            </NavLink>
          </ul>
        </div>
        <div>
          <p className='text-xl  text-gray-600 font-medium mb-5'>
            Get in Touch
          </p>
          <ul className='flex flex-row gap-3'>
            <NavLink
              to='https://www.instagram.com/miytraining/'
              className='flex flex-col gap-1 tracking-wider transition duration-300 ease-in-out transform hover:scale-105'
            >
              <img
                className='w-6 m-auto mb-5'
                src={assets.instagram_icon}
                alt='instagram icon'
              />
            </NavLink>
            <NavLink
              to='https://www.facebook.com/share/1CC5T6bG6H/?mibextid=wwXIfr'
              className='flex flex-col gap-1 tracking-wider transition duration-300 ease-in-out transform hover:scale-105'
            >
              <img
                className='w-6 m-auto mb-5'
                src={assets.facebook_icon}
                alt='facebook icon'
              />
            </NavLink>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className='py-5 text-sm text-center text-gray-600'>
          Copyright &copy; 2025 MIY. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
