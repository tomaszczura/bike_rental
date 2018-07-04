import { authHeaders, http } from './utils';
import { transformBike } from '../transformers/bike';

export async function fetchBikes() {
  const url = '/bikes';
  const body = await http.get(url, authHeaders());
  return transformBike(body.data);
}

export async function persistBike({ id, model, weight, color, location, image, isAvailable }) {
  let url = '/bikes';
  if (id) {
    url = `${url}/${id}`;
  }

  const formData = new FormData();
  formData.append('photo', image[0]);
  formData.append('model', model);
  formData.append('weight', weight);
  formData.append('color', color);
  formData.append('latitude', location.lat);
  formData.append('longitude', location.lng);
  formData.append('is_available', isAvailable);

  const body = await http.post(url, formData, authHeaders({ 'Content-Type': 'multipart/form-data' }));
  return transformBike(body.data);
}
