// ProfilePage.jsx
import "./ProfilePage.css";
import BottomNav from "../components/BottomNav.jsx";
import Button from "../components/Button.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();
  
  async function logOut() {
    const backendUrl = import.meta.env.VITE_API_URL;
    await fetch(`${backendUrl}/api/logOut`, {
      method: "POST",
      credentials: "include",
    });
    await refreshUser();
    navigate("/login");
  }

  return (
    <div className="page">
      {/* HEADER */}
      <div className="header">
        <h1>Profile</h1>
        <div className="avatar-icon"></div>
      </div>

      {/* CONTENT */}
      <div className="content">
        <h2 className="name">Alex Löfstedt</h2>

        {/* PROFILE IMAGE */}
        <div className="image-box">
          <span>🖼️</span>
        </div>
        <p className="image-text">Profile picture</p>

        {/* DESCRIPTION */}
        <div className="description-section">
          <h3>Description</h3>
          <div className="description-box">
            Example, pick up pant baskets at Kroksslätts Parkgata 29
          </div>
        </div>
        <Button id="logout-button" onClick={logOut} variant="logout-button" text="Log Out" />
        <BottomNav />
      </div>
    </div>
  );
}
