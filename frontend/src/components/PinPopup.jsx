import { useState, useEffect, useRef } from 'react';
import './PinPopup.css'; // this file should now contain the camelCase selectors

const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';

export default function AddressPopup({ isOpen, onClose, onSave }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const debounceRef = useRef(null);

  // Reset all fields when the popup opens
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setResults([]);
      setSelected(null);
      setTitle('');
      setDescription('');
      setError('');
    }
  }, [isOpen]);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      searchAddress(query);
    }, 400);

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  const searchAddress = async (q) => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({
        q,
        format: 'json',
        addressdetails: 1,
        limit: 5,
      });
      const res = await fetch(`${NOMINATIM_URL}?${params}`, {
        headers: {
          'User-Agent': 'WasteWatchersApp',
        },
      });
      if (!res.ok) throw new Error('Request failed');
      const data = await res.json();
      setResults(data);
    } catch (err) {
      setError('Search failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (item) => {
    setSelected({
      lat: parseFloat(item.lat),
      lng: parseFloat(item.lon),
      displayName: item.display_name,
    });
    setResults([]);
    setQuery('');
  };

  const handleSave = () => {
    if (!selected) return;
    onSave({
      lat: selected.lat,
      lng: selected.lng,
      title: title.trim(),
      description: description.trim(),
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        <h2>Add Location</h2>

        {!selected && (
          <>
            <input
              type="text"
              placeholder="Search for an address…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="searchInput"
              autoFocus
            />
            {loading && <div className="infoText">Searching...</div>}
            {error && <div className="errorText">{error}</div>}

            {results.length > 0 && (
              <ul className="resultsList">
                {results.map((item) => (
                  <li
                    key={item.place_id}
                    onClick={() => handleSelect(item)}
                    className="resultItem"
                  >
                    {item.display_name}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        {selected && (
          <div className="selectedInfo">
            <p>
              <strong>Location:</strong> {selected.displayName}
            </p>

            <input
              type="text"
              placeholder="Name of place (ex Johanneberg)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="fieldInput"
            />
            <textarea
              placeholder="Description (ex, 'press the bell on Port 3')"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="fieldInput"
              rows={3}
            />

            <button className="saveBtn" onClick={handleSave}>
              Save Location
            </button>
          </div>
        )}

        <button className="closeBtn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}