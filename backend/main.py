import os
import psycopg2
from psycopg2.extras import RealDictCursor
import handlePins
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import math
import handleUser
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Response
from pydantic import BaseModel


class LoginRequest(BaseModel):
    username: str
    password: str

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/items")
def add_item(item: dict): #dict should be taken as parameter for the databases' sakes
    username = "slobban" # this should be taken from the cookie/session in a real application, but for testing purposes we can hardcode it here
    title = item.get("title")    
    lng = item.get("lng")
    lat = item.get("lat")
    description = item.get("description")
    # category = item.get("category")
    # starts_time = item.get("starts_time")
    # ends_time = item.get("ends_time")
    
    print("MARKER",id, lng, lat, title, description)
    handlePins.insertPin(username, title, lng, lat, description, "pant", "2024-06-01T12:00:00Z", "2024-06-01T12:00:00Z")

    return {"message": "Item added successfully"}

@app.get("/api/items")
def get_items():    
    
    # If you for whatevah reason want to use sql in here
    # query_path = os.path.join(os.getcwd(), "sql_queries", "testing.sql")
    # with open(query_path, "r") as file:
    #     query = file.read()
    handlePins.insertPin("testUser", "Johanneberg", 11.97695, 57.68962, "Go to Hubben and ask for Banger to collect", "cans", "2026-05-26 00:00:00", "2026-05-26 23:59:59")
    handlePins.insertPin(id="test", username="testUser", title="Lindholmen", lng=11.936662797883773, lat=57.70653055063925, description="Go to Styrbord and ask for Bo-Rolf", category="fruit", starts_time="2026-05-26 00:00:00", ends_time="2026-05-26 23:59:59")

    pins = handlePins.getPins()
    return pins

class LoginRequest(BaseModel):
    username:str
    password:str

@app.post("/api/login")
def login(data:LoginRequest):
    print(data.username)
    print(data.password)
    #Test if account exists

    return {"status": "ok", "user": data.username}

class NearbyRequest(BaseModel):
    lat: float
    lng: float

@app.post("/api/nearby")
def nearby(data: NearbyRequest):
    allDistances = []
    for pin in handlePins.getPins():
        longDiff = abs(pin["lng"]-data.lng)
        latDiff = abs(pin["lat"]-data.lat)
        distance = math.sqrt((latDiff**2)+(longDiff**2))
        allDistances.append((distance, pin))
    allDistances.sort(key=lambda x: x[0])
    return [pin for _, pin in allDistances[:4]]

@app.post("/api/createAccount")
def createAccount(data:dict):
    print(data.get("name"))
    print(data.get("password"))
    handleUser.insertUser(data.get("name"), data.get("password"))
    return {"status": "ok", "user": data.get("name")}

@app.post("/api/logIn")
def logIn(data: LoginRequest, response: Response):
    user = handleUser.getUserFromName(data.username)
    if(not user):
        response.status_code = 404
        return {"status": "error", "message": "User not found"}
    
    if(user["password"] != data.password):
        return {"status": "error", "message": "Incorrect password"}
    
    response.set_cookie(
        key="userSession", 
        value=str(user["name"]), 
        httponly=True, 
        samesite="lax",
        secure=False
    )
    return {"status": "ok", "message": f"Welcome, {user['name']}!"}

@app.get("/api/me")
def me(request: Request):
    user = request.cookies.get("userSession")
    if not user:
        return {"loggedIn": False}

    return {"loggedIn": True, "username": user}

@app.post("/api/logOut")
def logout(response: Response):
    response.delete_cookie("userSession")
    return {"status": "ok"}

@app.get("/api/pins")
def readPins():
    pins = handlePins.getPins()
    return pins