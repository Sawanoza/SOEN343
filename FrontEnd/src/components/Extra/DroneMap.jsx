import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const DroneMap = () => {
  const mapRef = useRef();

  const createDroneMarker = (lat, lng) => {
    // SVG content for the drone icon (from the provided URL)
    const droneSVG = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="32" height="32">
        <path fill="blue" d="M471.2 96.6c-7.1-7.1-18.6-7.1-25.7 0L320 223.3V64c0-10.7-8.6-19.4-19.4-19.4H211.3c-10.7 0-19.4 8.6-19.4 19.4v159.3L66.5 96.6c-7.1-7.1-18.6-7.1-25.7 0-7.1 7.1-7.1 18.6 0 25.7l126.9 126.9H64c-10.7 0-19.4 8.6-19.4 19.4v79.3c0 10.7 8.6 19.4 19.4 19.4h104.2l-73.7 73.7c-7.1 7.1-7.1 18.6 0 25.7 7.1 7.1 18.6 7.1 25.7 0L192 374.7V448c0 10.7 8.6 19.4 19.4 19.4h89.2c10.7 0 19.4-8.6 19.4-19.4v-73.3l77.1 77.1c7.1 7.1 18.6 7.1 25.7 0 7.1-7.1 7.1-18.6 0-25.7l-126.9-126.9h97.8c10.7 0 19.4-8.6 19.4-19.4v-79.3c0-10.7-8.6-19.4-19.4-19.4h-104.2l73.7-73.7c7.1-7.1 7.1-18.6 0-25.7z"/>
      </svg>`;

    const icon = new L.DivIcon({
      className: 'leaflet-div-icon no-background', // Custom class to remove the background
      html: droneSVG, // Using the drone SVG directly
      iconSize: [32, 32], // Size of the icon
      iconAnchor: [16, 16], // Position of the anchor (center)
      popupAnchor: [0, -32], // Popup location (above the icon)
    });

    const marker = L.marker([lat, lng], { icon }).addTo(mapRef.current);

    // Animate the drone in a circle
    let angle = 0;
    const radius = 0.02; // Radius for the circular motion
    const center = [lat, lng]; // The center point to move around

    const animateDrone = () => {
      angle = (angle + 0.5) % 360; // Slower rotation by reducing increment
      const newLat = center[0] + radius * Math.cos((angle * Math.PI) / 180);
      const newLng = center[1] + radius * Math.sin((angle * Math.PI) / 180);

      marker.setLatLng([newLat, newLng]);

      // Request the next frame for animation
      requestAnimationFrame(animateDrone);
    };

    animateDrone();
  };

  useEffect(() => {
    mapRef.current = L.map('map').setView([45.5017, -73.5673], 13); // Montreal, Quebec coordinates

    // Add OpenStreetMap TileLayer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapRef.current);

    // Create multiple drone markers at different locations in Montreal
    createDroneMarker(45.5017, -73.5673); // Drone 1 - Montreal coordinates
    createDroneMarker(45.5037, -73.5673); // Drone 2 - Slightly north of Montreal
    createDroneMarker(45.5057, -73.5700); // Drone 3 - Slightly east of Montreal
    createDroneMarker(45.4997, -73.5633); // Drone 4 - Slightly south of Montreal

    return () => {
      mapRef.current.remove();
    };
  }, []);

  return (
    <div>
      <h2>Drone Map - Montreal</h2>
      <div id="map" style={{ height: '500px', width: '100%' }}></div>
    </div>
  );
};

export default DroneMap;
