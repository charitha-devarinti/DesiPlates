import { createContext,useEffect,useState } from "react";

export const DishContext=createContext();

export function DishProvider({children}){
  const [visibleCount,setVisibleCount]=useState(12)
  const [dishes,setDishes]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(null);
  const  [userInput, setUserInput]=useState('');
  const [vegBtn,setVegBtn]=useState(false);
  const [nonVegBtn,setNonVegBtn]=useState(false);
  const [curriesBtn,setCurriesBtn]=useState(false);
  const [dessertBtn,setDessertBtn]=useState(false);

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
        <DishContext.Provider value={{dishes,loading,error,visibleCount,showMore,setVisibleCount,userInput,setUserInput,vegBtn,setVegBtn,nonVegBtn,setNonVegBtn,curriesBtn,setCurriesBtn,dessertBtn,setDessertBtn}}>
            {children}
        </DishContext.Provider>
     )
}

