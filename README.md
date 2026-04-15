You need to install Node.js
Create a .env in /frontend and paste:
    VITE_API_URL=http://localhost:8000

useful commands:
    
    npm:
        To install dependencies
        npm install 

        To run local version of website
        npm run dev

    fastapi:
        To run local backend
        fastapi dev main.py

    Create a venv in backend/ and install dependencies:
        cd backend
        python -m venv .venv 
        pip install -r requirements.txt