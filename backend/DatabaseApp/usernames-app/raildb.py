import psycopg2

import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

def insertUser(name, password):
    conn = None
    cursor = None

    try:
        # Connect to Railway PostgreSQL
        conn = psycopg2.connect(DATABASE_URL)
        cursor = conn.cursor()

        # Create table if it doesn't exist
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                password TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        """)

        # Insert user
        cursor.execute("""
            INSERT INTO users (name, password)
            VALUES (%s, %s)
            RETURNING id;
        """, (name, password))

        inserted_id = cursor.fetchone()[0]

        # Save changes
        conn.commit()

        print(f"Inserted user with ID: {inserted_id}")

    except Exception as e:
        print("Error:", e)

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()


def getUserFromID(userID):
    conn = None
    cursor = None

    try:
        # Connect to Railway PostgreSQL
        conn = psycopg2.connect(DATABASE_URL)
        cursor = conn.cursor()

        # Create table if it doesn't exist
        cursor.execute("""
            SELECT id, name, password
            FROM users
            WHERE id = %s;
            """, (userID,))
        
        user = cursor.fetchone()

        if user:
            print("User found", user)
            return user

        else:
            print("No user found")
            return None

    except Exception as e:
        print("Error", e)

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

getUserFromID(1)