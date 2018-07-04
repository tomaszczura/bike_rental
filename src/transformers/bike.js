export function transformBike({ id, model, weight, location, color, imageUrl, isAvailable }) {
  return {
    id,
    model,
    weight,
    location: {
      lat: location.latitude,
      lng: location.longitude
    },
    color,
    imageUrl,
    isAvailable
  };
}
