import { DishContext } from '../context/DishContext';
import { useContext } from 'react';
import '../small_header.css'



const SmallHeader = () => {
    const  {setVegBtn,vegBtn,nonVegBtn,setNonVegBtn,setCurriesBtn,curriesBtn,dessertBtn,setDessertBtn,setVisibleCount}=useContext(DishContext)
    const handleVeg=()=>{
         setVegBtn(prev=>!prev)
         setNonVegBtn(false)
         setCurriesBtn(false)
         setDessertBtn(false)
         setVisibleCount(12)
    }
    const handleNonVeg=()=>{
        setNonVegBtn(prev => !prev)
        setVegBtn(false)
        setCurriesBtn(false)
        setDessertBtn(false)
        setVisibleCount(12)
    }

    const handleCurries = ()=>{
          setCurriesBtn(prev=>!prev)
          setNonVegBtn(false)
          setVegBtn(false)
          setDessertBtn(false)
          setVisibleCount(12)
    }
   
    const handleDesserts = ()=>{
        setDessertBtn(prev=>!prev)
        setCurriesBtn(false);
        setNonVegBtn(false);
        setVegBtn(false)
        setVisibleCount(12);
    }

    return ( 
        <div className="small-header">
            <button className={vegBtn ? "filter-btn active" : "filter-btn inactive"} onClick={handleVeg}>Veg</button>
            <button className={nonVegBtn ? "filter-btn active" : "filter-btn inactive"} onClick={handleNonVeg}>Non-Veg</button>
            <button className={curriesBtn ? "filter-btn active" : "filter-btn inactive"} onClick={handleCurries}>Curries</button>
            <button className={dessertBtn ? "filter-btn active" : "filter-btn inactive"} onClick={handleDesserts}>Desserts</button>
        </div>
     );
}
 
export default SmallHeader;