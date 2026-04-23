import * as React from 'react';
import Map, { Marker, Popup } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

function MapComponent({ markers }) {
  const [selected, setSelected] = React.useState(null);

  return (
    <Map
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
      initialViewState={{
        longitude: 11.97695,
        latitude: 57.68962,
        zoom: 14
      }}
      style={{ height: '70vh' }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
    >
      {markers.map(m => (
        <Marker key={m.id} longitude={m.lng} latitude={m.lat} anchor="bottom">
          <div
            onClick={(e) => {
              e.stopPropagation();   // critical fix
              setSelected(m);
            }}
            style={{
              backgroundImage: "url('https://docs.mapbox.com/help/demos/custom-markers-gl-js/mapbox-icon.png')",
              backgroundSize: "cover",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              cursor: "pointer"
            }}
          />
        </Marker>
      ))}

      {selected && (
        <Popup
          longitude={selected.lng}
          latitude={selected.lat}
          offset={25}
          anchor="top"
          onClose={() => setSelected(null)}
        >
          <div>
            <h3>{selected.title}</h3>
            <p>{selected.description}</p>
            <button onClick={() => console.log("Button clicked")}>
              Details
            </button>
          </div>
        </Popup>
      )}
    </Map>
  );
}

export default MapComponent;