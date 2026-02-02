import { createContext,useEffect,useState } from "react";

export const DishContext=createContext();

export function DishProvider({children}){
  const [visibleCount,setVisibleCount]=useState(12)
  const [dishes,setDishes]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(null);

   const showMore=()=>{
     setVisibleCount(prevConut=> prevConut+12)
   }

  useEffect(()=>{
        
    const fetchDishes= async () =>{
      try{
         const res= await fetch(`/api/dishes`);
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
      
     return(
        <DishContext.Provider value={{dishes,loading,error,visibleCount,showMore,setVisibleCount}}>
            {children}
        </DishContext.Provider>
     )
}

