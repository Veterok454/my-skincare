import React, { useState, useRef } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../config';
import { toast } from 'react-toastify';

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [image5, setImage5] = useState(false);

  const fileInputRef1 = useRef();
  const fileInputRef2 = useRef();
  const fileInputRef3 = useRef();
  const fileInputRef4 = useRef();
  const fileInputRef5 = useRef();

  const [name, setName] = useState('');
  const [subName, setSubName] = useState('');
  const [description, setDescription] = useState('');
  const [benefits, setBenefits] = useState(['']);
  const [conclusion, setConclusion] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Face');
  const [subCategory, setSubCategory] = useState('Washing');
  const [size, setSize] = useState('');
  const [bestseller, setBestseller] = useState(false);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setName('');
    setSubName('');
    setDescription('');
    setBenefits(['']);
    setConclusion('');
    setPrice('');
    setCategory('Face');
    setSubCategory('Washing');
    setSize('');
    setBestseller(false);
    setImage1(false);
    setImage2(false);
    setImage3(false);
    setImage4(false);
    setImage5(false);

    fileInputRef1.current.value = null;
    fileInputRef2.current.value = null;
    fileInputRef3.current.value = null;
    fileInputRef4.current.value = null;
    fileInputRef5.current.value = null;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (benefits.some((b) => b.trim() === '')) {
      return toast.error('Please fill in all benefits or remove empty ones.');
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('name', name);
      formData.append('subName', subName);
      formData.append('description', description);
      formData.append('conclusion', conclusion);
      formData.append('price', parseFloat(price));
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('size', size);
      formData.append('bestseller', bestseller ? 'true' : 'false');

      benefits.forEach((b) => formData.append('benefits', b));
      if (image1) formData.append('image1', image1);
      if (image2) formData.append('image2', image2);
      if (image3) formData.append('image3', image3);
      if (image4) formData.append('image4', image4);
      if (image5) formData.append('image5', image5);

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        resetForm();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('AXIOS ERROR:', error);

      if (error.response && error.response.data) {
        console.error('Server responded with:', error.response.data);

        toast.error(
          typeof error.response.data.message === 'string'
            ? error.response.data.message
            : JSON.stringify(error.response.data)
        );
      } else {
        toast.error(error.message || 'Unknown error');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBenefitChange = (index, value) => {
    const newBenefits = [...benefits];
    newBenefits[index] = value;
    setBenefits(newBenefits);
  };

  const addBenefitField = () => setBenefits([...benefits, '']);

  const removeBenefitField = (index) => {
    const newBenefits = [...benefits];
    newBenefits.splice(index, 1);
    setBenefits(newBenefits);
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className='flex flex-col w-full items-start gap-3'
    >
      <div>
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-2'>
          {[
            { ref: fileInputRef1, state: image1, set: setImage1, id: 'image1' },
            { ref: fileInputRef2, state: image2, set: setImage2, id: 'image2' },
            { ref: fileInputRef3, state: image3, set: setImage3, id: 'image3' },
            { ref: fileInputRef4, state: image4, set: setImage4, id: 'image4' },
            { ref: fileInputRef5, state: image5, set: setImage5, id: 'image5' },
          ].map((img) => (
            <label key={img.id} htmlFor={img.id}>
              <img
                className='w-20'
                src={
                  !img.state
                    ? assets.upload_area
                    : URL.createObjectURL(img.state)
                }
                alt='upload area'
              />
              <input
                ref={img.ref}
                onChange={(e) => img.set(e.target.files[0])}
                type='file'
                id={img.id}
                hidden
              />
            </label>
          ))}
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product name:</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className='w-full max-w-[500px] px-3 py-2'
          type='text'
          placeholder='Type here'
          required
        />
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product subname:</p>
        <input
          onChange={(e) => setSubName(e.target.value)}
          value={subName}
          className='w-full max-w-[500px] px-3 py-2'
          type='text'
          placeholder='Type here'
          required
        />
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product description:</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className='w-full max-w-[500px] px-3 py-2'
          placeholder='Write content here'
          required
        />
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product benefits:</p>
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className='flex items-center gap-2 mb-2 max-w-[500px]'
          >
            <textarea
              className='w-full px-3 py-2'
              placeholder={`Benefit ${index + 1}`}
              value={benefit}
              onChange={(e) => handleBenefitChange(index, e.target.value)}
              required
            />
            {benefits.length > 1 && (
              <button
                type='button'
                onClick={() => removeBenefitField(index)}
                className='text-xl'
              >
                ×
              </button>
            )}
          </div>
        ))}
        <button
          type='button'
          onClick={addBenefitField}
          className='text-blue-500 mt-1'
        >
          + Add Benefit
        </button>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Conclusion:</p>
        <textarea
          onChange={(e) => setConclusion(e.target.value)}
          value={conclusion}
          className='w-full max-w-[500px] px-3 py-2'
          placeholder='Write content here'
          required
        />
      </div>

      <div className='flex flex-col sm:flex-row gap-2 sm:gap-8 w-full'>
        <div>
          <p className='mb-2'>Product category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className='w-full px-3 py-2'
          >
            <option value='Face'>Face</option>
            <option value='Body'>Body</option>
            <option value='Eyes'>Eyes</option>
            <option value='Lips'>Lips</option>
            <option value='Hair'>Hair</option>
          </select>
        </div>
        <div>
          <p className='mb-2'>Product subcategory</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory}
            className='w-full px-3 py-2'
          >
            <option value='Washing'>Washing</option>
            <option value='Scrub'>Scrub</option>
            <option value='Cream'>Cream</option>
            <option value='Mask'>Mask</option>
            <option value='Oil'>Oil</option>
            <option value='Lotion'>Lotion</option>
            <option value='Shampoo'>Shampoo</option>
            <option value='Conditioner'>Conditioner</option>
            <option value='Set'>Set</option>
          </select>
        </div>
        <div>
          <p className='mb-2'>Product price:</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className='w-full px-3 py-2 sm:w-[120px]'
            type='number'
            min='1'
            placeholder='Type here'
            required
          />
        </div>
      </div>

      <div>
        <p className='mb-2'>Product size:</p>
        <input
          onChange={(e) => setSize(e.target.value)}
          value={size}
          className='w-full max-w-[500px] px-3 py-2'
          type='text'
          placeholder='Type here'
          required
        />
      </div>

      <div className='flex gap-2 mt-2'>
        <input
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
          type='checkbox'
          id='bestseller'
        />
        <label className='cursor-pointer' htmlFor='bestseller'>
          Add to bestseller
        </label>
      </div>

      <button
        type='submit'
        className='w-28 py-3 mt-4 bg-black text-white'
        disabled={loading}
      >
        {loading ? 'Adding...' : 'ADD'}
      </button>
    </form>
  );
};

export default Add;
