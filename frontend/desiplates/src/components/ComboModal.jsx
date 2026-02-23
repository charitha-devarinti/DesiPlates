import { useContext, useState } from "react";
import { DishContext } from "../context/DishContext";
import { CartContext } from "../context/CartContext";
import { ShoppingCart,X,Star,MapPin, Loader2 } from "lucide-react";


const ComboModel = () => {
    const {focusedDish,setFocusedDish}=useContext(DishContext)
    const {addToCart}=useContext(CartContext)
    const [isAdding,setIsAdding]=useState(false)


    if(!focusedDish || Object.keys(focusedDish).length===0) return null;

   const handleAddClick=async ()=>{
    setIsAdding(true)
    try{
        await addToCart(focusedDish._id || focusedDish.id)
        setTimeout(()=>{
            setIsAdding(false)
            setFocusedDish(false)
        },800)

    }catch(err){
        setIsAdding(false)
        console.lof(err)
    }

   }


    return ( 
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300"
            onClick={()=>!isAdding && setFocusedDish(null)}
            />
            <div className="relative bg-white rounded-[40px] max-w-lg w-full shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                <button
                  onClick={()=>setFocusedDish(null)}
                  className="absolute top-5 right-5 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full text-slate-800 hover:bg-white transition-all shadow-md cursor-pointer hover:rotate-90"
                >
                    <X size={20}/>
                </button>

                <div className="h-64 sm:h-72 w-full overflow-hidden">
                    <img
                      src={focusedDish.image}
                      alt={focusedDish.dishName}
                      className="w-full h-full object-cover"
                    />
                </div>
                <div className="p-6 sm:p-8">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-1">
                                {focusedDish.dishName}
                            </h2>
                            <div className="flex items-center gap-2 text-orange-600 font-semibold">
                                <MapPin size={16}/>
                                <span className="text-sm uppercase tracking-wider">{focusedDish.state}</span>
                            </div>   
                        </div>
                         <p className="text-3xl font-black text-slate-900">₹{focusedDish.price}</p>
                    </div>
                    <p className="text-slate-600 leading-realxed mb-6 line-clamp-3 italic">{focusedDish.description}</p>

                    <div className="flex items-center gap-6 mb-8 py-4 border-y border-slate-50">
                         <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-lg">
                            <span className="text-[12px] font-bold text-slate-500 uppercase tracking-tight">Quanity:</span>
                            <span className="text-sm font-bold text-slate-700">{focusedDish.quantity}</span>

                        </div>
                        <div className="flex items-center gap-1">
                            <Star size={16} className="fill-orange-400 text-orange-400"/>
                            <span className="font-bold text-slate-700">{focusedDish.rating}</span>
                        </div>
                       
                    </div>

                    <button
                      disabled={isAdding}
                      onClick={handleAddClick}
                      className={`w-full font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg cursor-pointer disabled:cursor-wait 
                        ${
                            isAdding
                            ? 'bg-green-500 text-white shadow-green-100'
                            :'bg-orange-600 hover:bg-orange-700 text-white shadow-orange-200 '
                        }    
                        `}
                    >
                        {isAdding?(
                            <>
                            <Loader2 size={22} className="animate-spin"/>
                            <span>Adding to cart...</span>
                            </>

                        ):(
                            <>
                              <ShoppingCart size={22}/>
                              <span>Add Side Dish to Cart</span>
                            </>

                        )
                    
                    }
                       
                    </button>

                </div>
            </div>
        </div>


     );
}
 
export default ComboModel;