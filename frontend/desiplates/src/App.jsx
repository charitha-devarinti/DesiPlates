import { Routes,Route } from "react-router";
import HomePage from "./pages/homePage";
import CartPage from "./pages/cartPage";

const App = () => {
  return ( 
    <>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/cart' element={<CartPage/>}/>
    </Routes>
    
    </>
       
        
   );
}
 
export default App;