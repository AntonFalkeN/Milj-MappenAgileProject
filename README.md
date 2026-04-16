You need to install Node.js

Create a .env in /frontend and paste:
    VITE_API_URL=http://localhost:8000

Install postgreSQL https://www.postgresql.org/
set name to postgres, database name to agile and password to postgres PLS

useful commands:
    
    npm:
        To install dependencies:
        npm install 

        To run local version of website:
        npm run dev

    fastapi:
        To run local backend:
        fastapi dev main.py

    Create a venv in backend/ and install dependencies:
        cd backend
        python -m venv .venv 
        pip install -r requirements.txt

    postgreSQL commands:
        connect to postgres in terminal:
        psql -U postgres
        
        choose database called agile:
        \c agile

        to run file called testing.sql (using terminal):
        \i testing.sql

        list all tables in database:
        \dt

        Delete everything inside database:        
        \set QUIT true
        SET client_min_messages TO NOTICE;
        DROP SCHEMA public CASCADE;
        CREATE SCHEMA public;
        GRANT ALL ON SCHEMA public TO postgres;
        \set QUIET false