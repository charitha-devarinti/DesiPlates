from pydantic import BaseModel,EmailStr,Field
from typing import Optional

class User(BaseModel):
    email:EmailStr
    full_name:str
    password:str
    
class UserLogin(BaseModel):
    email:EmailStr
    password:str