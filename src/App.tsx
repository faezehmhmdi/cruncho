import React, { useEffect, useState } from 'react';
import './App.css';
import { RestaurantProvider } from './context/RestaurantContext';
import RestaurantList from './components/RestaurantList';
import { loadGoogleMapsScript } from './api/PlacesAPI';

const App = () => {
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);

  useEffect(() => {
    window.initMap = () => setIsGoogleMapsLoaded(true);
    loadGoogleMapsScript(process.env.REACT_APP_GOOGLE_API_KEY, 'initMap');
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <RestaurantProvider>
          {isGoogleMapsLoaded ? (
            <div>
              <h1>Nearby Restaurants</h1>
              <RestaurantList />
            </div>
          ) : (
            <p>Loading Google Maps...</p>
          )}
        </RestaurantProvider>
      </header>
    </div>
  );
};

export default App;

