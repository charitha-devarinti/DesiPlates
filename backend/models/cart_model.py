from pydantic import BaseModel

class CartItem(BaseModel):
    dish_id:str
    quantity:int
    user_email:str
