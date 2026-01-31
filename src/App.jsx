import { useState,useEffect } from 'react';

import Header from './components/Header';
import DishList from './components/DishList';

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
         
         <DishList dishes={dishes}/>

        </div>
   );
}
 
export default App;