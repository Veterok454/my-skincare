import { ShopContext } from './ShopContext.js';
import { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const ShopContextProvider = (props) => {
  const currency = '£';
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(
    () => localStorage.getItem('token') || null
  );
  const [userId, setUserId] = useState('');
  const isAuthenticated = !!token;

  const getProductsData = useCallback(async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(
          response.data.products.map((p) => ({
            ...p,
            image: Array.isArray(p.image) ? p.image : [],
          }))
        );
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }, [backendUrl]);

  useEffect(() => {
    getProductsData();
  }, [getProductsData]);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);

        setUserId(decoded.id);
      } catch (error) {
        console.error('Invalid token', error);
        setUserId('');
      }
    } else {
      setUserId('');
    }
  }, [token]);

  const value = {
    products,
    currency,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    backendUrl,
    token,
    setToken,
    userId,
    isAuthenticated,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
