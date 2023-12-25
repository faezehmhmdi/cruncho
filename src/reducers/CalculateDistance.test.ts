import { calculateDistance } from './RestaurantReducer';

describe('calculateDistance', () => {
    it('correctly calculates the distance between two points', () => {
        const pointA = { lat: 57.681058, lng: 11.986287 };
        const pointB = { lat: 57.687104, lng: 11.985615 };

        const distance = calculateDistance(pointA, pointB);

        const expectedDistance = 0.67;
        expect(distance).toBeCloseTo(expectedDistance);
    });

});
