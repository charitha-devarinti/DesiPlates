def dish_serializer(dish)->dict:
    return{
        "id":str(dish["_id"]),
        "stateId":dish.get("stateId"),
        "state":dish.get("state"),
        "dishName":dish.get("dishName"),
        "image":dish.get("image"),
        "category":dish.get("category"),
        "diet":dish.get("diet"),
        "combosBestFor":dish.get("combosBestFor"),
        "mealTime":dish.get("mealTime"),
        "quantity":dish.get("quantity"),
        "rating":dish.get("rating"),
        "price":dish.get("price"),
        "place":dish.get("place"),
        "description":dish.get("description"),
        "isAvailable":dish.get("isAvailable"),
        "pairingIds":dish.get("pairingIds")
        
        
    }
    
def dishes_serializer(dishes) -> list:
    return [dish_serializer(dish) for dish in dishes]
    