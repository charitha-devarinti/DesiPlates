import { Link } from "react-router";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";

import '../cart.css'

const CartPage = () => {
   const {cart,removeFromCart,total,decreaseQunatity,increaseQuantity}=useContext(CartContext);
  

    return ( 
        <div className="container">
               <div className="cart-top">
                <Link to='/'>
                <img className="logo-in-cart" src='images/desiplates_logo.png' /> </Link>
                <h1 className="title">Your Ordering Cart</h1>
               </div>
               {
                 
             <div className="cartWrapper">
                 <div className="itemList">
                    {cart.map((item)=>(
                        <div  key={item.id}className="card">
                        <img className="image" src={item.image} alt={item.name} />
                        <div className="details">
                            <h3 className="itemName">{item.name}</h3>
                            <p className="itemPrice">{item.price}</p>
                        <div className="cart-buttons">
                            <div>
                                <button className="plus_minus" onClick={()=>increaseQuantity(item.id)}>+</button>
                                <span style={{fontSize:'14px'}}> Quantity: <span style={{fontSize:'16px',fontWeight:'bold'}}>{item.qty}</span> </span>
                                <button className="plus_minus" onClick={()=>decreaseQunatity(item.id)}>-</button>
                            </div>                           
                              <button className="removeBtn" onClick={()=>removeFromCart(item.id)}> Remove</button>
                         </div>
                            
                            
                        </div>
                    </div>

                    ))
                    }
                    
                </div>

                 <div className="summaryCard">
                    <h2 className="summaryTitle">Order Summary</h2>
                    <div className="summaryRow">
                        <span>Subtotal</span>
                        <span>{total}</span>
                    </div>
                    <div className="summaryRow">
                        <span>Shipping</span>
                        <span style={{color:'#22c55e'}}> Free</span>
                    </div>
                    <hr className="divider"/>
                    <div className="totalRow">
                        <span>Total</span>
                        <span>{total}</span>

                    </div>
                    <button className="checkoutBtn">
                        Proceed to Checkout
                    </button>

                 </div>
            </div>


                


               }
               
        </div>
        
     );
}
 
export default CartPage;