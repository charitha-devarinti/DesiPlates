import {useContext} from "react";
import { CartContext } from "../context/CartContext";
import Navigation from "../components/Navigation";
import { Trash2,Plus,Minus,ArrowRight,ShoppingBag } from "lucide-react";
import {Link} from 'react-router'


const CartPage = () => {
    const {cart,updateQuantity,removeFromCart,total}=useContext(CartContext)

    const deliveryFee=cart.length > 0 ? 40 : 0;
    const discount= total > 1000 ? total * 0.05 : 0;
    const finalAmount= total-discount + deliveryFee;
   // if cart is empty
   if(cart.length===0){
    return(
        <div className="min-h-screen bg-[#f9f5f0]">       
            
            <div className="flex flex-col items-center justify-center pt-20 px-4">
                <div className="bg-white p-10 rounded-[50px] shadow-sm flex flex-col items-center">
                    <ShoppingBag size={80} className="text-slate-200 mb-6"/>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Your cart is empty</h2>
                    <p className="text-slate-500 mb-8 text-center">Looks like you haven't added any delicious dishes yet.</p>
                    <Link to='/' className="bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-orange-700 transition-all">
                    Go to Menu 
                    </Link>
                </div>
            </div>
        </div>
    )
   }

    return ( 
        <div className="min-h-screen bg-[#f9f5f0">
            <Link to='/'>
            <Navigation/>
            </Link>
            
            <div className="max-w-6xl mx-auto p-6 lg:p-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-4">
                    <h1 className="text-3xl font-black text-slate-900 mb-8">My Basket</h1>
                    {
                       cart.map((item)=>(
                        <div key={item.cart_item_id} className="flex items-center gap-4 bg-white p-4 rounded-[30px] shadow-sm border border-slate-50 group hover:border-orange-100 transition-all">
                            <img src={item.image} className="w-24 h-24 rounded-[20px] object-cover shadow-sm" alt={item.dishName}/>
                            <div className="flex-1">
                                <h3 className="font-bold text-lg text-slate-800">{item.dishName}</h3>
                                <p className="text-orange-600 font-bold">₹{item.price}</p>
                            </div>

                            <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-100">
                                <button
                                 onClick={()=>updateQuantity(item.cart_item_id,'minus')}
                                 className="w-8 h-8 flex items-center justify-center hover:bg-white hover:shadow-sm rounded-xl transition-all text-slate-600 cursor-pointer"
                                >
                                    <Minus size={16}/>
                                </button>
                                <span className="font-black text-slate-800 w-4 text-center">{item.quantity}</span>
                                <button
                                  onClick={()=>updateQuantity(item.cart_item_id,'plus')}
                                  className="w-8 h-8 flex items-center justify-center bg-slate-900 text-white rounded-xl hover:bg-orange-600 shadow-lg shadow-slate-200 transition-all cursor-pointer"
                                >
                                    <Plus size={16}/>
                                </button>
                            </div>
                            <button
                            onClick={()=>removeFromCart(item.cart_item_id)}
                            className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all cursor-pointer"
                            >
                                <Trash2 size={20}/>
                            </button>
                        </div>
                       ))
                    }

                </div>
                <div className="lg:col-span-1">
                    <div className="bg-white p-8 rounded-[40px] shadow-2xl shadow-slate-200/50 border border-slate-50 sticky top-28">
                    <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between text-slate-500">
                            <span>Subtotal</span>
                            <span className="font-bold text-slate-800">₹{total}</span>

                        </div>
                        {discount > 0 && (
                            <div className="flex justify-between items-center bg-green-50 p-3 rounded-2xl border border-green-100">
                                <span className="text-green-700 text-sm font-medium">Extra 5% DisCount Applied</span>
                                <span className="font-bold text-green-700">-₹{discount.toFixed(0)}</span>
                            </div>
                        )}

                        <div className="flex justify-between text-slate-500">
                            <span>Delivery Fee</span>
                            <span className="font-bold text-slate-800">₹{deliveryFee}</span>
                        </div>
                        <div className="pt-6 mt-6 border-t border-slate-100 flex justify-between items-end">
                            <div>
                                <p className="text-xs text-slate-400 uppercase font-bold tracking-widest">Total Amount</p>
                                <p className="text-4xl font-black text-slate-900">₹{finalAmount.toFixed(0)}</p>
                            </div>
                        </div>
                        <button className="w-full mt-6 bg-orange-600 hover:bg-orange-700 text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl shadow-orange-200 group">
                            <span>Proceed to Checkout</span>
                            <ArrowRight size={20} className="group-hover:translate-x-l transition-transform"/>
                        </button>
                     </div>
                    </div>
                </div>

            </div>

           

        </div>
          
     );
}
 
export default CartPage;