import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.jsx'
import { DishProvider } from './context/DishContext.jsx'
import { CartProvider } from './context/CartContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DishProvider>
      <CartProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </CartProvider>
    </DishProvider>
    
  </StrictMode>
)
