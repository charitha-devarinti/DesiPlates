import Navigation from "../components/Navigation";
import HeroFilter from "../components/HeroFilter";
import Foodgrid from "../components/FoodGrid";
import ComboModel from "../components/ComboModal";

const HomePage = () => {
    return ( 
   <div className="relative">
       <HeroFilter/>
       <Foodgrid/>
    
       <ComboModel/>
    </div>
     );
}
 
export default HomePage;