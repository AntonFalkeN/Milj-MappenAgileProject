import "./BottomNav.css";
import { useNavigate, useLocation } from "react-router-dom";

export default function BottomNav() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
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

        <span
        className={location.pathname === "/profile" ? "active" : ""}
        onClick={() => navigate("/profile")}
        >
        👤
        </span>
    </div>
    );
}