import { useNavigate } from "react-router-dom";
import "./PictureButton.css";

export default function ReturnButton() {
    const navigate = useNavigate();

    return (
        <button onClick={() => navigate("/map")}>
        Go back
        </button>
    );
}