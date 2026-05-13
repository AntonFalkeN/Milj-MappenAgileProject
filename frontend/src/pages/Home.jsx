import { useNavigate } from "react-router-dom"; // Hämta useNavigate (funktion) för att navigera mellan sidor
import Button from "../components/Button"; // Importera Button-komponenten
import "./Home.css"; // Importera CSS för Home-sidan
import Footer from "../components/Footer";
import gitJavaImage from "../assets/gitJava.png";
import PictureGridSection from "../components/PictureGridSection";
import BottomNav from "../components/BottomNav.jsx";
import Header from "../components/Header.jsx";


const Home = () => {
  const navigate = useNavigate(); // Använd useNavigate() för att få tillgång till navigeringsfunktionen. Lägg funktionen i variabeln navigate.

  const nearYouItems = [
    {
      id: 1,
      imageSrc: gitJavaImage,
      imageAlt: "Nearby listing",
    },
    {
      id: 2,
      imageSrc: gitJavaImage,
      imageAlt: "Nearby listing",
    },
    {
      id: 3,
      imageSrc: gitJavaImage,
      imageAlt: "Nearby listing",
    },
    {
      id: 4,
      imageSrc: gitJavaImage,
      imageAlt: "Nearby listing",
    },
  ];

  const newListingItems = [
    {
      id: 1,
      imageSrc: gitJavaImage,
      imageAlt: "New listing",
    },
    {
      id: 2,
      imageSrc: gitJavaImage,
      imageAlt: "New listing",
    },
    {
      id: 3,
      imageSrc: gitJavaImage,
      imageAlt: "New listing",
    },
    {
      id: 4,
      imageSrc: gitJavaImage,
      imageAlt: "New listing",
    },
  ];

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
        <div className="publishButtonWrapper">
          <Button
            text="Publish"
            variant="publish-button"
            onClick={() => navigate("/map")}
          />
        </div>

        <PictureGridSection title="Near You" items={nearYouItems} />

        <div className="homeSectionDivider" />

        <PictureGridSection
          title="New listings"
          items={newListingItems}
          sectionClassName="newListingsSection"
        />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
