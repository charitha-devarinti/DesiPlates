import {ShoppingCart,MapPin,Star} from "lucide-react"

import { DishContext } from "../context/DishContext";
import { CartContext } from "../context/CartContext";
import { useContext} from "react";

const FoodCard = ({dish}) => {
   const {masterDishList,getDishById}=useContext(DishContext)
   const {addToCart}=useContext(CartContext)

   const comboExists=dish.pairingIds && dish.pairingIds.length > 0
    ?true:masterDishList.some((item)=>item.dishName.trim().toLowerCase()===dish.combosBestFor?.trim().toLowerCase())
  
   const hasComboText=dish.combosBestFor && dish.combosBestFor.trim()!=='';

   const handleComboClick=(pId=null)=>{
    if(pId){
        getDishById(pId)
    }else if(comboExists){
        const comboItem=masterDishList.find((item)=>item.dishName.trim().toLowerCase() === dish.combosBestFor?.trim().toLowerCase()
    );
      if(comboItem){
        getDishById(comboItem.id || comboItem._id)
      }

    }
   }
    
    return ( 
       <div className="group bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition duration-300 border border-slate-100 flex flex-col h-full" >
        <div className="relative h-52 overflow-hidden">
            <img src={dish.image} alt={dish.dishName} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"/>
            <div className={`absolute top-4 right-4 px-2 py-1 rounded-md text-[10px] font-bold uppercase text-white shadow-sm ${dish.diet==='veg'?'bg-green-500':'bg-red-500'}`}>
                {dish.diet}

            </div>

        </div>

        <div className="p-5 flex flex-col flex-1 gap-3">
            <div className="flex justify-between items-start">
                <h3 className="text-2xl font-bold text-slate-800 leading-tight">{dish.dishName}</h3>
                <span className="text-2xl font-bold text-slate-900">₹{dish.price}</span>

            </div>

            <div className="flex items-center w-fit bg-[#fdf6ed] px-3 py-1 rounded-full border border-orange-100/50 ">
              <div className="flex items-center gap-1 pr-2">
                <MapPin size={14} className="text-orange-600"/>
                <span className="text-[12px] font-bold text-slate-700 uppercase tracking-tight">{dish.state}</span>
              </div>
              <div className="h-3 border-l border-slate-300"></div>
              <div className="pl-2">
                <span className="text-[10px] font-semibold text-slate-500">{dish.place}</span>

              </div>
            </div>

            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1 text-sm text-slate-500">
                    <span className="font-bold whitespace-nowrap text-slate-500">Best with:</span>
                    <div className="flex flex-wrap items-center gap-x-1">
                        {dish.pairingIds && dish.pairingIds.length > 0 ? (
                            dish.pairingIds.map((pId,index)=>(
                                <div key={pId} className="flex items-center">
                                    <button
                                     onClick={()=>handleComboClick(pId)}
                                     className="text-orange-600 font-bold hover:underline underline-offset-4 decoration-orange-300 cursor-pointer text-left"
                                    >
                                    {masterDishList.find(d=>(d.id || d._id)===pId)?.dishName || dish.combosBestFor} ➔
                                    </button>
                                    {index < dish.pairingIds.length -1 && <span className="mx-1 text-slate-300 text-[10px]">●</span>}
                                </div>
                            ))
                        ) :(
                            <button
                             onClick={()=>handleComboClick()}
                             disabled={!comboExists}
                             className={`font-bold transition-all text-left ${
                                comboExists ? "text-orange-600 hover:underline underline-offset-4 decoration-orange-300 cursor-pointer"
                                :"text-slate-400 cursor-not-allowed"
                             }`}
                            >
                                {hasComboText ? dish.combosBestFor:'No suggestion'}
                                {comboExists && <span className="text-lg leading-none">→</span>}

                            </button>
                        )
                    }

                    </div>
                   

                </div>
                <p className="text-[12px] text-slate-500 line-clamp-2 italic">{dish.description}</p>
            </div>
            <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-50">
                <span className="text-[14px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded ">
                    Quantity: {dish.quantity}
                </span>
                <div className="flex items-center gap-0.5">
                    <Star size={12} className="fill-orange-400 text-orange-400"/>
                    <span className="text-[14px] font-bold text-slate-700">{dish.rating}</span>

                </div>
            </div>
            <button
              disabled={!dish.isAvailable}
              onClick={()=>addToCart(dish._id || dish.id)}
              className={`w-full font-bold py-2.5 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 ${dish.isAvailable ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-md shadow-orange-100 cursor-pointer':'bg-slate-200 text-slate-500 cursor-not-allowed'}`}
            >
                <ShoppingCart size={16}/>
                <span className="text-sm">{dish.isAvailable?'Add to Cart':'Sold Out'}</span>
            </button>
        </div>

       </div>
     );
}
 
export default FoodCard;