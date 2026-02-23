import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { DishProvider } from './context/DishContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './context/CartContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <DishProvider>
    <CartProvider>
    <BrowserRouter>
     <App />
     </BrowserRouter>
     </CartProvider>
   </DishProvider>
   
  </StrictMode>,
)
