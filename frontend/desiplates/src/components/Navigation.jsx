import {ShoppingCart, UserCircle,LogOut} from 'lucide-react';
import { Link,useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

import Logo from "./logo";
import { useContext } from 'react';

const Navigation = () => {
  const {itemCount,message,setCart}=useContext(CartContext)
  const navigate=useNavigate()
  const token=localStorage.getItem("token");
  const userEmail=localStorage.getItem("userEmail")

 const handleLogout=()=>{
  localStorage.removeItem("token");
  localStorage.removeItem("userEmail");
  setCart([])
  alert("Logged out succesfully. See you soon!")
  navigate("/login")
 }

    return (  
       <header className='bg-white border-b border-slate-100 sticky top-0 z-50 w-full'>
        <div className='max-w-7xl mx-auto px-6 py-4 h-20 flex items-center justify-between'>
        <Link to='/'>
        <Logo/>
        </Link>
          
          <div className='flex items-center gap-6'>

            {
              !token ?(
                <Link to="/login" className='bg-orange-600 text-white px-6 rounded-full font-bold hover:bg-orange-700 transition-all active:scale-95'>
                Login</Link>
              ):(
                
                <>
                <div className='hidden md:flex felx-col items-end leading-tight'>
                  <span className='text-[10px] text-slate-400 font-bold uppercase tracking-tight'>Welcome</span>
                  <span className='text-xs text-slate-600 font-medium'>{userEmail}</span>

                </div>

              <Link to='/cart' className='relative p-2'>
              <ShoppingCart size={24}/>
              {itemCount > 0 && (
                <span className='absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-brand-primary text-white  font-bold w-6 h-6 flex items-center justify-center border-2 border-white rounded-full text-sm'>{itemCount}</span>
              )}
              </Link>

              <button
               onClick={handleLogout}
               className='text-slate-500 hover:text-red-600 transition-colors cursor-pointer flex items-center gap-1 font-bold text-sm'
              >
                <LogOut size={20}/>
                <span className='hidden sm:inline'>Logout</span>
              </button>
                
                </>

              )
            }
           
                  
          </div>
        </div>
         {
              message.length > 0  && (
                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-bottom-5 pointer-events-none">
                    <div className="bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10 ring-1 ring-white/5 pointer-events-auto">
                    <div className={`w-2 h-2 rounded-full animate-pulse ${
                      message.includes("Added")?"bg-emerald-500 shadow-[0_0_8px_#10b981]":"bg-red-500 shadow-[0_0_8px_#ef4444]"
                    }`}/>
                    <span className="text-sm font-bold tracking-wide">{message}</span>
                    </div>

                </div>
              )
            }
        
       </header>
        
     );
}
 
export default Navigation;