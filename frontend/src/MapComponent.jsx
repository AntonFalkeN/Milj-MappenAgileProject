import * as React from 'react';
import Map, { Marker } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

function MapComponent({ markers }) {
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
        <Marker key={m.id} longitude={m.lng} latitude={m.lat} />
      ))}
    </Map>
  );
}

export default MapComponent;