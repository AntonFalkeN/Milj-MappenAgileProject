

import os
import psycopg2
from psycopg2.extras import RealDictCursor
import handlePins
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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
    handlePins.insertPin("Johanneberg", 11.97695, 57.68962, "Campus Johanneberg", "Chalmers University of Technology (Johanneberg)")
    handlePins.insertPin("Lindholmen", 11.936662797883773, 57.70653055063925, "Campus Lindholmen", "Chalmers University of Technology (Lindholmen)")

    pins = handlePins.getPins()
    return pins

