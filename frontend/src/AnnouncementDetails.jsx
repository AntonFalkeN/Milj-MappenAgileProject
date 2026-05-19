import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ReturnButton from "./components/ReturnButton.jsx";
import { useAuth } from "./context/useAuth";
import Button from "./components/Button.jsx";

export default function AnnouncementDetails() {
  const { id } = useParams();
  const { state } = useLocation();
  const { user } = useAuth();
  const [location, setLocation] = useState(state);
  const [ isOwner, setIsOwner ] = useState(state);

  useEffect(() => {
    if (!location) {
      // fallback if page is refreshed
      fetch(`${import.meta.env.VITE_API_URL}/api/locations/${id}`)
        .then((res) => res.json())
        .then(setLocation);
    }
    checkIfOwner();
  }, [id, location]);

  function checkIfOwner() {
    setIsOwner(location.username === user);
    return isOwner;
  }

  async function removeListing() {
    console.log("Removing pin:", location);
    const backendUrl = import.meta.env.VITE_API_URL;

    const res = await fetch(`${backendUrl}/api/items/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(location),
    });
    const data = await res.json();
    console.log(data);
  }

  function showPopup() {
    alert("Listing removed!");
  }
    

  if (!location) return <p>Loading...</p>;

  return (
    <div>
      <ReturnButton />

      <div>
        <h1>{location.title}</h1>
        <h2>{location.category}</h2>
        <p>{location.description}</p>
        <p> </p>
        <p>{location.starts_time}</p>
        <p>to</p>
        <p>{location.ends_time}</p>
        <p>{location.username} USER {user} </p>
        <div> 
          {isOwner &&
            (<Button onClick={removeListing}>Remove Listing</Button>)
          }
          {!isOwner && 
            (<Button onClick={console.log("Sending message to owner")}>Collect Listing</Button>)
          }
        </div>
      </div>
    </div>
  );
}
