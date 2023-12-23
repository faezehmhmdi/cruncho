import React, { useEffect } from 'react';
import './App.css';
import { getCurrentLocation } from './utils/locationUtils';
import { loadGoogleMapsScript, fetchNearbyRestaurants } from './api/PlacesAPI';

const App = () => {
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  useEffect(() => {
    window.initMap = () => {
      getCurrentLocation()
        .then(({ latitude, longitude }) => {
          fetchNearbyRestaurants(latitude, longitude)
            .then(restaurants => {
              console.log('Nearby Restaurants:', restaurants);
            })
            .catch(error => {
              console.error('Error fetching restaurants:', error);
            });
        })
        .catch(error => {
          console.error('Error getting location:', error);
        });
    };

    loadGoogleMapsScript(apiKey, 'initMap');
  }, []);

  return (
    <div className="App">
      <header className="App-header">
      </header>
    </div>
  );
}

export default App;
