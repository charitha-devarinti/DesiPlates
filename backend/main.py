from fastapi import FastAPI
from routes.food_route import food_api_router
from routes.cart_route import cart_router
from fastapi.middleware.cors import CORSMiddleware 
from routes.auth_route import auth_router


app=FastAPI()

# defing who is allowed to talk to backend
origins=[
    "http://localhost:3000",#standard react port
    "http://localhost:5173",#standard vite port
    "https://desiplates.vercel.app"
]

# applying the security 
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# @app.get('/')
# def read_root():
#     return {"message":"server is live and CORS is enabled"}

app.include_router(food_api_router,prefix="/api")
app.include_router(cart_router,prefix="/api/cart",tags=["Cart"])
app.include_router(auth_router,prefix="/api/auth",tags=["Authentication"])
