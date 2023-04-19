import React from 'react';

import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { LoginProvider } from './contexts/LoginContext';
import { CartProvider } from './contexts/CartContext';


const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <LoginProvider>
  <CartProvider>
      <App />,
  </CartProvider>
</LoginProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
