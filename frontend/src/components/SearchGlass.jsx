import { useState, useEffect } from "react";
import "./SearchGlass.css";

const SearchGlass = ({ pins,setFilteredPins,search, setSearch }) => {
  const [open, setOpen] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
    console.log(search);
    }
  };

  const handleChange = (value) =>{
    setSearch(value)

    if (!Array.isArray(pins)) return;

    const filtered = pins.filter((pin) =>
      pin.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPins(filtered);
  }

  return (
    <div className="SearchGlass">
      <div className={`search-container ${open ? "open" : ""}`}>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => handleChange(e.target.value)}
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