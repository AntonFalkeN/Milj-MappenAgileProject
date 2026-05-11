import { useNavigate } from "react-router-dom"; // Hämta useNavigate (funktion) för att navigera mellan sidor
import Button from "../components/Button"; // Importera Button-komponenten
import "./Home.css"; // Importera CSS för Home-sidan
import Footer from "../components/Footer";
import gitJavaImage from "../assets/gitJava.png";
import PictureButton from "../components/pictureButton";
import Header from "../components/Header.jsx";


const Home = () => {
  const navigate = useNavigate(); // Använd useNavigate() för att få tillgång till navigeringsfunktionen. Lägg funktionen i variabeln navigate.

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
      <Header></Header>
      <main className="homeContent">
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
            <PictureButton imageSrc={gitJavaImage} imageAlt="Nearby listing" />
            <PictureButton imageSrc={gitJavaImage} imageAlt="Nearby listing" />
            <PictureButton imageSrc={gitJavaImage} imageAlt="Nearby listing" />
            <PictureButton imageSrc={gitJavaImage} imageAlt="Nearby listing" />
          </div>

          <div className="nearYouDivider" />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
