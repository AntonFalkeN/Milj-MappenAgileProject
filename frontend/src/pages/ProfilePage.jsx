// ProfilePage.jsx
import "./ProfilePage.css";
import BottomNav from "../components/BottomNav"
import TopBar from "../components/TopBar";

export default function ProfilePage() {
        return (
    <div className="page">
      <TopBar title="Map" onSearch={(value) => console.log("Searching for:", value)}  />
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
          <BottomNav/>
        </div>

    </div>
    );
}