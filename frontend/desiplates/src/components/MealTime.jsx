import { ChevronDown } from "lucide-react";
import { DishContext } from "../context/DishContext";
import { useContext } from "react";


const MealTime = ({mealTime,setMealTime}) => {
  const {setMealSelector,setCurrentPage}=useContext(DishContext)

 const handleMealTime=(e)=>{
   const mealValue=e.target.value;
   setMealTime(mealValue)
   setMealSelector(mealValue)
   setCurrentPage(1)

 }

    return (
        <div className="w-full relative">
            <label className="block text-sm font-bold text-slate-800 mb-2 ml-2"> Meal-Time Filter:</label>
            <div className="relative">
                <select id="place" className="w-full appearance-none bg-white border border-slate-200 rounded-full px-5 py-3.5 text-slate-700 font-medium cursor-pointer shadow-sm cocus:ring-2 focus:ring-brand-primary/20 outline-none"
                onChange={handleMealTime}
                value={mealTime}
                >
                    <option value=''>Select MealTime</option>
                    <option value='Breakfast'>Breakfast</option>
                    <option value='Lunch'>Lunch</option>
                    <option value='Snack'>Snack</option>
                    <option value='Dinner'>Dinner</option>
                    
                </select>
                 <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />

            </div>



        </div>

    );
}

export default MealTime;