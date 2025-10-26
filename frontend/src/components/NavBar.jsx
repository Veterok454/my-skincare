import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets.js';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext.js';
import { CartContext } from '../context/CartContext.js';
import { motion as Motion } from 'framer-motion';

const NavBar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, token, setToken } = useContext(ShopContext);
  const navigate = useNavigate();
  const { cartItems, loadingCart, clearCart } = useContext(CartContext);
  const location = useLocation();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    clearCart();
    navigate('/login');
  };

  return (
    <div className='flex items-center justify-between py-1 font-medium  '>
      <Link to='/'>
        <img
          src={assets.logo}
          className='w-8 md:w-16 lg:w-24 transition duration-300 ease-in-out transform hover:scale-105'
          alt='logotype'
        />
      </Link>

      <ul className='hidden md:flex gap-12 text-lg md:text-md text-gray-700 '>
        <NavLink
          to='/'
          className='flex flex-col items-center gap-1 tracking-wider transition duration-300 ease-in-out transform hover:scale-105 uppercase '
        >
          <p>Home</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink
          to='/collection'
          className='flex flex-col items-center gap-1 tracking-wider transition duration-300 ease-in-out transform hover:scale-105 uppercase'
        >
          <p>Collection</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink
          to='/about'
          className='flex flex-col items-center gap-1 tracking-wider transition duration-300 ease-in-out transform hover:scale-105 uppercase'
        >
          <p>About Us</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
      </ul>
      <div className='flex items-center gap-6'>
        {location.pathname === '/collection' && (
          <img
            onClick={() => setShowSearch(true)}
            className='w-5 cursor-pointer tracking-wider transition duration-300 ease-in-out transform hover:scale-105'
            src={assets.search_icon}
            alt='search icon'
          />
        )}
        <div className='group relative'>
          <img
            onClick={() => (token ? null : navigate('/login'))}
            className='w-5 cursor-pointer tracking-wider transition duration-300 ease-in-out transform hover:scale-105'
            src={assets.profile_icon}
            alt='profile icon'
          />

          {/*Dropdown Menu */}

          {token && (
            <div className='absolute dropdown-menu right-0 pt-4 group-hover:block hidden'>
              <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                <p className='cursor-pointer hover:text-black'>My Profile</p>
                <p
                  onClick={() => navigate('/orders')}
                  className='cursor-pointer hover:text-black'
                >
                  Orders
                </p>
                <p onClick={logout} className='cursor-pointer hover:text-black'>
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>
        <Link to='/cart' className='relative'>
          <img
            className='w-5 min-w-5 tracking-wider transition duration-300 ease-in-out transform hover:scale-105'
            src={assets.cart_icon}
            alt='cart icon'
          />
          {!loadingCart && cartItems.length > 0 && (
            <Motion.div
              key={cartItems.length}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              style={{
                position: 'absolute',
                bottom: '-5px',
                right: '-5px',
                background: '#8B6369',
                color: 'white',
                borderRadius: '50%',
                padding: '2px 6px',
                fontSize: '8px',
              }}
            >
              {totalItems}
            </Motion.div>
          )}
        </Link>
        <img
          onClick={() => setVisible(true)}
          className='w-5 cursor-pointer md:hidden tracking-wider transition duration-300 ease-in-out transform hover:scale-105'
          src={assets.menu_icon}
          alt='menu icon'
        />
      </div>
      {/* Sidebar menu for medium screens */}
      <div
        className={`mobile-nav absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? 'w-full' : 'w-0'
        }`}
      >
        <div className='flex flex-col text-gray-600'>
          <div
            onClick={() => setVisible(false)}
            className='flex items-center gap-4 p-3 cursor-pointer'
          >
            <img
              className='h-4 rotate-180'
              src={assets.dropdown_icon}
              alt='dropdown icon'
            />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            to='/'
            className={({ isActive }) =>
              `mobile-link py-2 pl-6 border uppercase ${
                isActive ? 'bg-black text-white' : 'text-gray-600'
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            to='/collection'
            className={({ isActive }) =>
              `mobile-link py-2 pl-6 border uppercase ${
                isActive ? 'bg-black text-white' : 'text-gray-600'
              }`
            }
          >
            Collection
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            to='/about'
            className={({ isActive }) =>
              `mobile-link py-2 pl-6 border uppercase ${
                isActive ? 'bg-black text-white' : 'text-gray-600'
              }`
            }
          >
            About us
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
