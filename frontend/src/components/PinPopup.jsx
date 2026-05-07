import { useState, useEffect, useRef } from 'react';
import './PinPopup.css'; 

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
          'User-Agent': 'YourAppName/1.0 (your@email.com)',
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
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Add Location</h2>

        {!selected && (
          <>
            <input
              type="text"
              placeholder="Search for an address…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="search-input"
              autoFocus
            />
            {loading && <div className="info-text">Searching...</div>}
            {error && <div className="error-text">{error}</div>}

            {results.length > 0 && (
              <ul className="results-list">
                {results.map((item) => (
                  <li
                    key={item.place_id}
                    onClick={() => handleSelect(item)}
                    className="result-item"
                  >
                    {item.display_name}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        {/* Selected location info + custom fields */}
        {selected && (
          <div className="selected-info">
            <p>
              <strong>Location:</strong> {selected.displayName}
            </p>

            <input
              type="text"
              placeholder="Name of place (ex Johanneberg)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="field-input"
            />
            <textarea
              placeholder="Description (ex, 'press the bell on Port 3')"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="field-input"
              rows={3}
            />

            <button className="save-btn" onClick={handleSave}>
              Save Location
            </button>
          </div>
        )}

        <button className="close-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}