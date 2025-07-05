import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import ShopContextProvider from './context/ShopContextProvider.jsx';
import { CartProvider } from './context/CartProvider.jsx';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ShopContextProvider>
      <CartProvider>
        <PayPalScriptProvider
          options={{
            clientId:
              'ATM_Z1FEW91w2jxbeBXmrmExZyYgAxvBd6kfpGo5h_Kvw_FhKyWDNFJR5nQIXtziB2uNYuLOQUraDGWk',
            currency: 'GBP',
          }}
        >
          <App />
        </PayPalScriptProvider>
      </CartProvider>
    </ShopContextProvider>
  </BrowserRouter>
);
