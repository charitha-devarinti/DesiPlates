import { Routes,Route,Navigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import HomePage from "./pages/homePage";
import CartPage from "./pages/cartPage";
import SignUp from "./pages/signupPage";
import Login from "./pages/loginPage";
import { Children } from "react";


const ProtectedRoute=({children})=>{
  const token=localStorage.getItem("token");

  if(!token){
    return <Navigate to="/login" replace />
  }
 // if there is a token,letting user see the page
  return children
}

const App = () => {
  return ( 
    <div className="min-h-screen bg-slate-50 overflow-x-hidden flex flex-col">
    <Navigation/>
    <main className="flex-grow">
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      {/*warpping the cartpage element with preotected route */}
      <Route path='/cart' element={
           <ProtectedRoute>
            <CartPage/>
           </ProtectedRoute>

      }/>


      <Route path='/signup' element={<SignUp/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path='*' element={<Navigate to='/'/>}/>
    </Routes>
    </main>
      
    </div>
       
        
   );
}
 
export default App;