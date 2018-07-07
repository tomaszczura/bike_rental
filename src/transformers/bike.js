export function transformBike({ id, model, weight, location, color, imageUrl, isAvailable }) {
  return {
    id,
    model,
    weight,
    location: {
      lat: parseFloat(location.latitude),
      lng: parseFloat(location.longitude)
    },
    color,
    imageUrl,
    isAvailable
  };
}
