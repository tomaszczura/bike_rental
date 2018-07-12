export function transformBike({ id, model, weight, location, color, imageUrl, isAvailable, rate, ratesCount }) {
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
    isAvailable,
    rate: Math.round(rate * 100) / 100,
    ratesCount
  };
}
