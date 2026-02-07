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
          {loading && <p>Loading...</p>}
          {error && <div>{error}</div>}
            
          {
          <div className="hero-section">
            
               {  finalArray.length > 0 ?(
                    finalArray.map((dish)=>{
                 return(
                    <DishCard key={dish.dishId} dish={dish} />
                 )       
              })
               ):(
               <>
                 <p style={{fontSize:'20px',fontWeight:'bold',textAlign:'center',display:'block'}}>No dishes Found...</p>
                
               </>
               )
              
             
          }

          </div>
}

           {
             !loading  && hasMore &&(
               <div style={{textAlign:'center',width:'100%'}}>
                  <button className="show-more-btn"onClick={showMore}> Load More ...</button>
               </div>
               
            )
          }

         
        </div>
     );
}
 
export default DishList;