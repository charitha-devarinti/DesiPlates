import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';

const HeroFilter = ({ handleStateMeal, stateMeal, handleMealTime, mealTime }) => {
  // UI State: To track which category is active and if the dropdown is open
  const [activeCategory, setActiveCategory] = useState("Veg");
  const [isMealOpen, setIsMealOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 font-sans">
      {/* 1. MAIN CONTAINER: The Cream Box */}
      <div className="bg-[#fdf6ed] p-8 rounded-[40px] shadow-sm border border-orange-50">
        
        {/* TOP ROW: Search, State, and Meal Time */}
        <div className="flex flex-wrap items-end gap-6 mb-8">
          
          {/* A. SEARCH BAR with Button on the Right */}
          <div className="flex-1 min-w-[300px]">
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Search regional dishes..." 
                className="w-full pl-6 pr-16 py-4 bg-white rounded-full border border-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 shadow-sm transition-all"
              />
              {/* The clickable search button */}
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-primary text-white p-2.5 rounded-full hover:bg-orange-600 transition-all active:scale-90 shadow-md">
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* B. STATE SELECTOR (Using your standard handleStateMeal) */}
          <div className="w-64">
            <label htmlFor='place' className="block text-sm font-bold text-slate-800 mb-2 ml-2">Sort By Place:</label>
            <div className="relative">
              <select 
                id='place' 
                onChange={handleStateMeal} 
                value={stateMeal}
                className="w-full appearance-none bg-white border border-slate-200 rounded-full px-5 py-3.5 text-slate-700 font-medium cursor-pointer shadow-sm focus:ring-2 focus:ring-brand-primary/20 outline-none"
              >
                <option value=''>Select state----</option>
                <option value='Andhra Pradesh'>Andhra Pradesh</option>
                <option value='Telangana'>Telangana</option>
                <option value='Punjab'>Punjab</option>
                <option value='Rajasthan'>Rajasthan</option>
                <option value='Kerala'>Kerala</option>
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
            </div>
          </div>

          {/* C. MEAL TIME (The Custom Dropdown) */}
          <div className="w-60 relative">
            <label className="block text-sm font-bold text-slate-800 mb-2 ml-2">Meal-Time Filter:</label>
            <div 
              onClick={() => setIsMealOpen(!isMealOpen)}
              className="bg-white border border-brand-primary/30 rounded-full px-5 py-3.5 flex items-center justify-between cursor-pointer shadow-sm transition-all hover:border-brand-primary"
            >
              <span className="text-slate-700 font-medium">{mealTime || "Select meal---"}</span>
              <ChevronDown className={`text-slate-500 transition-transform duration-300 ${isMealOpen ? 'rotate-180' : ''}`} size={18} />
            </div>

            {/* The Floating Menu */}
            {isMealOpen && (
              <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-2xl shadow-xl border border-slate-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                {['Breakfast', 'Lunch', 'Snack', 'Dinner'].map((option) => (
                  <button 
                    key={option}
                    onClick={() => {
                      // Triggering your handleMealTime with a "fake" event object
                      handleMealTime({ target: { value: option } }); 
                      setIsMealOpen(false); 
                    }}
                    className="w-full text-left px-5 py-3 hover:bg-orange-50 text-slate-700 transition-colors border-b border-slate-50 last:border-none font-medium"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM ROW: Food Categories (The Pill Style) */}
        <div className="max-w-2xl">
           <label className="block text-sm font-bold text-slate-800 mb-2 ml-2">Food Category:</label>
           <div className="bg-white rounded-full p-1.5 flex gap-1 border border-slate-100 shadow-sm">
              
              {/* Manual Category Buttons for maximum control */}
              <button 
                onClick={() => setActiveCategory("Veg")}
                className={`flex-1 py-2.5 rounded-full text-sm font-bold transition-all duration-300 
                ${activeCategory === "Veg" ? "bg-brand-primary text-white shadow-md" : "text-slate-500 hover:bg-slate-50"}`}
              >
                Veg
              </button>

              <button 
                onClick={() => setActiveCategory("Non-Veg")}
                className={`flex-1 py-2.5 rounded-full text-sm font-bold transition-all duration-300 
                ${activeCategory === "Non-Veg" ? "bg-brand-primary text-white shadow-md" : "text-slate-500 hover:bg-slate-50"}`}
              >
                Non-Veg
              </button>

              <button 
                onClick={() => setActiveCategory("Curries")}
                className={`flex-1 py-2.5 rounded-full text-sm font-bold transition-all duration-300 
                ${activeCategory === "Curries" ? "bg-brand-primary text-white shadow-md" : "text-slate-500 hover:bg-slate-50"}`}
              >
                Curries
              </button>

              <button 
                onClick={() => setActiveCategory("Desserts")}
                className={`flex-1 py-2.5 rounded-full text-sm font-bold transition-all duration-300 
                ${activeCategory === "Desserts" ? "bg-brand-primary text-white shadow-md" : "text-slate-500 hover:bg-slate-50"}`}
              >
                Desserts
              </button>
           </div>
        </div>

      </div>
    </div>
  );
};

export default HeroFilter;