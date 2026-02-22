from fastapi import APIRouter,Query,FastAPI,HTTPException
from models.dish_model import Dish
from config.database import collection_name
from schemas.dish_schema import dish_serializer,dishes_serializer
from typing import Optional,List


food_api_router=APIRouter()


@food_api_router.get('/dishes')


async def get_dishes(
    limit:int=12,
    skip:int=0,
    search:Optional[str]=None,
    diet:Optional[str]=None,
    category:Optional[str]=None,
    state:Optional[str]=None,
    mealTime:Optional[str]=None
    ):
    
    query={}
    
    if search and search.strip():
        query["dishName"]={"$regex":search,"$options":"i"}
    
    if diet and diet.strip():
        query["diet"]={"$regex":f"^{diet}$","$options":"i"}
    
    if category and category.strip():
        query["category"]={"$regex":f"^{category}$","$options":"i"}
    
    if state and state.strip():
        query["state"]=state
        
    if mealTime and mealTime.strip():
        query["mealTime"]=mealTime
        
    cursor=collection_name.find(query).skip(skip).limit(limit)
    dishes=await cursor.to_list(length=limit)
    
    total_count=await collection_name.count_documents(query)
    
    return {
        "status":"ok",
        "data":dishes_serializer(dishes),
        "total":total_count
    }
   
@food_api_router.get("/dishes/{dish_id}")
async def get_dish_by_id(dish_id:str):
    dish=await collection_name.find_one({"_id":dish_id})
    
    if dish:
        return dish_serializer(dish)
    print(f"DEBUG:could not find dish with id: {dish_id}")
    raise HTTPException(status_code=404,detail="Dish not found")
    
