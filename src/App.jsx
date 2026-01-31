import { useState,useEffect } from 'react';

import Header from './components/Header';
import './App.css'

const App = () => {

  const [dishes,setDishes]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(null)

  useEffect(()=>{
        
    const fetchDishes= async () =>{
      try{
         const res= await fetch('http://localhost:8000/dishes');
         if(!res.ok){
          throw new Error('Failed to fetch data')
         }
         const data= await res.json();
         console.log(data);
         setDishes(data);
      }catch(err){
         setError(err.message)
      }finally{
        setLoading(false)
      }
         
    }

   fetchDishes()
  },[])
  
  return ( 
        <div>
          <Header/>
          {loading && <p>Loading...</p>}
          {error && <div>{error}</div>}
          <div className="hero-section">
               {
              dishes.map((dish)=>{
                 return(
                     <div className='dishCard' key={dish.dishId}>
                       <img className="dish-image" src={dish.image}/>
                       <p><strong>Place: </strong> {dish.place}</p>
                       <p><strong>Price: </strong>{dish.price}</p>
                       <p><strong>Category: </strong>{dish.category}</p>
                       <p><strong>Suggested Combo: </strong>{dish.combosBestFor}</p>
                       <p><strong>Rating: </strong>{dish.rating}</p>
                       <button className='add-cart-btn'>Add to Cart</button>

                    </div>
                 )
              })
          }

          </div>

         

        </div>
   );
}
 
export default App;