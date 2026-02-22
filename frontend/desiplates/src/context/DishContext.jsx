import {createContext,useEffect,useState} from "react"

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
            const res=await fetch(`/api/dishes/${id}`);
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
                const res=await fetch(`/api/dishes?limit=1000`)
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

                let params=new URLSearchParams({
                    limit:12,
                    skip:visibleCount
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
              const res=await fetch(`/api/dishes?${params.toString()}`);
              if(!res.ok){
                throw new Error('Failed to fetch data')
              }
              const result=await res.json();
              if(result.status=='ok'){

                if(visibleCount===0){
                    setDishes(result.data)
                }else{
                    setDishes(prev=>[...prev,...result.data])
                }
                setTotalDishes(result.total)
              }
             

            }catch(err){
                setError(err.message)

            }finally{
                setLoading(false)
            }
        }

        fetchDishes()

    },[visibleCount,userInput,vegBtn,nonVegBtn,curriesBtn,dessertBtn,stateSlector,mealSelector])

    return(
        <DishContext.Provider value={{dishes,loading,error,visibleCount,setVisibleCount,showMore,vegBtn,setVegBtn,nonVegBtn,setNonVegBtn,curriesBtn,setCurriesBtn,dessertBtn,setDessertBtn,stateSlector,setStateSelector,mealSelector,setMealSelector,handleClearAll,totalDishes,setUserInput,masterDishList,getDishById,focusedDish,setFocusedDish}}>
            {children}
        </DishContext.Provider>
    )
}