import { createContext,useEffect,useState } from "react";

export const CartContext=createContext()

const API_BASE_URL = import.meta.env.VITE_API_URL || '';
export function CartProvider({children}){
    const [cart,setCart]=useState([])
    const [message,setMessage]=useState("")
   

 const fetchCart=async ()=>{
    
    const token=localStorage.getItem("token")

    if(!token){
        setCart([])
        return;
    } 
    try{
        const res=await fetch(`${API_BASE_URL}/api/cart/my-cart`,{
            headers:{
                'Authorization':`Bearer ${token}`,
                'Content-Type':'application/json'
            }
        })
         
        if(res.status===404){
            console.log("cart not found for this user")
            setCart([])
            return;
        }

        if(res.status===401){
            console.log("Token expired or Invalid.Clearing cart.")
            localStorage.removeItem("token")
            setCart([])
            return;
        }

        const result=await res.json()
        if(result && result.status==='ok'){
            setCart(result.data)
        }
    }catch(err){
        console.log(err.message)
        setCart([])
    }
 }

 useEffect(()=>{
    fetchCart()
 },[])

const addToCart= async (dishId)=>{
     
    const token=localStorage.getItem("token")
    try{
        const response=await fetch(`${API_BASE_URL}/api/cart/add`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            
            },
            body:JSON.stringify({
                dish_id:dishId,
                quantity:1,
               
            })
        })
       const result=await response.json();
       if(result.status==='ok'){
        fetchCart()
        console.log("success")
       }


    }catch(err){
        console.log(err.message)
    }
}

const updateQuantity=async (cartItemId,type)=>{
    
    const token=localStorage.getItem("token")

    try{
        const response=await fetch(`${API_BASE_URL}/api/cart/update_quantity/${cartItemId}?type=${type}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            }
        })
        const result=await response.json()
        if(result.status==='ok'){
            fetchCart()
            setMessage(type==='plus'?"Quantity increased":"Quantity decreased")
            setTimeout(()=>setMessage(""),3000)
        }else{
            console.log(result.message)
        }
    }catch(err){
        console.log(err.message)
    }
}

const removeFromCart= async (cartItemId)=>{
     const token=localStorage.getItem("token")
    try{
        const response=await fetch(`${API_BASE_URL}/api/cart/delete/${cartItemId}`,{
            method:'DELETE',
            headers:{            
                'Authorization':`Bearer ${token}`
            }
        })
        const result=await response.json();
        if(result.status=='ok'){
            fetchCart()
            setMessage("item removed from cart");
            setTimeout(()=>setMessage(''),3000)
        }
    }catch(err){
        console.log(err.message)
    }
}

const itemCount=cart.reduce((acc,item)=>acc+(item.quantity||0),0)
const total=cart.reduce((acc,item)=>acc+(item.quantity*item.price||0),0)
     
    return(
        <CartContext.Provider value={{cart,setCart,itemCount,total,addToCart,updateQuantity,removeFromCart,message,fetchCart}}>
            {children}
        </CartContext.Provider>
    )




}