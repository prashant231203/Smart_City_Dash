import React, { useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import mapboxgl from 'mapbox-gl';

const MapCard = () => {
  useEffect(() => {
    // Set your Mapbox access token here
    mapboxgl.accessToken = 'pk.eyJ1IjoibXJjaGVlc2UyMyIsImEiOiJjbTFqbGl5b2YwYnl6MmpzZWYyYWtjYnhsIn0.-NMoLX7OlT_LAsuzQRTZSg';

    // Initialize the map with the new style
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mrcheese23/cm1jrlnj500fj01qrgzdt46qm', // Updated style
      projection: 'globe',
      zoom: 1,
      center: [30, 15],
    });

    map.addControl(new mapboxgl.NavigationControl());
    map.scrollZoom.disable();

    map.on('style.load', () => {
      map.setFog({}); // Set the default atmosphere style
    });

    // The following values control rotation speed
    const secondsPerRevolution = 240;
    const maxSpinZoom = 5;
    const slowSpinZoom = 3;
    let userInteracting = false;
    const spinEnabled = true;

    function spinGlobe() {
      const zoom = map.getZoom();
      if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
        let distancePerSecond = 360 / secondsPerRevolution;
        if (zoom > slowSpinZoom) {
          const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
          distancePerSecond *= zoomDif;
        }
        const center = map.getCenter();
        center.lng -= distancePerSecond;
        map.easeTo({ center, duration: 1000, easing: (n) => n });
      }
    }

    // Pause spinning on interaction
    map.on('mousedown', () => {
      userInteracting = true;
    });
    map.on('dragstart', () => {
      userInteracting = true;
    });

    // When animation is complete, start spinning if there is no ongoing interaction
    map.on('moveend', () => {
      spinGlobe();
    });

    spinGlobe();

    // Cleanup on unmount
    return () => map.remove();
  }, []);

  return (
    <Box
      w="100%"
      h="600px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      borderRadius="20px"
      bg="white"
      id="map" // This is the container for Mapbox
    >
      
    </Box>
  );
};

export default MapCard;
