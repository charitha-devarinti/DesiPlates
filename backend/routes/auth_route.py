from fastapi import APIRouter,HTTPException,status,Depends
from fastapi.security import OAuth2PasswordRequestForm
from models.user_model import User,UserLogin
from config.database import users_collection
from auth.auth_handler import get_password_hash,verify_password,create_access_token
from schemas.user_schema import user_serializer

auth_router=APIRouter()

@auth_router.post("/signup")
async def signup(user:User):
    existing_user=await users_collection.find_one({"email":user.email})
    if existing_user:
        raise HTTPException(status_code=400,detail="Email already registered")
    
    hashed_pass=get_password_hash(user.password)
    
    new_user={
        "email":user.email,
        "full_name":user.full_name,
        "password":hashed_pass
    }
    
    await users_collection.insert_one(new_user)
    return {"status":"ok","message":"User created successfully"}

@auth_router.post("/login")
async def login(form_data:OAuth2PasswordRequestForm=Depends()):
    user=await users_collection.find_one({"email":form_data.username})
    
    if not user or not verify_password(form_data.password,user["password"]):
        raise HTTPException(status_code=401,detail="Invalid email or password")
    
    token=create_access_token(data={"sub":user["email"]})
    return {"access_token":token,"token_type":"bearer"}