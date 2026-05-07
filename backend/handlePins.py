import psycopg2
from psycopg2.extras import RealDictCursor
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

def insertPin(id, lng, lat, title, description):
    conn = None
    cursor = None

    try:
        # Connect to Railway PostgreSQL
        conn = psycopg2.connect(DATABASE_URL)
        cursor = conn.cursor()

        # Create table if it doesn't exist
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS Pins (
                id TEXT PRIMARY KEY,
                lng REAL NOT NULL,
                lat REAL NOT NULL,
                title TEXT NOT NULL,
                description TEXT NOT NULL
            );
        """)

        # Insert user
        cursor.execute("""
            INSERT INTO Pins (id, lng, lat, title, description)
            VALUES (%s, %s, %s, %s, %s)
            RETURNING id;
        """, (id, lng, lat, title, description))

        inserted_id = cursor.fetchone()[0]
        print()

        # Save changes
        conn.commit()

        print(f"Inserted pin with ID: {inserted_id}")

    except Exception as e:
        print("Error:", e)

    finally:        
        if cursor:
            cursor.close()
        if conn:
            conn.close()
        
    # return inserted_id

def getPins():
    conn = None
    cursor = None

    try:
        # Connect to Railway PostgreSQL
        conn = psycopg2.connect(DATABASE_URL)
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        cursor.execute("""
            SELECT id, lng, lat, title, description
            FROM Pins
                       """)            
        
        pin = cursor.fetchall()                

        if pin:
            print("Pins found", pin)
            return pin

        else:
            print("No pin found")
            return None

    except Exception as e:
        print("Error", e)
        return []

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
