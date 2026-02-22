import certifi
import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()
ca=certifi.where()
client=AsyncIOMotorClient(
    os.getenv("MONGO_URL"),
    tlsCAFile=ca
    )

db=client.IndianFoodDB
collection_name=db["dishes"]
cart_collection=db["cart"]
                                                                                               