from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow Vite (or any deployed frontend) to talk to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/items")
def get_items():
    # Temporary hardcoded data until you connect your .sql files
    return [
        {"id": 1, "name": "Old Bicycle", "location": "Odenplan"},
        {"id": 2, "name": "Wooden Chair", "location": "T-Centralen"},
        {"id": 3, "name": "CRT Monitor", "location": "Slussen"}
    ]