import DishCard from './DishComponent';
import { useContext } from 'react';
import { DishContext } from '../context/DishContext';

const DishList = () => {
   const {dishes,loading,error}=useContext(DishContext)
    return ( 
        <div>
          {loading && <p>Loading...</p>}
          {error && <div>{error}</div>}
            
          {
          <div className="hero-section">
               {
              dishes.map((dish)=>{
                 return(
                    <DishCard key={dish.dishId} dish={dish} />
                 )
              })
          }

          </div>

         }
        </div>
     );
}
 
export default DishList;