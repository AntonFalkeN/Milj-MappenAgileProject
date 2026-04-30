import { useNavigate } from "react-router-dom";

export default function PopupContent({ location }) {
    const navigate = useNavigate();

    return (
        <div>
            <h3>{location.title}</h3>
            <p>{location.description}</p>

            <button onClick={() => navigate(`/location/${location.id}`, {state: location})}>
                Go to page
            </button>
        </div>
    );
}