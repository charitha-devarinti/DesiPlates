import DishCard from './DishComponent';

const DishList = ({dishes}) => {
    return ( 
        <div>
            
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