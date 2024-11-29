import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Import the SVG as a static file
import droneIcon from '../../images/drone-1-svgrepo-com.svg';

const DroneMap = () => {
  const mapRef = useRef();

  const createDroneMarker = (lat, lng, movementPattern, speed) => {
    // Create a custom DivIcon with the imported SVG image
    const icon = new L.DivIcon({
      className: 'leaflet-div-icon no-background', // Custom class to remove the background
      html: `<img src="${droneIcon}" alt="Drone Icon" width="32" height="32" />`,
      iconSize: [32, 32], // Size of the icon
      iconAnchor: [16, 16], // Position of the anchor (center)
      popupAnchor: [0, -32], // Popup location (above the icon)
    });

    const marker = L.marker([lat, lng], { icon }).addTo(mapRef.current);

    // Animate the drone based on the specified movement pattern
    let angle = 0;
    let step = 0;
    const radius = 0.02; // Radius for the circular/spiral motion
    const center = [lat, lng]; // The center point to move around

    const animateDrone = () => {
      let newLat, newLng;

      switch (movementPattern) {
        case 'circle':
          angle = (angle + speed) % 360; // Circular motion with adjustable speed
          newLat = center[0] + radius * Math.cos((angle * Math.PI) / 180);
          newLng = center[1] + radius * Math.sin((angle * Math.PI) / 180);
          break;

        case 'zigzag':
          step += speed * 0.01; // Zigzag motion with adjustable speed
          newLat = center[0] + Math.sin(step) * radius;
          newLng = center[1] + Math.cos(step * 2) * radius;
          break;

        case 'spiral':
          angle = (angle + speed) % 360; // Spiral motion with adjustable speed
          const dynamicRadius = radius + (angle / 360) * 0.01; // Gradually increase the radius
          newLat = center[0] + dynamicRadius * Math.cos((angle * Math.PI) / 180);
          newLng = center[1] + dynamicRadius * Math.sin((angle * Math.PI) / 180);
          break;

        case 'figure8':
          angle = (angle + speed) % 360; // Figure-eight motion with adjustable speed
          newLat = center[0] + radius * Math.sin((angle * Math.PI) / 180);
          newLng = center[1] + radius * Math.sin((2 * angle * Math.PI) / 180);
          break;

        default:
          // Default to circular motion
          angle = (angle + speed) % 360;
          newLat = center[0] + radius * Math.cos((angle * Math.PI) / 180);
          newLng = center[1] + radius * Math.sin((angle * Math.PI) / 180);
      }

      marker.setLatLng([newLat, newLng]);

      // Request the next frame for animation
      requestAnimationFrame(animateDrone);
    };

    animateDrone();
  };

  useEffect(() => {
    // Initialize the map
    mapRef.current = L.map('map').setView([45.5017, -73.5673], 13); // Montreal, Quebec coordinates

    // Add OpenStreetMap TileLayer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(mapRef.current);

    // Create multiple drone markers with different movement patterns and speeds
    createDroneMarker(45.5017, -73.56, 'circle', 0.1); // Drone 1 - Circular motion (slow)
    createDroneMarker(45.5037, -73.5673, 'zigzag', 0.1); // Drone 2 - Zigzag motion (very slow)
    createDroneMarker(45.5000, -73.5700, 'spiral', 0.1); // Drone 3 - Spiral motion (faster)
    createDroneMarker(45.4997, -73.5633, 'figure8', 0.02); // Drone 4 - Figure-eight motion (medium speed)
    createDroneMarker(45.4647, -73.5633, 'figure8', 0.02); // Drone 4 - Figure-eight motion (medium speed)
    createDroneMarker(45.4997, -73.013, 'figure8', 0.02); // Drone 4 - Figure-eight motion (medium speed)
    createDroneMarker(46.5000, -73.5300, 'spiral', 0.1); // Drone 3 - Spiral motion (faster)



    return () => {
      // Cleanup map on unmount
      mapRef.current.remove();
    };
  }, []);

  return (
    <div>
      <div id="map" style={{ height: '500px', width: '100%' }}></div>
    </div>
  );
};

export default DroneMap;
