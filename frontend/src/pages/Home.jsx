import { useNavigate } from "react-router-dom"; // Hämta useNavigate (funktion) för att navigera mellan sidor
import Button from "../components/Button"; // Importera Button-komponenten
import "./Home.css"; // Importera CSS för Home-sidan
import Footer from "../components/Footer";
import gitJavaImage from "../assets/gitJava.png";
import PictureGridSection from "../components/PictureGridSection";
import BottomNav from "../components/BottomNav.jsx";
import Header from "../components/Header.jsx";

import PictureButton from "../components/pictureButton";
import { useEffect, useState } from "react";


const Home = () => {
  const navigate = useNavigate(); // Använd useNavigate() för att få tillgång till navigeringsfunktionen. Lägg funktionen i variabeln navigate.
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [nearby, setNearby] = useState([]);


  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation stöds inte");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("Latitude:", position.coords.latitude);
        console.log("Longitude:", position.coords.longitude);

        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        setError("Cant get position");
      }
    );
  }, []);
  useEffect(() => {
  if (!location) return;
    
  fetch("http://localhost:8000/api/nearby", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    lat: location.lat,
    lng: location.lng,
  }),
})
  .then((res) => res.json())
  .then((data) => setNearby(data));
}, [location]);


  return (
    <div className="homePage">
      <svg
        className="greenBackgroundShape"
        viewBox="0 0 440 1190"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect y="38" width="440" height="1152" fill="#DCFFD0" />
        <path d="M0 0L19.5 27L68 38H0V0Z" fill="#DCFFD0" />
        <path d="M440 0L423.368 27L382 38H440V0Z" fill="#DCFFD0" />
      </svg>

      <main className="homeContent">
        <Header></Header>
        <BottomNav></BottomNav>
        <div className="publishButtonWrapper">
          <Button
            text="Publish"
            variant="publish-button"
            onClick={() => navigate("/map")}
          />
        </div>

        <section className="nearYouSection">
          <h2 className="nearYouTitle">Near You</h2>

          <div className="nearYouGrid">
            {!location && <p>Fetching position</p>}
            {location && nearby.length > 0 &&(
              <>
              {
                nearby.slice(0,4).map((pin) => (
                  <PictureButton key={pin.id} imageSrc={gitJavaImage} imageAlt={pin.id}/>
                ))}
            
            {/*<PictureButton imageSrc={gitJavaImage} imageAlt="Nearby listing"/> */}
            {/*<PictureButton imageSrc={gitJavaImage} imageAlt="Nearby listing"/> */}
            {/*<PictureButton imageSrc={gitJavaImage} imageAlt="Nearby listing"/> */}
            {/*<PictureButton imageSrc={gitJavaImage} imageAlt="Nearby listing"/> */}
             </>
            )}
          </div>
          <div className="nearYouDivider" />
        </section>
      </main>
      <Footer />
    </div>
  );
};
export default Home;
