import {createContext,useEffect,useState} from "react"


const API_BASE_URL = import.meta.env.VITE_API_URL || '';
export const DishContext=createContext();

export function DishProvider({children}){
    const [dishes,setDishes]=useState([])
    const [loading,setLoading]=useState(true)
    const [error,setError]=useState(null)
    const [visibleCount,setVisibleCount]=useState(0);
    const [totalDishes,setTotalDishes]=useState(0);
    const [userInput,setUserInput]=useState('');
    const [vegBtn,setVegBtn]=useState(false);
    const [nonVegBtn,setNonVegBtn]=useState(false);
    const [curriesBtn,setCurriesBtn]=useState(false);
    const [dessertBtn,setDessertBtn]=useState(false);
    const [stateSlector,setStateSelector]=useState('');
    const [mealSelector,setMealSelector]=useState('');
    const [masterDishList,setMasterDishList]=useState([]);
    const [focusedDish,setFocusedDish]=useState(null);
    const [currentPage,setCurrentPage]=useState(1)
  
    
    const limit=12;

    const showMore=()=>{
        setVisibleCount(prevCount=>prevCount+limit)
    }

    const handleClearAll=()=>{
        setUserInput('')
        setVegBtn(false);
        setNonVegBtn(false);
        setDessertBtn(false)
        setCurriesBtn(false)
        setMealSelector('')
        setStateSelector('')
        setFocusedDish(null)
    }
  
    const getDishById=async (id)=>{
        try{
            const res=await fetch(`${API_BASE_URL}/api/dishes/${id}`);
            if(!res.ok){
                throw new Error('Dish hot found')
            }
            const result=await res.json();
            setFocusedDish(result)

        }catch(err){
            console.log(err.message)
        }
    }


    useEffect(()=>{
        const fetchMasterList=async () =>{
            try{
                const res=await fetch(`${API_BASE_URL}/api/dishes?limit=1000`)
                const result=await res.json();
                if(result.status==='ok'){
                    setMasterDishList(result.data)
                }

            }catch(err){
                  console.log("Master lst fetch failed",err)
            }
        }
        fetchMasterList()
    },[])
    
    useEffect(()=>{
        const fetchDishes=async()=>{
            setLoading(true)
            try{

                let skipValue=(currentPage -1 )*limit
                let params=new URLSearchParams({
                    limit:12,
                    skip:skipValue
                })

                if(userInput){
                    params.append("search",userInput)
                }
                if(vegBtn){
                    params.append("diet","veg")
                }
                if(nonVegBtn){
                    params.append("diet","non-veg")
                }
                if(curriesBtn){
                    params.append("category","Curry")
                }
                if(dessertBtn){
                    params.append("category","Dessert")
                }
                if(stateSlector){
                    params.append("state",stateSlector)
                }
                if(mealSelector){
                    params.append("mealTime",mealSelector)
                }
              const res=await fetch(`${API_BASE_URL}/api/dishes?${params.toString()}`);
              if(!res.ok){
                throw new Error('Failed to fetch data')
              }
              const result=await res.json();
              if(result.status=='ok'){

                if(currentPage===1){
                    setDishes(result.data)
                }
                setDishes(result.data)
                
                setTotalDishes(result.total)
              }
             

            }catch(err){
                setError(err.message)

            }finally{
                setLoading(false)
            }
        }

        fetchDishes()

    },[visibleCount,userInput,vegBtn,nonVegBtn,curriesBtn,dessertBtn,stateSlector,mealSelector,currentPage])

    return(
        <DishContext.Provider value={{dishes,loading,error,visibleCount,setVisibleCount,showMore,vegBtn,setVegBtn,nonVegBtn,setNonVegBtn,curriesBtn,setCurriesBtn,dessertBtn,setDessertBtn,stateSlector,setStateSelector,mealSelector,setMealSelector,handleClearAll,totalDishes,setUserInput,masterDishList,getDishById,focusedDish,setFocusedDish,setCurrentPage,currentPage}}>
            {children}
        </DishContext.Provider>
    )
}