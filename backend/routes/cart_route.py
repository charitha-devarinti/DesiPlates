from fastapi import APIRouter
from models.cart_model import CartItem
from config.database import cart_collection
from config.database import collection_name
from schemas.cart_schema import cart_item_serializer
from bson import ObjectId

cart_router=APIRouter()

@cart_router.post("/add")
async def add_to_cart(item:CartItem):
    existing_item=await cart_collection.find_one({
        "user_email":item.user_email,
        "dish_id":item.dish_id
    })
    
    if(existing_item):
        await cart_collection.update_one(
            {"_id":existing_item["_id"]},
            {"$inc":{"quantity":item.quantity}}
        )
        return {"status":"ok","message":"quantity updated"}
    
    await cart_collection.insert_one(item.dict())
    return {"status":"ok","message":"Added to cart"}
 
    
@cart_router.get("/{user_email}")
async def get_cart(user_email:str):
    cursor=cart_collection.find({"user_email":user_email})
    cart_items=await cursor.to_list(length=100)
    full_details=[]
    for item in cart_items:
        dish= await collection_name.find_one({"_id":item["dish_id"]})
        if(dish):
            full_details.append({
                "cart_item_id":str(item["_id"]),
                "dish_id":item["dish_id"],
                "dishName":dish["dishName"],
                "price":dish["price"],
                "image":dish["image"],
                "quantity":item["quantity"]
            })
    return {"status":"ok","data":full_details}

@cart_router.put("/update_quantity/{cart_item_id}")
async def update_quantity(cart_item_id:str,type:str):
    obj_id=ObjectId(cart_item_id)
    
    if(type=='plus'):
        change_value=1
    else:
        change_value=-1
        
    current_item=await cart_collection.find_one({"_id":obj_id})
    
    if(current_item):
        new_quantity=current_item["quantity"]+change_value
        if new_quantity<1:
            return {"status":'error',"message":"Quantity cannot be less than 1"}
        
        await cart_collection.update_one(
            {"_id":obj_id},
            {"$set":{"quantity":new_quantity}}
        )
        return {"status":"ok","message":"Quantity updated"}
    return {"status":"error","message":"Item not found"}

@cart_router.delete("/delete/{cart_item_id}")
async def delete_item(cart_item_id:str):
    obj_id=ObjectId(cart_item_id)
    result=await cart_collection.delete_one({"_id":obj_id})
    
    if result.deleted_count == 1:
        return {"status":"ok","message":"item removed from cart"}
    
    return {"status":"error","message":"Item not found"}