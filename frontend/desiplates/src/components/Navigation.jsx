import {ShoppingCart, UserCircle} from 'lucide-react';
import { Link } from 'react-router';
import { CartContext } from '../context/CartContext';

import Logo from "./logo";
import { useContext } from 'react';

const Navigation = () => {
  const {itemCount,message}=useContext(CartContext)
    return ( 
        <>
       <header className='bg-white border-b border-slate-100 sticky top-0 z-50 w-full'>
        <div className='max-w-7xl mx-auto px-6 py-4 h-20 flex items-center justify-between'>
          <Logo/>
          <div className='flex items-center gap-6'>
            <button className='text-slate-600 hover:text-brand-primary transition-colors cursor-pointer'>
                <UserCircle size={24} className='cursor-pointer hover:text-brand-primary'/>
               
            </button>
           
         
           <Link to='/cart' className='relative p-2'>
              <ShoppingCart size={24}/>
              {itemCount > 0 && (
                <span className='absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-brand-primary text-white  font-bold w-6 h-6 flex items-center justify-center border-2 border-white rounded-full text-sm'>{itemCount}</span>

              )}
                
              </Link>
          </div>
        </div>
         {
              message && (
                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-bottom-5">
                    <div className="bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10 ring-1 ring-white/5">
                    <div className={`w-2 h-2 rounded-full animate-pulse ${
                      message.includes("Added")?"bg-emerald-500 shadow-[0_0_8px_#10b981]":"bg-red-500 shadow-[0_0_8px_#ef4444]"
                    }`}/>
                    <span className="text-sm font-bold tracking-wide">{message}</span>
                    </div>

                </div>
              )
            }
        
       </header>
        </>
     );
}
 
export default Navigation;