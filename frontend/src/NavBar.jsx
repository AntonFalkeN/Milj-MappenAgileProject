import { Link } from "react-router-dom";

function NavBar() {
    return (
    <div style={styles.nav}>
        <Link to="/" style={styles.link}>
        <Home />
        </Link>

        <Link to="/about" style={styles.link}>
        <User />
        </Link>
    </div>
    );
}

const styles = {
    nav: {
    position: "fixed",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "#fff",
    padding: "15px 25px",
    borderRadius: "40px",
    display: "flex",
    gap: "30px",
    boxShadow: "0 5px 20px rgba(219, 239, 225, 0.2)",
    },
    link: {
    color: "#88a371",
    },
};

export default NavBar;