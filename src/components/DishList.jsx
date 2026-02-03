import DishCard from './DishComponent';
import { useContext } from 'react';
import { DishContext } from '../context/DishContext';

const DishList = () => {
   const {dishes,loading,error,visibleCount,showMore,userInput,vegBtn,nonVegBtn,curriesBtn,dessertBtn}=useContext(DishContext)
   const inputTrimed=userInput.trim()
    
   let filteredDishes=dishes.filter((dish)=>{
       const matchedSearch=dish.dishName.toLowerCase().includes(inputTrimed.toLowerCase())

       const dishDiet=dish.diet.toLowerCase();
       const dishCategory= dish.category.toLowerCase()
       if(vegBtn){
         return  matchedSearch && dishDiet=== 'veg'
       }

      if(nonVegBtn){
         return matchedSearch && dishDiet === 'non-veg'
      }

      if(curriesBtn){
          return matchedSearch && dishCategory === 'curry'
      }

      if(dessertBtn){
        return matchedSearch && dishCategory === 'dessert'
      }
  
      

       return matchedSearch

   })


   const finalArray= (inputTrimed || vegBtn || nonVegBtn)  ? filteredDishes : filteredDishes.slice(0,visibleCount)
   
    return ( 
        <div>
          {loading && <p>Loading...</p>}
          {error && <div>{error}</div>}
            
          {
          <div className="hero-section">
               {  finalArray.length > 0 ?(
                    finalArray.slice(0,visibleCount).map((dish)=>{
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
             !userInput && visibleCount < dishes.length &&(
               <div style={{textAlign:'center',width:'100%'}}>
                  <button className="show-more-btn"onClick={showMore}> Load More ...</button>
               </div>
               
            )
          }

         
        </div>
     );
}
 
export default DishList;