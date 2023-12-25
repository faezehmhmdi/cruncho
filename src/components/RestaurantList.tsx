import React, { useContext, useEffect } from 'react';
import { RestaurantContext } from '../context/RestaurantContext';
import RestaurantCard from './RestaurantCard';
import { fetchNearbyRestaurants } from '../api/PlacesAPI';
import { getCurrentLocation } from '../utils/locationUtils';

const RestaurantList = () => {
  const { state, dispatch } = useContext(RestaurantContext);

  useEffect(() => {
    dispatch({ type: 'SET_LOADING', payload: true });
    getCurrentLocation().then(coords => {
      const location = { lat: coords.latitude, lng: coords.longitude };
      dispatch({ type: 'SET_USER_LOCATION', payload: location });
      fetchNearbyRestaurants(location.lat, location.lng).then(restaurants => {
        dispatch({ type: 'SET_RESTAURANTS', payload: restaurants.slice(0, 10) });
        dispatch({ type: 'SORT_BY_DISTANCE' });
      }).catch(error => {
        dispatch({ type: 'SET_ERROR', payload: error.message });
      }).finally(() => {
        dispatch({ type: 'SET_LOADING', payload: false });
      });
    });
  }, [dispatch]);

  if (state.isLoading) return <p>Loading...</p>;
  if (state.error) return <p>Error: {state.error}</p>;

  return (
    <div>
      {state.restaurants.map(restaurant => (
        <RestaurantCard key={restaurant.place_id} restaurant={restaurant} />
      ))}
    </div>
  );
};

export default RestaurantList;
