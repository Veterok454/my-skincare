import React, { useContext, useState, useMemo } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const filteredProducts = useMemo(() => {
    let filtered = [...products];
    if (showSearch && search) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category.length > 0) {
      filtered = filtered.filter((item) => category.includes(item.category));
    }
    if (subCategory.length > 0) {
      filtered = filtered.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }
    switch (sortType) {
      case 'low-high':
        return [...filtered].sort((a, b) => a.price - b.price);
      case 'high-low':
        return [...filtered].sort((a, b) => b.price - a.price);
      default:
        return filtered;
    }
  }, [products, category, subCategory, sortType, search, showSearch]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filters */}
      <div className='min-w-60'>
        <p
          onClick={() => setShowFilter(!showFilter)}
          className='my-2 text-xl flex items-center cursor-pointer gap-2 uppercase'
        >
          Filters
          <img
            className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}
            src={assets.dropdown_icon}
            alt='dropdown icon'
          />
        </p>
        {/* Categories */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? '' : 'hidden'
          } sm:block`}
        >
          <p className='mb-3 text-sm font-medium uppercase'>Categories</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {['Face', 'Body', 'Eyes', 'Lips', 'Hair'].map((cat) => (
              <label key={cat} className='flex gap-2'>
                <input
                  id={cat}
                  className='w-3'
                  type='checkbox'
                  value={cat}
                  onChange={toggleCategory}
                  checked={category.includes(cat)}
                />
                <span>{cat}</span>
              </label>
            ))}
          </div>
        </div>
        {/* SubCategories */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? '' : 'hidden'
          } sm:block`}
        >
          <p className='mb-3 text-sm font-medium uppercase'>Type</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {[
              'Washing',
              'Scrub',
              'Cream',
              'Mask',
              'Oil',
              'Lotion',
              'Shampoo',
              'Conditioner',
              'Set',
            ].map((subCat) => (
              <label key={subCat} className='flex gap-2'>
                <input
                  id={subCat}
                  className='w-3'
                  type='checkbox'
                  value={subCat}
                  onChange={toggleSubCategory}
                  checked={subCategory.includes(subCat)}
                />
                <span>{subCat}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
      {/* Products */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          <select
            onChange={(e) => setSortType(e.target.value)}
            className='border-2 border-gray-300  text-sm px-2'
            value={sortType}
          >
            <option value='relevant'>Sort by: Relevant</option>
            <option value='low-high'>Sort by: Low to High</option>
            <option value='high-low'>Sort by: High to Low</option>
          </select>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 '>
          {filteredProducts.map((item) => (
            <ProductItem
              key={item._id}
              name={item.name}
              subName={item.subName}
              id={item._id}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
