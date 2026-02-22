import { Search,X} from "lucide-react";
import { DishContext } from "../context/DishContext";
import { useContext } from "react";


const SearchBar = ({inputValue,setInputValue}) => {
    const {setUserInput,setVisibleCount,setNonVegBtn,setCurriesBtn,setVegBtn,setDessertBtn}=useContext(DishContext)

    const handleSearch=()=>{
      console.log('clieked')
      setVisibleCount(0);
      setVegBtn(false);
      setNonVegBtn(false);
      setCurriesBtn(false);
      setDessertBtn(false);
      setUserInput(inputValue)
    }

    const handleClear=()=>{
      setInputValue('');
      setUserInput('');
      setVisibleCount(0)
    }
    
    return ( 
       
            <div className="relative group w-full">
                <input type="text" placeholder="Search regional dishes..." className="w-full pl-6 pr-16 bg-white rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus-ring-brand-primary/20 shadow-sm transition-all py-4 "
                onChange={(e)=>setInputValue(e.target.value)}
                value={inputValue}
                onKeyDown={(e)=>e.key==="Enter" && handleSearch()}
                />
                {
                  inputValue && (
                    <button 
                     onClick={handleClear}
                     className="absolute right-14 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-1"
                    >
                      <X size={18}/>
                    </button>
                  )
                }
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-primary text-white p-2.5 rounded-full hover:bg-orange-600 transition-all active:scale-90 shadow-md cursor-pointer"
                onClick={handleSearch}>
                <Search size={20}/>
                </button>

            </div>

       
     );
}
 
export default SearchBar;