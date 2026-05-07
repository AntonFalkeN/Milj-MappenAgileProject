// ProfilePage.jsx
import "./ProfilePage.css";
import BottomNav from "../components/BottomNav.jsx";

export default function ProfilePage() {
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
        <BottomNav />
      </div>
    </div>
  );
}
