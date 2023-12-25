import { Restaurant } from "../reducers/RestaurantReducer";

declare global {
    interface Window {
      google: any;
      initMap: Function;
    }
  }
  
  export const loadGoogleMapsScript = (apiKey: string | undefined, callbackName: string): void => {
    if (typeof window.google === 'undefined') {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=${callbackName}`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    } else {
        const callback: () => void = (window as any)[callbackName];
        if (callback && typeof callback === 'function') {
          callback();
        } else {
          console.error(`Callback function '${callbackName}' is not defined.`);
        }
    }
  };
  
  export const fetchNearbyRestaurants = (latitude: number, longitude: number): Promise<any> => {
    return new Promise((resolve, reject) => {
      const map = new window.google.maps.Map(document.createElement('div'), {
        center: { lat: latitude, lng: longitude },
      });
  
      const service = new window.google.maps.places.PlacesService(map);
  
      const request = {
        location: { lat: latitude, lng: longitude },
        radius: '1500',
        type: ['restaurant'],
      };
  
      service.nearbySearch(request, (results: Array<Restaurant>, status: string) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          resolve(results);
        } else {
          reject(new Error('Places API error: ' + status));
        }
      });
    });
  };
  