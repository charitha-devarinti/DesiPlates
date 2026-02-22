def user_serializer(user) -> dict:
    return{
        "id":str(user["_id"]),
        "email":user["email"],
        "full_name":user.get("full_name")
    }