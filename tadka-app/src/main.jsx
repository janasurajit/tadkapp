import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'
import './index.css'
import { FoodContextProvider } from './context/FoodContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <FoodContextProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </FoodContextProvider>
    </BrowserRouter>
  </React.StrictMode>
)
