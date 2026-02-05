import '../header.css'
import { useState,useContext} from 'react';
import { DishContext } from '../context/DishContext';

const Header = () => {
    const {setUserInput,setStateSelector,setMealSelector,setVisibleCount,setCurriesBtn,setDessertBtn,setVegBtn,setNonVegBtn}=useContext(DishContext);
    const [inputValue,setInputValue]=useState('');
    const [stateMeal,setStateMeal]=useState('');
    const [mealTime,setMealTime]=useState('')
   

   const  handleSearch=()=>{
        setUserInput(inputValue)
        
    }

    const  handleClearInput=()=>{
      setInputValue('');
    }

    const handleStateMeal=(e)=>{
      const value_res=e.target.value
      setStateMeal(value_res);
      setStateSelector(value_res);
      setVisibleCount(12) 

    }

    const handleMealTime=(e)=>{
      const mealValue=e.target.value;
      setMealTime(mealValue);
      setMealSelector(mealValue);
      setVisibleCount(12)
    }

    //console.log('from header',stateMeal)

    const handleResetAll=()=>{
        setUserInput('')
        setVegBtn(false)
        setNonVegBtn(false);
        setCurriesBtn(false);
        setDessertBtn(false);
        setStateSelector('');
        setMealSelector('');
        setVisibleCount(12);

        // reseting the actual text in boxes
        setInputValue('');
        setStateMeal('')

    }
   
    return ( 
        <div className="header">
             <div>
                <img className='logo' src="./images/desiplates_logo.png"/>
                
               </div>
                <div className='search-area'>
                     <input type="text" placeholder="Search for the dish..." className='input-search' onChange={(e)=>setInputValue(e.target.value)} value={inputValue} />
                     <span className='clear-search' onClick={handleClearInput} title="clear search">X</span>
                    <button className='search-btn' onClick={handleSearch}>
                        Search
                   </button>
                   <button className='reset-btn' onClick={handleResetAll}title='Reset all filters'>
                     ↺
                   </button>
                   
                </div>
                <div>
                  <label htmlFor='place' className='place-label'>Sort By Place:</label>
                  <select id='place' onChange={handleStateMeal} value={stateMeal}>
                     <option value=''>Select state----</option>
                     <option value='Andhra Pradesh'>Andhra Pradesh</option>
                     <option value='Telangana'>Telangana</option>
                     <option value='Punjab'>Punjab</option>
                     <option value='Rajasthan'>Rajasthan</option>
                     <option value='Kerala'>Kerala</option>
                  </select>
                </div>
                <div>
                  <label htmlFor='meal' className='meal-label'>Meal-Time Filter:</label>
                  <select id='meal' onChange={handleMealTime} value={mealTime}>
                     <option value=''> Select meal---</option>
                     <option value='Breakfast'>Breakfast</option>
                     <option value='Lunch'>Lunch</option>
                     <option value='Snack'>Snack</option>
                     <option value='Dinner'>Dinner</option>
                  </select>
                </div>

                <div className='cart-container'>
                  <div >
                     <img className='cart-logo' src='./images/cart-logo.jpg'/>
                  </div>
                  
                  <p className='cart-count'>3</p>
                </div>
                
                
           

        </div>
     );
}
 
export default Header;
