export const getCurrentLocation = (): Promise<GeolocationCoordinates> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by your browser."));
      } else {
        navigator.geolocation.getCurrentPosition(
          position => {
            resolve(position.coords);
          },
          () => {
            reject(new Error("Unable to retrieve your location."));
          }
        );
      }
    });
  };
  