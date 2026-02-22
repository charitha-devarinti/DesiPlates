import {useContext} from "react"
import { DishContext } from "../context/DishContext";
import FoodCard from "./FoodCard";
import { Search } from "lucide-react"
import SkeletonCard from "./Spinner";

const Foodgrid = () => {
    const {dishes,totalDishes,showMore,error,loading}=useContext(DishContext);
    const finalArray=dishes;
    const hasMore=dishes.length< totalDishes
    return ( 
        <div>
           
            {error && <div className="text-red-500 text-center py-4">{error}</div>}

        {
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {  loading && finalArray.length === 0 ?(
                Array.from({length:8}).map((_,i)=><SkeletonCard key={i}/>)
              ): finalArray.length>0 ? (
                 finalArray.map((dish)=>{
                      const uniquled=String(dish.id||dish._id||dish.dishId)
                        return(
                            <FoodCard key={uniquled} dish={dish}/>
                        )
                 })
              ):( !loading && (
                    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                        <div className="bg-orange-50 p-6 rouded-full mb-4">
                            <Search size={48} className="text-orange-300"/>
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">No regional dishes found</h3>
                        <p>Try changing state or meal time filters.</p>
                    </div>
              )
              ) }

            </div>

        </div>

         }

         {
            !loading && hasMore && dishes.length > 0 &&(
                <div className="flex justify-center mt-12 pb-12">
                    <button onClick={showMore} disabled={loading}
                      className="px-8 py-3 bg-white border-2 border-orange-600 text-orange-600 font-bold rounded-full hover:bg-orange-600 hover:text-white transition-all cursor-pointer disabled:opacity-50"
                    >
                        {loading?"Loading...":"Load More Dishes"}

                    </button>

                </div>

            )
         }

        </div>

     );
}
 
export default Foodgrid;