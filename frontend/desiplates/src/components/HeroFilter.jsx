import { useContext, useState } from "react";
import { RotateCw } from "lucide-react";

import { DishContext } from "../context/DishContext";
import SearchBar from "./SearchBar";
import StateSelector from "./StateSelector";
import MealTime from "./MealTime";
const HeroFilter = () => {
   const {setVegBtn,setNonVegBtn,setCurriesBtn,setDessertBtn,setVisibleCount,handleClearAll}=useContext(DishContext)

    const [activeCategory,setActiveCategory]=useState("Veg");
    const[isRefreshing,setIsRefreshing]=useState(false);

    const [inputValue,setInputValue]=useState('');
    const [stateMeal,setStateMeal]=useState('');
    const [mealTime,setMealTime]=useState('');
   
    const handleVeg=()=>{
        setVegBtn(prev=>!prev)
        setNonVegBtn(false)
        setCurriesBtn(false)
        setDessertBtn(false)
        setVisibleCount(0)
    }

    const handleNonVeg=()=>{
         setVegBtn(false)
        setNonVegBtn(prev=>!prev)
        setCurriesBtn(false)
        setDessertBtn(false)
        setVisibleCount(0)
    }

    const handleCurries=()=>{
        setVegBtn(false)
        setNonVegBtn(false)
        setCurriesBtn(prev=>!prev)
        setDessertBtn(false)
        setVisibleCount(0)
        
    }

    const handleDesserts=()=>{
        setVegBtn(false)
        setNonVegBtn(false)
        setCurriesBtn(false)
        setDessertBtn(prev=>!prev)
        setVisibleCount(0)
    }

    const handleResetAll=()=>{
        handleClearAll();
        setVisibleCount(0);

        setInputValue('')
        setStateMeal('')
        setMealTime('')
    }

    return ( 
        <div className="max-w-7xl mx-auto px-6 py-10 font-sans">
            <div className="bg-[#fdf6ed] p-8 rounded-[40px] shadow-sm border border-orange-50">
                {/*Top row : search,state,mealtime */}
                <div className="flex flex-col lg:flex-row items-stretch gap-3 mb-8 justify-between w-full "> 
                    <div className="w-full lg:w-1/2">
                          <SearchBar inputValue={inputValue} setInputValue={setInputValue}/>   
                     </div> 
                <div className="flex flex-col sm:flex-row  gap-4 lg:w-1/2 ">
                    <div className="flex-1">
                          <StateSelector stateMeal={stateMeal} setStateMeal={setStateMeal}/> 
                    </div>
                    <div className="flex-1">
                         <MealTime mealTime={mealTime} setMealTime={setMealTime}/>
                    </div>  
                </div>                            
                           
                </div>
                <div className="flex flex-col items-center justify-center w-full">
                    <label className="block text-sm font-bold text-slate-800 mb-2 ml-2">Food Category:</label>
                    <div className="flex items-center justify-center gap-3 w-full max-w-4xl mx-auto overflow-x-auto pb-2 no-scrollbar">
                    <div className="bg-white rounded-full p-1.5 flex gap-1 border-slate-100 shadow-sm w-full max-w-md flex-shrink-0">
                    <button
                     onClick={()=>{
                        setActiveCategory("Veg")
                        handleVeg()
                     }}
                     className={`flex-1 py-2.5 rounded-full text-sm font-bold transition-all duration-300 px-4 whitespace-nowrap cursor-pointer ${activeCategory === 'Veg' ? "bg-brand-primary text-white shadow-md":"text-slate-500 hover:bg-slate-50"}`}  
                    >
                        Veg
                    </button>
                    <button
                     onClick={()=>{
                        setActiveCategory("Non-Veg")
                        handleNonVeg()
                     }}
                     className={`flex-1 py-2.5 rounded-full text-sm font-bold transition-all duration-300 px-4 whitespace-nowrap cursor-pointer ${activeCategory === 'Non-Veg' ? "bg-brand-primary text-white shadow-md":"text-slate-500 hover:bg-slate-50"}`}  
                    >
                     Non-Veg
                    </button>
                    <button
                     onClick={()=>{
                        setActiveCategory("Curries")
                        handleCurries()
                    }}
                     className={`flex-1 py-2.5 rounded-full text-sm font-bold transition-all duration-300 px-4 whitespace-nowrap cursor-pointer ${activeCategory === 'Curries' ? "bg-brand-primary text-white shadow-md":"text-slate-500 hover:bg-slate-50"}`}  
                    >
                        Curries
                    </button>
                    <button
                     onClick={()=>{
                        setActiveCategory("Desserts")
                        handleDesserts()
                     }}
                     className={`flex-1 py-2.5 rounded-full text-sm font-bold transition-all duration-300 px-4 whitespace-nowrap cursor-pointer ${activeCategory === 'Desserts' ? "bg-brand-primary text-white shadow-md":"text-slate-500 hover:bg-slate-50"}`}  
                    >
                        Desserts
                    </button>
                   </div>
                   <button className="p-3 flex-shrink-0 bg-white rounded-full border border-slate-100 shadow-sm hover:bg-slate-50 transition-all active:slate-90 cursor-pointer group" title="Refresh Filters"
                   onClick={()=>{
                    setIsRefreshing(true);
                    handleResetAll()
                    setTimeout(()=>setIsRefreshing(false),500)
                    
                   }}
                   >
                    <RotateCw size={20} className={`text-slate-500 transition-transform duration-500 ${isRefreshing?'rotate-180':''}`}/>
                   </button>

                </div>
                </div>

            </div>

        </div>
     );
}
 
export default HeroFilter;