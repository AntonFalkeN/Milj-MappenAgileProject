import psycopg2
from psycopg2.extras import RealDictCursor
import os
from dotenv import load_dotenv
import geopy.distance

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

def insertPin(id, lng, lat, title, description, category, starts_time, ends_time):
    conn = None
    cursor = None

    try:
        # Connect to Railway PostgreSQL
        conn = psycopg2.connect(DATABASE_URL)
        cursor = conn.cursor()

        # Create table if it doesn't exist
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS Pins (
                id PRIMARY KEY,
                title TEXT NOT NULL,
                lng REAL NOT NULL,
                lat REAL NOT NULL,
                description TEXT NOT NULL,
                category TEXT NOT NULL,
                start_time TIMESTAMP NOT NULL,
                ends_time TIMESTAMP NOT NULL
            );
        """)

        # Insert user
        cursor.execute("""
            INSERT INTO Pins (id, lng, lat, title, description, category, starts_time, ends_time)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING id;
        """, (id, title, lng, lat, description, category, starts_time, ends_time))

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
            SELECT id, title, lng, lat, description, category, starts_time, ends_time
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
            SELECT id, title, lng, lat, description, category, starts_time, ends_time
            FROM Pins
            WHERE category = %s
                       """, (category,))            
        
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

def getPinsFromDistance(coordinates, distance): #Coordinates as (lat, lng) tuple and distance as int in km
    conn = None
    cursor = None

    try:
        # Connect to Railway PostgreSQL
        conn = psycopg2.connect(DATABASE_URL)
        cursor = conn.cursor(cursor_factory=RealDictCursor)


        cursor.execute("""
            SELECT id, title, lng, lat, description, category, starts_time, ends_time
            FROM Pins
                       """)            
        
        pins = cursor.fetchall()                

        nearby_pins = []

        for pin in pins:
            pin_coordinates = (pin["lat"], pin["lng"])
            distance_km = geopy.distance.distance(coordinates, pin_coordinates).km

            if distance_km <= distance:
                nearby_pins.append(pin)


        if nearby_pins:
            print("Nearby Pins found", nearby_pins)
            return nearby_pins

        else:
            print("No pins found")
            return None

    except Exception as e:
        print("Error", e)

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()


