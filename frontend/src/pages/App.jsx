import { useState, useEffect } from "react";
import heroImg from "../assets/hero.png";
import MapComponent from "../components/MapComponent.jsx";
import "./App.css";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import CreateAccount from "./CreateAccount.jsx";
import Login from "./Login.jsx";
import ProfilePage from "./ProfilePage.jsx";
import BottomNav from "../components/BottomNav.jsx";
import Home from "./Home.jsx";
import { useAuth } from "../context/useAuth.js";
import Button from "../components/Button.jsx";
import ListingPage from "./ListingPage.jsx";
import Header from "../components/Header.jsx";


import AnnouncementDetails from "../AnnouncementDetails.jsx";

function MapPage() {
  const [markers, setMarkers] = useState([]);
  const {user} = useAuth();

  const navigate = useNavigate();
  const onCreateAccount = () => {
    navigate("/create-account");
  };

  const onLogin = () => {
    navigate("/login");
  };

  const testMarker = {
    id: "TEST1234",
    lng: 11.976,
    lat: 57.68962,
    title: "TESTMARKER",
    description: "TESTTEASTTEST",
  };

  // Fetch from backend
  useEffect(() => {
    // Vite uses import.meta.env to read your .env file securely
    const backendUrl = import.meta.env.VITE_API_URL;
    fetch(`${backendUrl}/api/items`)
      .then((response) => response.json())
      .then((data) => setMarkers(data))
      .catch((error) => console.error("Could not connect to backend:", error));
  }, []);

  return (
    <div>
      <Header></Header>
      {<div id="account-buttons">
        {!user && (console.log("No user logged in"),
          <div>
          <Button id="login-button" onClick={onLogin} variant="login-button" text="Log In" />
          <Button id="create-account-button" onClick={onCreateAccount} variant="login-button" text="Create Account" />
          </div>
        )}
        {user && ( console.log("User is logged in:", user),
          <Button id="profile-button" onClick={() => navigate("/profile") } variant="profile-button" text="👤" />
        )}
      </div>
      }
      {/* {items.length === 0 ? (
        <p>Loading data from Python...</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <strong>{item.name}</strong> - Pick up at: {item.location}
            </li>
          ))}
        </ul>
      )} */}
      <MapComponent markers={markers} />
      <BottomNav />
    </div>
  );
}

export default function App() {
  return (
    
    <Routes>
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/listingPage" element={<ListingPage />} />
      <Route path="/" element={<Home />}></Route>
      <Route path="/create-account" element={<CreateAccount />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/location/:id" element={<AnnouncementDetails />} />
      <Route path="/map" element={<MapPage />} />
    </Routes>
  );
}
