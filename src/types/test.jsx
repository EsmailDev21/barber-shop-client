import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import LeafletRoutingMachine from './LeafletRoutingMachine';

function Mapsmaps({ recommendations }) {
  const [userLocation, setUserLocation] = useState(null); // State to store user's location
  const [selectedPlace, setSelectedPlace] = useState(null); // State to store the selected place

  useEffect(() => {
    // Fetch user's location using Geolocation API
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Position from coords")
        console.log({latitude,longitude})
        setUserLocation({ lat: latitude, long: longitude });

      },
      (error) => {
        console.error('Error getting user location:', error);
      },{enableHighAccuracy}
    );
  }, []); // Empty dependency array ensures useEffect runs only once after the component mounts

  console.log({userLocation})
  if (!userLocation) {
    return <div>Loading...</div>; // Display loading message until user's location is fetched
  }

  const userIcon = L.icon({
    iconUrl: process.env.PUBLIC_URL +'/usermarker.webp',
    iconSize: [25, 41],
  });

  const placeIcon = L.icon({
    iconUrl: process.env.PUBLIC_URL + './markericon.png',
    iconSize: [25, 41],
  });

  const handleMarkerClick = (place) => {
    setSelectedPlace(place);
  };

  return (
    <div className="map-container" style={{ height: "400px", width: "100%" }}>
      <MapContainer center={[userLocation.lat, userLocation.long]} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Marker for User's Location */}
        <Marker position={[userLocation.lat, userLocation.long]} icon={userIcon}>
          <Popup>
            Your Location
          </Popup>
        </Marker>

        {/* Markers for Recommended Places */}
        {recommendations.map((place, index) => (
          <Marker key={index} position={[place.latitudeBN, place.longitudeBN]} icon={placeIcon} onClick={() => handleMarkerClick(place)}>
          <Popup>
            <div>
              <h3>{place.name}</h3>
              <div>
                
                {Array.from({ length: place.note }, (_, index) => (
                  <span key={index}>⭐</span>  
                ))}
              </div>
            </div>
          </Popup>
        </Marker>
        ))}

      {selectedPlace && <LeafletRoutingMachine userLocation={userLocation} selectedPlace={selectedPlace} />}

      </MapContainer>
    </div>
  );
}

export default Mapsmaps;