import '../header.css'
import { useState,useContext} from 'react';
import { DishContext } from '../context/DishContext';

const Header = () => {
    const {setUserInput}=useContext(DishContext);
    const [inputValue,setInputValue]=useState('')
   

   const  handleSearch=()=>{
        setUserInput(inputValue)
        
    }

    const  handleClearInput=()=>{
      setInputValue('');
    }

    return ( 
        <div className="header">
             <div>
                <img className='logo' src="./images/desiplates_logo.png"/>
                
               </div>
                <div className='search-area'>
                     <input type="text" placeholder="Search for the dish..." className='input-search' onChange={(e)=>setInputValue(e.target.value)} value={inputValue} />
                     <span className='clear-search' onClick={handleClearInput}>X</span>
                    <button className='search-btn' onClick={handleSearch}>
                        Search
                   </button>
                   
                </div>
                <div>
                  <label htmlFor='place' className='place-label'>Sort By Place:</label>
                  <select id='place'>
                     <option>Select state----</option>
                     <option>Andhra Pradesh</option>
                     <option>Telangana</option>
                     <option>Punjab</option>
                     <option>Rajasthan</option>
                     <option>Kerala</option>
                  </select>
                </div>
                <div>
                  <label htmlFor='meal' className='meal-label'>Meal-Time Filter:</label>
                  <select id='meal'>
                     <option> Select meal---</option>
                     <option>Breakfast</option>
                     <option>Lunch</option>
                     <option>Snack</option>
                     <option>Dinner</option>
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
