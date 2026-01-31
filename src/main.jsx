import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DishProvider } from './context/DishContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DishProvider>
        <App />
    </DishProvider>
    
  </StrictMode>,
)
