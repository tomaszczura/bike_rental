export function transformBike({ id, model, weight, latitude, longitude, color, photo }) {
  return {
    id,
    model,
    weight,
    location: {
      lat: latitude,
      lng: longitude
    },
    color,
    photo
  };
}
