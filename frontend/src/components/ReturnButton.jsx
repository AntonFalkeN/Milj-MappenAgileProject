import { useNavigate } from "react-router-dom";

export default function ReturnButton() {
    const navigate = useNavigate();

    return (
        <button onClick={() => navigate("/map")}>
        Go back
        </button>
    );
}