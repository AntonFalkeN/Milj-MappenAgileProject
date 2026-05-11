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