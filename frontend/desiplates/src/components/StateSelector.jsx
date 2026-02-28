import { ChevronDown } from "lucide-react";
import { DishContext } from "../context/DishContext";
import { useContext } from "react";

const StateSelector = ({stateMeal,setStateMeal}) => {
    const {setStateSelector,setCurrentPage}=useContext(DishContext)
    
    const handleStateMeal=(e)=>{
         const value_res=e.target.value;
         setStateMeal(value_res)
         setStateSelector(value_res)
         setCurrentPage(1)
    }

    return ( 
         <div className="w-full">
                    <label htmlFor="place" className="block text-sm font-bold text-slate-800 mb-2 ml-2">Sort By Place: </label>
                    <div className="relative">
                        <select id="place" className="w-full appearance-none bg-white border border-slate-200 rounded-full px-5 py-3.5 text-slate-700 font-medium cursor-pointer shadow-sm cocus:ring-2 focus:ring-brand-primary/20 outline-none"
                        onChange={handleStateMeal}
                        value={stateMeal}
                        >
                        <option value=''>Select State</option>
                       <option value='Andhra Pradesh'>Andhra Pradesh</option>
                       <option value='Telangana'>Telangana</option>
                       <option value='Punjab'>Punjab</option>
                       <option value='Rajasthan'>Rajasthan</option>
                       <option value='Kerala'>Kerala</option> 
                        </select>
                         <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18}/>

                    </div>

                </div>
     );
}
 
export default StateSelector;