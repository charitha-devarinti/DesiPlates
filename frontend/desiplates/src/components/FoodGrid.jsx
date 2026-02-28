import { useContext, useState } from "react"
import { DishContext } from "../context/DishContext";
import FoodCard from "./FoodCard";
import { Search } from "lucide-react"
import SkeletonCard from "./Spinner";

const Foodgrid = () => {
    const { dishes, totalDishes, error, loading, setCurrentPage, currentPage } = useContext(DishContext);
    const [currentButton,setCurrentButton]=useState(0)
    const finalArray = dishes;
    //const hasMore = dishes.length < totalDishes
    const limit = 12;
    const buttonLimit=5
    const totalPages = Math.ceil(totalDishes / limit);
    const buttonsStart=currentButton*buttonLimit;
    const buttonEnd=buttonsStart+buttonLimit


    return (
        <div>

            {error && <div className="text-red-500 text-center py-4">{error}</div>}

            {
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {loading && finalArray.length === 0 ? (
                            Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
                        ) : finalArray.length > 0 ? (
                            finalArray.map((dish) => {
                                const uniquled = String(dish.id || dish._id || dish.dishId)
                                return (
                                    <FoodCard key={uniquled} dish={dish} />
                                )
                            })
                        ) : (!loading && (
                            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                                <div className="bg-orange-50 p-6 rouded-full mb-4">
                                    <Search size={48} className="text-orange-300" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800">No regional dishes found</h3>
                                <p>Try changing state or meal time filters.</p>
                            </div>
                        )
                        )}

                    </div>

                </div>

            }

            {/*
            !loading && hasMore && dishes.length > 0 &&(
                <div className="flex justify-center mt-12 pb-12">
                    <button onClick={showMore} disabled={loading}
                      className="px-8 py-3 bg-white border-2 border-orange-600 text-orange-600 font-bold rounded-full hover:bg-orange-600 hover:text-white transition-all cursor-pointer disabled:opacity-50"
                    >
                        {loading?"Loading...":"Load More Dishes"}

                    </button>

                </div>

            )
        */ }

            {
                !loading && dishes.length > 0 && (
                    <div className="flex flex-wrap justify-center  items-center gap-2 mt-8 mb-12 ">

                        <button
                            disabled={currentButton === 0}
                            className="px-4 py-2 rounded-lg border-2 border-orange-400 text-orange-600 font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-orange-50 transition-all cursor-pointer"
                            onClick={() => setCurrentButton(currentButton-1)}
                        >
                            Previous
                        </button>

                        {

                            [...Array(totalPages).keys()].slice(buttonsStart,buttonEnd).map((n) => {
                                const page = n + 1;
                                return (
                                    <button className={`border-2 px-5 py-2 rounded-2xl border-orange-400 cursor-pointer hover:bg-orange-300 hover:text-white transition all ${currentPage === page
                                            ? "bg-orange-600 text-white border-orange-600 shadow-md"
                                            : "border-orange-400 text-black-500 hover:bg-orange-300 hover:text-white"

                                        }`}
                                        key={n} onClick={() => setCurrentPage(page)}>{page}</button>
                                )
                            }


                            )

                        }

                        <button
                            disabled={(buttonEnd-1)=== totalPages}
                            className="px-4 py-2 rounded-lg border-2 border-orange-400 text-orange-600 font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-orange-50 transition-all cursor-pointer"
                            onClick={() => setCurrentButton(currentButton+1)}
                        >
                            Next
                        </button>

                    </div>

                )
            }




        </div>

    );
}

export default Foodgrid;