
import React from 'react';
import { Restaurant } from '../reducers/RestaurantReducer';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  return (
      <Card variant="outlined" sx={{ marginBottom: 2 }}>
          <CardContent>
              <Typography variant="h5" component="div" sx={{ textAlign: 'center' }}>
                  {restaurant.name}
              </Typography>
              {restaurant.distance !== undefined && (
                    <Typography variant="body2" sx={{ ml: 1 }}>
                        Distance: {restaurant.distance.toFixed(2)} km
                    </Typography>
                )}
              <Box display="flex" justifyContent="center" alignItems="center" mt={1} mb={1}>
                  <StyledRating name="read-only" value={restaurant.rating} readOnly />
                  <Typography sx={{ ml: 1 }} color="text.secondary">
                      {restaurant.rating.toFixed(1)} ({restaurant.user_ratings_total} reviews)
                  </Typography>
              </Box>
              <Box display="flex" justifyContent="center" alignItems="center">
                  <LocationOnIcon color="secondary" />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                      {restaurant.vicinity}
                  </Typography>
              </Box>
          </CardContent>
      </Card>
  );
};

export default RestaurantCard;
