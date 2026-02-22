from pydantic import BaseModel,Field,ConfigDict
from typing import List

class Dish(BaseModel):
    id:str=Field(alias="_id")
    stateId:str
    state:str
    dishName:str
    image:str
    category:str
    diet:str
    combosBestFor:str
    mealTime:List[str]
    quantity:str
    rating:float
    price:int
    place:str
    description:str
    isAvailbale:bool
    paringIds:List[str]
    
    
    model_config=ConfigDict(
        populate_by_name=True,
       arbitrary_types_allowed=True
    )
   
    
    