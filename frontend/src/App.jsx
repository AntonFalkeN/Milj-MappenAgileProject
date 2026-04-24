import { useState, useEffect } from 'react'
import heroImg from './assets/hero.png'
import MapComponent from './MapComponent';
import './App.css'
import { useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import CreateAccount from './CreateAccount';
import Login from "./Login"

import AnnouncementDetails from './AnnouncementDetails';

function Map() {
    const [items, setItems] = useState([]);

    const navigate = useNavigate();
    const onCreateAccount = () => {        
        navigate("/create-account");
    }

    const onLogin = () => {        
        navigate("/login");
    }


    // Fetch from backend
    useEffect(() => {
      // Vite uses import.meta.env to read your .env file securely
        const backendUrl = import.meta.env.VITE_API_URL;
        fetch(`${backendUrl}/api/items`)
        .then(response => response.json())
        .then(data => setItems(data))
        .catch(error => console.error("Could not connect to backend:", error));
    }, []);


    return (

        <div>            

            <div id="account-buttons">
                <button id="login-button" onClick={onLogin}>Login</button>
                <button id="create-account-button" onClick={onCreateAccount}>Create Account</button>
            </div>     
      
            {items.length === 0 ? (
            <p>Loading data from Python...</p>
            ) : (
            <ul>
                {items.map(item => (
                <li key={item.id}>
                    <strong>{item.name}</strong> - Pick up at: {item.location}
                </li>
                ))}
            </ul>
            )}      
            <MapComponent markers={[ // PLACEHOLDER VALUES, LOAD FROM BACKEND/DATABASE LATER
                { id: "Johanneberg", lng: 11.97695, lat: 57.68962, title: "Campus Johanneberg", description: "Chalmers University of Technology (Johanneberg)" },
                { id: "Lindholmen", lng: 11.936662797883773, lat: 57.70653055063925, title: "Campus Lindholmen", description: "Chalmers University of Technology (Lindholmen)" }
            ]}/>
        </div>   
        
    );
}


export default function App() {    

    return (
        <Routes>
            <Route path="/" element={<Map />}></Route>
            <Route path="/create-account" element={<CreateAccount />}></Route>
            <Route path="/login" element={<Login />}></Route>
        </Routes>                 
    );
}

