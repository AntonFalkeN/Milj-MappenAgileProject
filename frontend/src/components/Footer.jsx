import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <svg
        className="footer-shape"
        viewBox="0 0 440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse
          cx="437"
          cy="15.5"
          rx="21"
          ry="15.5"
          transform="rotate(-180 437 15.5)"
          fill="#2D3F27"
        />
        <ellipse
          cx="437"
          cy="15.5"
          rx="21"
          ry="15.5"
          transform="rotate(-180 437 15.5)"
          fill="black"
          fill-opacity="0.2"
        />
        <ellipse
          cx="22"
          cy="15.5"
          rx="22"
          ry="15.5"
          transform="matrix(1 0 0 -1 -17 31)"
          fill="#2D3F27"
        />
        <ellipse
          cx="22"
          cy="15.5"
          rx="22"
          ry="15.5"
          transform="matrix(1 0 0 -1 -17 31)"
          fill="black"
          fill-opacity="0.2"
        />
        <ellipse
          cx="49.5"
          cy="24"
          rx="49.5"
          ry="24"
          transform="matrix(1 0 0 -1 -17 63)"
          fill="#2D3F27"
        />
        <ellipse
          cx="49.5"
          cy="24"
          rx="49.5"
          ry="24"
          transform="matrix(1 0 0 -1 -17 63)"
          fill="black"
          fill-opacity="0.2"
        />
        <ellipse
          cx="410.5"
          cy="39"
          rx="47.5"
          ry="24"
          transform="rotate(-180 410.5 39)"
          fill="#2D3F27"
        />
        <ellipse
          cx="410.5"
          cy="39"
          rx="47.5"
          ry="24"
          transform="rotate(-180 410.5 39)"
          fill="black"
          fill-opacity="0.2"
        />
        <rect
          width="440"
          height="43"
          transform="matrix(1 0 0 -1 0 84)"
          fill="#2D3F27"
        />
        <rect
          width="440"
          height="43"
          transform="matrix(1 0 0 -1 0 84)"
          fill="black"
          fill-opacity="0.2"
        />
      </svg>

      <div className="footer-content">
        <svg
          className="footer-top-icon"
          viewBox="0 0 27 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M14.7801 0.587225L26.6047 11.9328L23.649 14.7687L13.3023 4.84108L2.95561 14.7687L0 11.9328L11.8245 0.587225C12.2165 0.211236 12.7481 1.62125e-05 13.3023 1.62125e-05C13.8566 1.62125e-05 14.3882 0.211236 14.7801 0.587225Z"
            fill="white"
          />
        </svg>

        <nav className="footer-links">
          <a href="#">Contact</a>
          <a href="#">About</a>
          <a href="#">Privacy</a>
        </nav>
        <p>© 2026 Milj</p>
      </div>
    </footer>
  );
}

export default Footer;
