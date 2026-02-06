import DishCard from './DishComponent';
import { useContext } from 'react';
import { DishContext } from '../context/DishContext';

const DishList = () => {
   const {dishes,loading,error,visibleCount,showMore,userInput,vegBtn,nonVegBtn,curriesBtn,dessertBtn,stateSelector,mealSelector}=useContext(DishContext)
   const inputTrimed=userInput.trim()

   const  filteredDishes=dishes.filter((dish)=>{
        // search match
        const matchesSearch= dish.dishName.toLowerCase().includes(inputTrimed);
        // veg / non-veg match
        let matchesDiet=true;
        if(vegBtn){
             matchesDiet=dish.diet.toLowerCase() === 'veg';
        }
        if(nonVegBtn) {
          matchesDiet= dish.diet.toLowerCase() === 'non-veg';
        }
        // curry / dessert match
        let matchesCategory= true;
        if(curriesBtn){
            matchesCategory = dish.category.toLowerCase() === 'curry'
        }
        if(dessertBtn){
           matchesCategory= dish.category.toLowerCase()==='dessert'
        }
        // state match
        const matchedState= !stateSelector || dish.state === stateSelector
        // mealtime match  (array includes check)
        const matchesMeal=!mealSelector|| (dish.mealTime && dish.mealTime.includes(mealSelector));
        // pass a dish only if every check is true
        return matchesSearch && matchesDiet && matchesCategory && matchedState && matchesMeal


   })

   // for pagination
   const finalArray= filteredDishes.slice(0,visibleCount);
   // logic for load more button for to show / hide
   const hasMore = filteredDishes.length > visibleCount
    return (
        <div>
          {loading && <p className="loading-state">Loading...</p>}
          {error && <div className="error-state">{error}</div>}

          <div className="hero-section">
               {finalArray.length > 0 ? (
                    finalArray.map((dish) => (
                        <DishCard key={dish.dishId} dish={dish} />
                    ))
               ) : (
                    !loading && (
                        <div className="empty-state">
                            <p>No dishes found...</p>
                        </div>
                    )
               )}
          </div>

          {!loading && hasMore && (
              <div style={{textAlign:'center'}}>
                  <button className="show-more-btn" onClick={showMore}>Load More ...</button>
              </div>
          )}
        </div>
     );
}

export default DishList;
