import React, { useContext, useState, useCallback } from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext.js';
import { CartContext } from '../context/CartContext.js';
import CartTotal from '../components/CartTotal.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
  const [method, setMethod] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postcode: '',
  });

  const [totals, setTotals] = useState({
    itemsTotal: 0,
    deliveryCharge: 0,
    totalAmount: 0,
  });

  const navigate = useNavigate();
  const { token, backendUrl, userId } = useContext(ShopContext);
  const { cartItems, setCartItems } = useContext(CartContext);

  const validateForm = useCallback(() => {
    const emailRegex = /\S+@\S+\.\S+/;
    const phoneRegex = /^\d{10}$/;
    const errors = {};

    if (!formData.firstName) errors.firstName = 'Please enter your first name';
    if (!formData.lastName) errors.lastName = 'Please enter your last name';
    if (!formData.email || !emailRegex.test(formData.email))
      errors.email = 'Please enter a valid email';
    if (!formData.phone || !phoneRegex.test(formData.phone))
      errors.phone = 'Phone must be 10 digits';
    if (!formData.address) errors.address = 'Please enter your address';
    if (!formData.city) errors.city = 'Please enter your city';
    if (!formData.postcode) errors.postcode = 'Please enter your postcode';
    if (!method) errors.method = 'Please select a payment method';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData, method]);

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      postcode: '',
    });
    setFormErrors({});
    setMethod('');
    setFormSubmitted(false);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    const isValid = validateForm();
    if (!isValid) return;

    if (!userId || !token) return toast.error('User not authenticated');
    if (cartItems.length === 0) return toast.error('Your cart is empty.');

    const orderData = {
      userId,
      items: cartItems,
      address: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        street: formData.address,
        city: formData.city,
        postcode: formData.postcode,
      },
      itemsTotal: totals.itemsTotal,
      deliveryCharge: totals.deliveryCharge,
      amount: totals.totalAmount,
    };

    try {
      const endpoint =
        method === 'stripe'
          ? 'stripe'
          : method === 'paypal'
          ? 'paypal'
          : 'place';

      const res = await axios.post(
        `${backendUrl}/api/order/${endpoint}`,
        orderData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        if (endpoint === 'place') {
          setCartItems([]);
          resetForm();
          toast.success('Order placed successfully');
          navigate('/orders');
        } else {
          window.location.href = res.data.session_url;
        }
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to place order');
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className='grid grid-cols-1 lg:grid-cols-2 w-full gap-10 pt-8 pb-16 border-t px-4 sm:px-8'
    >
      {/* Left side: Delivery Form */}
      <div className='flex flex-col gap-4 w-full '>
        <Title text1='DELIVERY' text2='INFORMATION' />

        {/* First & Last name */}
        <div className='grid grid-cols-2 gap-3'>
          <div>
            <input
              name='firstName'
              className='border rounded py-1.5 px-3.5 w-full'
              type='text'
              placeholder='First name'
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />
            {formSubmitted && formErrors.firstName && (
              <p className='text-red-500 text-sm'>{formErrors.firstName}</p>
            )}
          </div>
          <div>
            <input
              name='lastName'
              className='border rounded py-1.5 px-3.5 w-full'
              type='text'
              placeholder='Last name'
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />
            {formSubmitted && formErrors.lastName && (
              <p className='text-red-500 text-sm'>{formErrors.lastName}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <input
          name='email'
          className='border rounded py-1.5 px-3.5 w-full'
          type='email'
          placeholder='Email address'
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {formSubmitted && formErrors.email && (
          <p className='text-red-500 text-sm'>{formErrors.email}</p>
        )}

        {/* Phone */}
        <input
          name='phone'
          className='border rounded py-1.5 px-3.5 w-full'
          type='tel'
          placeholder='Phone number'
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        {formSubmitted && formErrors.phone && (
          <p className='text-red-500 text-sm'>{formErrors.phone}</p>
        )}

        {/* Address */}
        <input
          name='address'
          className='border rounded py-1.5 px-3.5 w-full'
          type='text'
          placeholder='Address (Street, Number)'
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
        />
        {formSubmitted && formErrors.address && (
          <p className='text-red-500 text-sm'>{formErrors.address}</p>
        )}

        {/* City & Postcode */}
        <div className='grid grid-cols-2 gap-3'>
          <div>
            <input
              name='city'
              className='border rounded py-1.5 px-3.5 w-full'
              type='text'
              placeholder='City'
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
            />
            {formSubmitted && formErrors.city && (
              <p className='text-red-500 text-sm'>{formErrors.city}</p>
            )}
          </div>
          <div>
            <input
              name='postcode'
              className='border rounded py-1.5 px-3.5 w-full'
              type='text'
              placeholder='Postcode'
              value={formData.postcode}
              onChange={(e) =>
                setFormData({ ...formData, postcode: e.target.value })
              }
            />
            {formSubmitted && formErrors.postcode && (
              <p className='text-red-500 text-sm'>{formErrors.postcode}</p>
            )}
          </div>
        </div>
      </div>

      {/* Right side: Cart Total + Payment */}
      <div className='flex flex-col gap-6'>
        <CartTotal onTotalsChange={setTotals} />

        {/* Payment method */}
        <div className=' w-full'>
          <Title text1='PAYMENT' text2='METHOD' />

          <div className='flex mt-4'>
            <div className='flex flex-col gap-2 w-full sm:flex-row  '>
              {['stripe', 'paypal', 'cod'].map((pay) => (
                <div
                  key={pay}
                  onClick={() => setMethod(pay)}
                  className={`flex items-center justify-center gap-1 border px-4 py-2 rounded cursor-pointer flex-1    ${
                    method === pay
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-300'
                  }`}
                >
                  <input
                    type='radio'
                    checked={method === pay}
                    onChange={() => setMethod(pay)}
                    className='mr-2 accent-green-500'
                  />
                  {pay === 'cod' ? (
                    <span className='uppercase text-xs tracking-wider text-center'>
                      Cash on delivery
                    </span>
                  ) : (
                    <img
                      src={assets[`${pay}_logo`]}
                      alt={`${pay} logo`}
                      className='h-5'
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {formSubmitted && formErrors.method && (
            <p className='text-red-500 text-sm mt-2'>{formErrors.method}</p>
          )}

          <div className='w-full text-end mt-8'>
            <button
              className='bg-red-end text-white mt-3 px-8 py-3 text-sm hover:bg-red-start active:bg-red-end uppercase tracking-wider transition duration-300 ease-in-out transform hover:scale-105'
              type='submit'
            >
              Place order
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
