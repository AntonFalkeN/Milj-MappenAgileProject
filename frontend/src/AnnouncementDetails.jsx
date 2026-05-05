import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ReturnButton from "./components/ReturnButton.jsx";

export default function AnnouncementDetails() {
  const { id } = useParams();
  const { state } = useLocation();

  const [location, setLocation] = useState(state);

  useEffect(() => {
    if (!location) {
      // fallback if page is refreshed
      fetch(`${import.meta.env.VITE_API_URL}/api/locations/${id}`)
        .then((res) => res.json())
        .then(setLocation);
    }
  }, [id, location]);

  if (!location) return <p>Loading...</p>;

  return (
    <div>
      <ReturnButton />

      <div>
        <h1>{location.title}</h1>
        <p>{location.description}</p>
        <p>ID: {id}</p>
      </div>
    </div>
  );
}
