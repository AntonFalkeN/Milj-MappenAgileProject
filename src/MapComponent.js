import * as React from 'react';
import Map from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

function MapComponent() {
  return (
    <Map
      mapboxAccessToken="Fråga olle om den eftersom repot är public"
      initialViewState={{
        longitude: 57.7038,
        latitude: 11.9358,
        zoom: 14
      }}
      style={{ width: '100vw', height: '70vh' }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
    />
  );
}

export default MapComponent;