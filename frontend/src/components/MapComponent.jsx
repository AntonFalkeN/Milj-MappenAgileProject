import * as React from 'react';
import Map, { Marker, Popup } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import PopupContent from "../PopupContent";
import Button from './Button';
import PinPopup from "./PinPopup";

function MapComponent({ markers }) {
  const [selected, setSelected] = React.useState(null);
  const [popupOpen, setPopupOpen] = React.useState(false);

  const handleSave = (locationData) => {
    // add to backend here
    const newMarker = {
      // id: Date.now().toString(), //potentially generate ids like "username;number;timestamp" to avoid collisions and be able to remove easier
      
      lat: locationData.lat,
      lng: locationData.lng,
      title: locationData.title,
      description: locationData.description,
    };
    deliverPin(newMarker);
    setPopupOpen(false);
  };

  async function deliverPin(marker) { //take marker as parameter
    console.log("Delivering pin:", marker);
    const backendUrl = import.meta.env.VITE_API_URL;



    const res = await fetch(`${backendUrl}/api/items`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(marker),
    });
    const data = await res.json();
    console.log(data);
  }


  return (
    <div style={{ position: 'relative', height: '70vh' }}>
      <Map
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        initialViewState={{
          longitude: 11.97695,
          latitude: 57.68962,
          zoom: 14,
          pitch: 0,
          bearing: 0,
        }}
        style={{ height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        pitchWithRotate={false}
      >
        {markers.map(m => (
          <Marker key={m.id} longitude={m.lng} latitude={m.lat} anchor="bottom">
            <div
              onClick={(e) => {
                e.stopPropagation();
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
            <PopupContent location={selected} />
          </Popup>
        )}
      </Map>

      <Button
        onClick={() => setPopupOpen(true)}
        variant="map-corner-top-right"
      >
        <svg width="30" height="35" viewBox="0 0 30 35" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.4372 34.8923C8.26559 31.2709 5.15006 27.9075 3.09066 24.8021C1.03126 21.6967 0.00103644 18.8218 0 16.1773C0 12.2123 1.25046 9.0535 3.75138 6.70091C6.25231 4.34832 9.1476 3.17203 12.4372 3.17203H13.2146C13.4737 3.17203 13.7328 3.19846 13.9919 3.25133V6.46301C13.7328 6.41014 13.4799 6.37683 13.2332 6.36309C12.9866 6.34934 12.7212 6.343 12.4372 6.34406C9.82024 6.34406 7.6116 7.26289 5.8113 9.10055C4.01101 10.9382 3.11035 13.2971 3.10931 16.1773C3.10931 18.0541 3.87368 20.2021 5.40243 22.6213C6.93117 25.0405 9.27611 27.7299 12.4372 30.6894C15.5984 27.7288 17.9433 25.0395 19.4721 22.6213C21.0008 20.2032 21.7652 18.0552 21.7652 16.1773V15.8601H24.8745V16.1773C24.8745 18.8207 23.8448 21.6956 21.7854 24.8021C19.726 27.9086 16.6099 31.272 12.4372 34.8923ZM14.634 18.1012C15.2424 17.4795 15.5466 16.7324 15.5466 15.8601C15.5466 14.9878 15.2424 14.2413 14.634 13.6207C14.0256 13 13.2933 12.6892 12.4372 12.6881C11.5812 12.6871 10.8494 12.9979 10.2421 13.6207C9.63472 14.2435 9.33001 14.9899 9.32794 15.8601C9.32586 16.7303 9.63058 17.4773 10.2421 18.1012C10.8536 18.725 11.5853 19.0353 12.4372 19.0322C13.2892 19.029 14.0214 18.7187 14.634 18.1012ZM21.7652 12.6881H24.8745V7.93007H29.5385V4.75804H24.8745V0H21.7652V4.75804H17.1012V7.93007H21.7652V12.6881Z" fill="#2D3F27"/>
        </svg>
      </Button>


      <PinPopup
        isOpen={popupOpen}
        onClose={() => setPopupOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}

export default MapComponent;