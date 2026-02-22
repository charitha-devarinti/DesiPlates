import { createContext,useEffect,useState } from "react";

export const CartContext=createContext()

export function CartProvider({children}){
    const [cart,setCart]=useState([])
    const [message,setMessage]=useState("")
    const USER_EMAIL="guest@gmail.com";

 const fetchCart=async ()=>{
    try{
        const res=await fetch(`/api/cart/${USER_EMAIL}`)
        const result=await res.json()
        if(result.status==='ok'){
            setCart(result.data)
        }
    }catch(err){
        console.log(err.message)
    }
 }

 useEffect(()=>{
    fetchCart()
 },[])

const addToCart= async (dishId)=>{
    try{
        const response=await fetch('/api/cart/add',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                dish_id:dishId,
                quantity:1,
                user_email:USER_EMAIL
            })
        })
       const result=await response.json();
       if(result.status==='ok'){
        fetchCart()
       }


    }catch(err){
        console.log(err.message)
    }
}

const updateQuantity=async (cartItemId,type)=>{
    try{
        const response=await fetch(`/api/cart/update_quantity/${cartItemId}?type=${type}`,{
            method:'PUT'
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
    try{
        const response=await fetch(`/api/cart/delete/${cartItemId}`,{
            method:'DELETE'
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
        <CartContext.Provider value={{cart,setCart,itemCount,total,addToCart,updateQuantity,removeFromCart,message}}>
            {children}
        </CartContext.Provider>
    )




}