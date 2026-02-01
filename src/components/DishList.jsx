import DishCard from './DishComponent';
import { useContext } from 'react';
import { DishContext } from '../context/DishContext';

const DishList = () => {
   const {dishes,loading,error,visibleCount,showMore}=useContext(DishContext)
    return ( 
        <div>
          {loading && <p>Loading...</p>}
          {error && <div>{error}</div>}
            
          {
          <div className="hero-section">
               {
              dishes.slice(0,visibleCount).map((dish)=>{
                 return(
                    <DishCard key={dish.dishId} dish={dish} />
                 )
              })
          }

          </div>
}

           {
            visibleCount < dishes.length &&(
               <div style={{textAlign:'center',width:'100%'}}>
                  <button className="show-more-btn"onClick={showMore}> Load More ...</button>
               </div>
               
            )
          }

         
        </div>
     );
}
 
export default DishList;