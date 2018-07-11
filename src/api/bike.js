import { authHeaders, http, prepareSearchPageParams } from './utils';
import { transformBike } from '../transformers/bike';

export async function fetchBikes({ page = 0, pageSize = 25, order, orderBy, search, onlyAvailable, minWeight, maxWeight, color }) {
  let url = `/bikes?${prepareSearchPageParams({ page, pageSize, order, orderBy, search })}`;

  if (onlyAvailable) {
    url = `${url}&only_available=${onlyAvailable}`;
  }

  if (minWeight) {
    url = `${url}&min_weight=${minWeight}`;
  }

  if (maxWeight) {
    url = `${url}&max_weight=${maxWeight}`;
  }

  if (color) {
    url = `${url}&color=${encodeURIComponent(color)}`;
  }

  const { data } = await http.get(url, authHeaders());
  data.data = data.data.map(transformBike);
  return data;
}

export async function deleteBike({ bikeId }) {
  const url = `/bikes/${bikeId}`;
  const { data } = await http.delete(url, authHeaders());
  return data;
}

export async function persistBike({ id, model, weight, color, location, image, isAvailable }) {
  let url = '/bikes';
  let method = http.post;
  if (id) {
    url = `${url}/${id}`;
    method = http.put;
  }

  const formData = new FormData();

  if (!id || typeof image !== 'string') {
    formData.append('photo', image[0]);
  }

  formData.append('model', model);
  formData.append('weight', weight);
  formData.append('color', color);
  formData.append('latitude', location.lat);
  formData.append('longitude', location.lng);
  formData.append('is_available', isAvailable);

  const body = await method(url, formData, authHeaders({ 'Content-Type': 'multipart/form-data' }));
  return transformBike(body.data);
}

export async function bookBike({ bikeId, startDate, endDate }) {
  const url = `/bikes/${bikeId}/bookings`;
  const params = {
    from: startDate,
    to: endDate
  };

  const body = await http.post(url, params, authHeaders());
}

export async function deleteBikeBooking({ bookingId }) {
  const url = `/bookings/${bookingId}`;
  const body = await http.delete(url, authHeaders());
}
