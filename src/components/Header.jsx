import '../header.css'

const Header = () => {
    return ( 
        <div className="header">
             <div>
                <img className='logo' src="./images/desiplates_logo.png"/>
                
               </div>
                <div className='search-area'>
                     <input type="text" placeholder="Search for the dish..." className='input-search'/>
                    <button className='search-btn'>
                        Search
                   </button>
                   
                </div>
                <div>
                  <label htmlFor='place' className='place-label'>Sort By Place:</label>
                  <select id='place'>
                     <option>Andhra Pradesh</option>
                     <option>Telangana</option>
                     <option>Panjab</option>
                     <option>Gujarat</option>
                     <option>Bengali</option>
                  </select>
                </div>
                <div>
                  <label htmlFor='meal' className='meal-label'>Meal-Time Filter:</label>
                  <select id='meal'>
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