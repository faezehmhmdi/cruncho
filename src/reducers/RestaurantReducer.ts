export interface Location {
    lat: number;
    lng: number;
}

export interface GMapsLocation {
    lat: () => number;
    lng: () => number;
}

export interface Restaurant {
    name: string;
    geometry: {
        location: GMapsLocation;
    };
    place_id: string;
    rating: number;
    user_ratings_total: number;
    vicinity: string;
    distance?: number;
}

export interface State {
    restaurants: Restaurant[];
    isLoading: boolean;
    error: string | null;
    userLocation: Location | null;
}

export type Action =
    | { type: 'SET_RESTAURANTS'; payload: Restaurant[] }
    | { type: 'SORT_BY_DISTANCE' }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_ERROR'; payload: string }
    | { type: 'SET_USER_LOCATION'; payload: Location };

export const initialState: State = {
    restaurants: [],
    isLoading: false,
    error: null,
    userLocation: null,
};

export const restaurantReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_RESTAURANTS':
            const updatedRestaurants = action.payload.map(restaurant => {
                let distance = undefined;
                if (state.userLocation && restaurant.geometry && restaurant.geometry.location) {
                    const restaurantLat = restaurant.geometry.location.lat();
                    const restaurantLng = restaurant.geometry.location.lng();
                    const userLat = state.userLocation.lat;
                    const userLng = state.userLocation.lng;

                    distance = calculateDistance({ lat: userLat, lng: userLng }, { lat: restaurantLat, lng: restaurantLng });
                }
                return { ...restaurant, distance: distance };
            });
            return { ...state, restaurants: updatedRestaurants };


        case 'SORT_BY_DISTANCE':
            if (!state.userLocation || state.restaurants.length === 0) return state;

            const sortedRestaurants = [...state.restaurants].sort((a, b) => {
                if (state.userLocation) {
                    const userLat = state.userLocation.lat;
                    const userLng = state.userLocation.lng;
                    const restaurantALat = a.geometry.location.lat();
                    const restaurantALng = a.geometry.location.lng();
                    const restaurantBLat = b.geometry.location.lat();
                    const restaurantBLng = b.geometry.location.lng();

                    const distanceA = calculateDistance({ lat: userLat, lng: userLng }, { lat: restaurantALat, lng: restaurantALng });
                    const distanceB = calculateDistance({ lat: userLat, lng: userLng }, { lat: restaurantBLat, lng: restaurantBLng });

                    return distanceA - distanceB;
                }
                return 0;
            });

            return { ...state, restaurants: sortedRestaurants };

        case 'SET_LOADING':
            return { ...state, isLoading: action.payload };

        case 'SET_ERROR':
            return { ...state, error: action.payload, isLoading: false };

        case 'SET_USER_LOCATION':
            return { ...state, userLocation: action.payload };

        default:
            return state;
    }
};

export function calculateDistance(location1: Location | null, location2: Location | null): number {
    const toRadian = (angle: number): number => angle * (Math.PI / 180);

    const earthRadiusKm = 6371;

    if (location1 && location2) {
        const dLat = toRadian(location2.lat - location1.lat);
        const dLng = toRadian(location2.lng - location1.lng);

        const lat1 = toRadian(location1.lat);
        const lat2 = toRadian(location2.lat);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return earthRadiusKm * c;
    }
    return 0;

}
