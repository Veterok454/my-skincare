import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { setToken, backendUrl } = useContext(ShopContext);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (currentState === 'Sign Up') {
        const res = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });

        if (res.data.success) {
          setToken(res.data.token);
          localStorage.setItem('token', res.data.token);
          setTimeout(() => window.dispatchEvent(new Event('cart:refresh')), 0);
          navigate('/');
        } else {
          toast.error(res.data.message);
        }
      } else {
        const res = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });

        if (res.data.success) {
          setToken(res.data.token);
          localStorage.setItem('token', res.data.token);
          setTimeout(() => window.dispatchEvent(new Event('cart:refresh')), 0);
          window.location.href = '/';
        } else {
          toast.error(res.data.message);
        }
      }
    } catch (error) {
      console.error(error);

      const res = error.response?.data;
      if (res?.field && res?.message) {
        setErrors({ [res.field]: res.message });
      } else {
        toast.error(res?.message || 'Registration failed');
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'
    >
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='niconne-regular text-5xl text-red-start'>
          {currentState}
        </p>
        <hr className='border-none h-[1.5px] w-8 bg-red-start' />
      </div>

      {currentState !== 'Login' && (
        <>
          <input
            onChange={(e) => {
              setName(e.target.value);
              setErrors({ ...errors, name: '' });
            }}
            value={name}
            type='text'
            className='w-full px-3 py-2 border border-gray-800'
            placeholder='Name'
            required
          />
          {errors.name && <p className='text-red-500 text-sm'>{errors.name}</p>}
        </>
      )}

      <input
        onChange={(e) => {
          setEmail(e.target.value);
          setErrors({ ...errors, email: '' });
        }}
        value={email}
        type='email'
        className='w-full px-3 py-2 border border-gray-800'
        placeholder='Email'
        required
      />
      {errors.email && <p className='text-red-500 text-sm'>{errors.email}</p>}

      <input
        onChange={(e) => {
          setPassword(e.target.value);
          setErrors({ ...errors, password: '' });
        }}
        value={password}
        type='password'
        className='w-full px-3 py-2 border border-gray-800'
        placeholder='Password'
        required
      />
      {errors.password && (
        <p className='text-red-500 text-sm'>{errors.password}</p>
      )}

      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot your password?</p>
        <p
          onClick={() =>
            setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login')
          }
          className='cursor-pointer'
        >
          {currentState === 'Login' ? 'Create account' : 'Login Here'}
        </p>
      </div>

      <button
        type='submit'
        style={{ letterSpacing: '2px' }}
        className='bg-red-end text-white px-8 py-3 text-sm hover:bg-red-start active:bg-red-end uppercase tracking-wider transition duration-300 ease-in-out transform hover:scale-105'
      >
        {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );
};

export default Login;
