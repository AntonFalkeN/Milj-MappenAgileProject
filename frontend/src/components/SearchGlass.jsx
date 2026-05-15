import { useState } from "react";
import "./SearchGlass.css";

const SearchGlass = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
    console.log(search);
    }
  };

  return (
    <div className="SearchGlass">
      <div className={`search-container ${open ? "open" : ""}`}>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button
          className="search-btn"
          onClick={() => setOpen(!open)}
        >
          🔍
        </button>
      </div>
    </div>
  );
};

export default SearchGlass;