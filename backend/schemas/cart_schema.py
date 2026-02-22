def cart_item_serializer(cart_item) -> dict:
    return{
        "id":str(cart_item["_id"]),
        "dish_id":cart_item["dish_id"],
        "quantity":cart_item["quantity"],
        "user_email":cart_item["user_email"]
    }

def cart_list_serializer(cart_items) -> list:
    return [cart_item_serializer(item) for item in cart_items]