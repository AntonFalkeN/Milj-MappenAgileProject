import "./BottomNav.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth.js";

export default function BottomNav() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    return (
        console.log("BottomNav - current user:", user),
    <div className="bottom-nav">
        <span
        className={location.pathname === "/" ? "active" : ""}
        onClick={() => navigate("/")}
        >
        🏠
        </span>

        <span
        className={location.pathname === "/map" ? "active" : ""}
        onClick={() => navigate("/map")}
        >
        🗺️
        </span>
        {!user &&(
        <span
            className={location.pathname === "/profile" ? "active" : ""}
            onClick={() => navigate("/login")}
            >
            👤
        </span>
        )}
        {user &&(
        <span
            className={location.pathname === "/profile" ? "active" : ""}
            onClick={() => navigate("/profile")}
            >
            👤
        </span>
        )}
        
    </div>
    );
}