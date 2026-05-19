

import os
import psycopg2
from psycopg2.extras import RealDictCursor
import handlePins
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
    allow_origins=["http://localhost:5173"],  # Replace with your frontend URLq
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/items")
def add_item(item: dict): #dict should be taken as parameter for the databases' sakes
    id = item.get("id")
    lng = item.get("lng")
    lat = item.get("lat")
    title = item.get("title")
    description = item.get("description")
    
    print("MARKER",id, lng, lat, title, description)
    handlePins.insertPin(id, lng, lat, title, description)
    
    return {"message": "Item added successfully"}

@app.get("/api/items")
def get_items():    
    
    # If you for whatevah reason want to use sql in here
    # query_path = os.path.join(os.getcwd(), "sql_queries", "testing.sql")
    # with open(query_path, "r") as file:
    #     query = file.read()
    handlePins.insertPin("Johanneberg", 11.97695, 57.68962, "Campus Johanneberg", "Chalmers University of Technology (Johanneberg)", "cans", "00:00;02:00")
    handlePins.insertPin("Lindholmen", 11.936662797883773, 57.70653055063925, "Campus Lindholmen", "Chalmers University of Technology (Lindholmen)", "cans", "00:00;02:00")

    pins = handlePins.getPins()
    return pins


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