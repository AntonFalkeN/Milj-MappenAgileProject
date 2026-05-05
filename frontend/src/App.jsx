import { useState, useEffect } from 'react'
import heroImg from './assets/hero.png'
import MapComponent from './MapComponent';
import './App.css'
import { useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import CreateAccount from './CreateAccount';
import Login from "./Login"

import AnnouncementDetails from './AnnouncementDetails';

function MapPage() {
    // const [items, setItems] = useState([]);


    // Default markers would be best to load from database
    // This can act as a temp database
    const [markers, setMarkers] = useState([]);
    // = useState([
    //     { id: "Johanneberg", lng: 11.97695, lat: 57.68962, title: "Campus Johanneberg", description: "Chalmers University of Technology (Johanneberg)" },
    //     { id: "Lindholmen", lng: 11.936662797883773, lat: 57.70653055063925, title: "Campus Lindholmen", description: "Chalmers University of Technology (Lindholmen)" }
    // ]);

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
        .then(data => setMarkers(data))
        .catch(error => console.error("Could not connect to backend:", error));        
    }, []);


    // add or remove markers
    useEffect(() => {
        window.addMarker = (marker) => {
            setMarkers(prev => [...prev, marker]);
            console.log('Marker added!', marker);
        };

        window.removeMarker = (id) => {
            setMarkers(prev => prev.filter(m => m.id !== id));
            console.log('Marker removed:', id);
        };
        return () => {
            delete window.addMarker;
            delete window.removeMarker;
        };
    },[]);

    return (

        <div>            

            <div id="account-buttons">
                <button id="login-button" onClick={onLogin}>Login</button>
                <button id="create-account-button" onClick={onCreateAccount}>Create Account</button>
            </div>     
      
            {/* {items.length === 0 ? (
            <p>Loading data from Python...</p>
            ) : (
            // <ul>
            //     {items.map(item => (
            //     <li key={item.id}>
            //         <strong>{item.name}</strong> - Pick up at: {item.location}
            //     </li>
            //     ))}
            // </ul>
            )}       */}
            <MapComponent markers={markers} />
        </div>   
        
    );
}


export default function App() {    

    return (
        <Routes>
            <Route path="/" element={<MapPage />}></Route>
            <Route path="/create-account" element={<CreateAccount />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/location/:id" element={<AnnouncementDetails />} />
        </Routes>                 
    );
}
