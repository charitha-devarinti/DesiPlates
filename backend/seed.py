import json
import asyncio
from config.database import collection_name

async def seed_data():
    with open("db.json","r") as file:
        file_data=json.load(file)
        dishes=file_data["dishes"]
        
    await collection_name.delete_many({})
    if dishes:
        await collection_name.insert_many(dishes)
        print(f"Successfully uploaded {len(dishes)} dishes")

if __name__=="__main__":
    asyncio.run(seed_data())
    