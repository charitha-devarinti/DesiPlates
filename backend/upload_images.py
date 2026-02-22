import os
import asyncio
import cloudinary
import cloudinary.uploader
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()
#clodinary configuration
cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLODINARY_API_SECRET")
)

#database configuration
client=AsyncIOMotorClient(os.getenv("MONGO_URL"))
db=client.IndianFoodDB
collection=db["dishes"]

async def upload_and_update():
    #getting all dishes that have a local path in the image field
    dishes=await collection.find().to_list(1000)
    for dish in dishes:
        local_path=dish.get("image")
        #checking if already a URl or if file exists
        if local_path and not local_path.startswith("http"):
            #giving full path
            full_path=os.path.join(os.getcwd(),local_path)
            
            if os.path.exists(full_path):
                print(f"Uploading: {dish['dishName']}...")
                
                #upload to cloudinary
                upload_result=cloudinary.uploader.upload(full_path,folder="desi_plates")
                secure_url=upload_result["secure_url"]
                
                #update mondodb with the new url
                await collection.update_one(
                    {"_id":dish["_id"]},
                    {"$set":{"image":secure_url}}
                )
                print(f"Sucess! New URL: {secure_url}")
            else:
                print(f"File not found: {full_path}")
        
        print("\n All images processed and database updated!")
        
if __name__=="__main__":
    asyncio.run(upload_and_update())
        
                
            