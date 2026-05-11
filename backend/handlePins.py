import psycopg2
from psycopg2.extras import RealDictCursor
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

def insertPin(id, lng, lat, title, description, category, pickuptime):
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
                description TEXT NOT NULL,
                category TEXT NOT NULL,
                pickuptime TEXT,
            );
        """)

        # Insert user
        cursor.execute("""
            INSERT INTO Pins (id, lng, lat, title, description, category, pickuptime)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            RETURNING id;
        """, (id, lng, lat, title, description, category, pickuptime))

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
            SELECT id, lng, lat, title, description, category, pickuptime
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

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()


def removePinWithID(pinID):
    conn = None
    cursor = None

    try:
        # Connect to Railway PostgreSQL
        conn = psycopg2.connect(DATABASE_URL)
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        cursor.execute("""
            DELETE FROM Pins
            WHERE id = %s
            RETURNING id
                       """, (pinID,))            
        
        removedID = cursor.fetchone()

        conn.commit()

        if removedID:
            print(f"Removed pin with id: {removedID['id']}")

        else:
            print("No pin found with that ID")

    except Exception as e:
        print("Error", e)

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()



def getPinsFromCategory(category):
    conn = None
    cursor = None

    try:
        # Connect to Railway PostgreSQL
        conn = psycopg2.connect(DATABASE_URL)
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        cursor.execute("""
            SELECT id, lng, lat, title, description, category, pickuptime
            FROM Pins
            WHERE category = %s
                       """, (category))            
        
        pin = cursor.fetchall()                

        if pin:
            print("Pins found", pin)
            return pin

        else:
            print("No pin found")
            return None

    except Exception as e:
        print("Error", e)

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()