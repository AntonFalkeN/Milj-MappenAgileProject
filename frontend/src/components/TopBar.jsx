import { useState } from "react";
import "./TopBar.css";

export default function TopBar({ title, onSearch }) {
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);

    const handleKeyDown = (e) => {
    if (e.key === "Enter" && search.trim() !== "") {
        onSearch && onSearch(search.trim());
        console.log("Search:", search);

        setSearch("");
      setOpen(false); // stäng efter sök
    }
    };

    return (
    <div className="topbar">
        <h1 className="topbar-title">{title}</h1>

        <div className={`search-container ${open ? "open" : ""}`}>
        
        {open && (
            <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            />
        )}

        <button
            className="search-btn"
            onClick={() => setOpen(!open)}
        >
            🔍
        </button>
        </div>
    </div>
    );
}