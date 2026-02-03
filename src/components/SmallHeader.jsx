import { DishContext } from '../context/DishContext';
import { useContext } from 'react';
import '../small_header.css'



const SmallHeader = () => {
    const  {setVegBtn,vegBtn,nonVegBtn,setNonVegBtn,setCurriesBtn,curriesBtn,dessertBtn,setDessertBtn}=useContext(DishContext)
    const handleVeg=()=>{
         setVegBtn(prev=>!prev)
         setNonVegBtn(false)
         setCurriesBtn(false)
         setDessertBtn(false)
    }
    const handleNonVeg=()=>{
        setNonVegBtn(prev => !prev)
        setVegBtn(false)
        setCurriesBtn(false)
        setDessertBtn(false)
    }

    const handleCurries = ()=>{
          setCurriesBtn(prev=>!prev)
          setNonVegBtn(false)
          setVegBtn(false)
          setDessertBtn(false)
    }
   
    const handleDesserts = ()=>{
        setDessertBtn(prev=>!prev)
        setCurriesBtn(false);
        setNonVegBtn(false);
        setVegBtn(false)
    }

    return ( 
        <div className="small-header">
            <button onClick={handleVeg}>{vegBtn ?'Show all dishes':'Veg'}</button>
            <button onClick={handleNonVeg}>{nonVegBtn ?'Show all dishes':'Non-Veg'}</button>
            <button onClick={handleCurries}>{curriesBtn ? 'Show all dishes':'Curries'}</button>
            <button onClick={handleDesserts}>{dessertBtn ? 'Show all dishes': 'Desserts'}</button>
        </div>
     );
}
 
export default SmallHeader;