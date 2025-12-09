import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext.js';
import { ShopContext } from './ShopContext.js';

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loadingCart, setLoadingCart] = useState(true);

  const { token } = useContext(ShopContext);
  const BASE_URL = 'https://my-skincare-backend.vercel.app';
  const navigate = useNavigate();

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  const addToCart = (product, quantity) => {
    if (quantity <= 0) return;
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === product._id);
      if (existingItem) {
        return prevItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prevItems,
          {
            ...product,
            productId: product._id,
            image: product.image || [],
            quantity,
          },
        ];
      }
    });
  };

  const updateCartItemQuantity = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, quantity: parseInt(quantity) } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  const getTotalAmount = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const fetchCart = useCallback(async () => {
    if (!token) return;

    try {
      setLoadingCart(true);
      const res = await fetch(`${BASE_URL}/api/user/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        localStorage.removeItem('token');
        clearCart();
        navigate('/login');
        return;
      }

      const data = await res.json();
      setCartItems(Array.isArray(data.cart) ? data.cart : []);
    } catch (error) {
      console.error('Cart fetch error:', error);
    } finally {
      setLoadingCart(false);
    }
  }, [token, navigate]);

  useEffect(() => {
    if (!token) {
      const localCart = localStorage.getItem('cart');
      if (localCart) {
        try {
          setCartItems(JSON.parse(localCart));
        } catch (e) {
          console.error('Failed to parse local cart', e);
        }
      }
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchCart();
    }
  }, [token, fetchCart]);

  useEffect(() => {
    if (loadingCart) return;

    if (!token) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
      return;
    }

    const saveCart = async () => {
      try {
        await fetch(`${BASE_URL}/api/user/cart`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ cart: cartItems }),
        });
      } catch (error) {
        console.error('Could not save your cart:', error);
      }
    };

    saveCart();
  }, [cartItems, token, loadingCart]);

  useEffect(() => {
    if (token) {
      const localCart = localStorage.getItem('cart');
      if (localCart) {
        try {
          const parsedCart = JSON.parse(localCart);
          setCartItems(parsedCart);
          localStorage.removeItem('cart');
        } catch {
          console.error('Invalid local cart data');
        }
      }
    }
  }, [token]);

  useEffect(() => {
    window.addEventListener('cart:refresh', fetchCart);
    return () => window.removeEventListener('cart:refresh', fetchCart);
  }, [fetchCart]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        loadingCart,
        clearCart,
        addToCart,
        updateCartItemQuantity,
        removeFromCart,
        getTotalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
