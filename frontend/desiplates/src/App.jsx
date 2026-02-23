import { Routes,Route,Navigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import HomePage from "./pages/homePage";
import CartPage from "./pages/cartPage";
import SignUp from "./pages/signupPage";
import Login from "./pages/loginPage";


const App = () => {
  return ( 
    <>
    <Navigation/>
    <main>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/cart' element={<CartPage/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path='*' element={<Navigate to='/'/>}/>
    </Routes>
    </main>
    
    </>
       
        
   );
}
 
export default App;