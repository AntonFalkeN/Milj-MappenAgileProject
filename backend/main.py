

import os
import psycopg2
from psycopg2.extras import RealDictCursor
import handlePins
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# 1. Load the variables from the .env file
load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/items")
def get_items():
    # 2. Get the database URL from the .env file
    db_url = os.getenv("DATABASE_URL")
    
    # For local development
    # with open("sql_queries/testing.sql", "r") as file:
    #     query = file.read()

    # query_path = os.path.join(os.getcwd(), "sql_queries", "testing.sql")
    # with open(query_path, "r") as file:
    #     query = file.read()

    # For local development
    # conn = psycopg2.connect(host="localhost",
    #         user="postgres",
    #         dbname="agile",
    #         password="postgres")

    conn = psycopg2.connect(db_url)
    conn.autocommit = True
    cursor = conn.cursor(cursor_factory=RealDictCursor)
        
    try:
        # 5. Execute the query and fetch the data
        # cursor.execute(query)
        # items = cursor.fetchall()
        # print(items)

        handlePins.insertPin("Johanneberg", 11.97695, 57.68962, "Campus Johanneberg", "Chalmers University of Technology (Johanneberg)")
        handlePins.insertPin("Lindholmen", 11.936662797883773, 57.70653055063925, "Campus Lindholmen", "Chalmers University of Technology (Lindholmen)")

        pins = handlePins.getPins()
        return pins
    finally:
        # 6. ALWAYS close the connection when done
        cursor.close()
        conn.close()





# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware

# app = FastAPI()

# # Allow Vite (or any deployed frontend) to talk to this backend
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"], 
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# @app.get("/api/items")
# def get_items():
#     # Temporary hardcoded data until you connect your .sql files
#     return [
#         {"id": 1, "name": "Old Bicycle", "location": "Odenplan"},
#         {"id": 2, "name": "Wooden Chair", "location": "T-Centralen"},
#         {"id": 3, "name": "CRT Monitor", "location": "Slussen"}
#     ]