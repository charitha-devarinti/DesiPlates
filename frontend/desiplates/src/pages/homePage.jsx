import Navigation from "../components/Navigation";
import HeroFilter from "../components/HeroFilter";
import Foodgrid from "../components/FoodGrid";
import ComboModel from "../components/ComboModal";

const HomePage = () => {
    return ( 
         <div className="min-h-screen bg-[#f9f5f0]">
   
      <Navigation/>
     
     <main className="relative">
        <HeroFilter/>
        <Foodgrid/>
     </main>  
    <ComboModel/>
    </div>
     );
}
 
export default HomePage;