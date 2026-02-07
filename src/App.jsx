import { Routes,Route } from 'react-router';
import Home from './pages/home';
import CartPage from './pages/cartPage';



import './App.css'

const App = () => {


  
  return ( 
        <>
         <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/cart' element={<CartPage/>} />
         </Routes>

        </>
   );
}
 
export default App;