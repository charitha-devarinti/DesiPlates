import { createContext,useState } from "react";


export const CartContext=createContext()

export function CartProvider({children}){
const [cart,setCart]=useState([])

const addToCart=(dish)=>{
      setCart((prev)=>{
        const existing= prev.find((item)=>item.id === dish.id )

        if(existing){
            return prev.map((item)=>item.id===dish.id ? {...item,qty:item.qty+1}:item)
        }

        return [...prev,{...dish,qty:1}]
      })
}
 

const itemCount=cart.reduce((acc,item)=>acc+item.qty,0)


const removeFromCart=(id=>{
    setCart((prev)=>prev.filter((item)=>item.id !== id))
})


const total=cart.reduce((acc,item)=>acc+item.qty*item.price,0)

const decreaseQunatity=(id)=>{
    setCart((prev)=> prev.map((item)=>item.id === id ? {...item,qty:Math.max(1,item.qty-1)}:item))
}

const increaseQuantity=(id)=>{
    setCart((prev)=>prev.map((item)=>item.id===id?{...item,qty:item.qty+1}:item))
}

    return(
        <CartContext.Provider value={{cart,setCart,addToCart,itemCount,removeFromCart,total,decreaseQunatity,increaseQuantity}}>
             {children}
        </CartContext.Provider>
    )

}

