import { authHeaders, http } from './utils';
import { transformBike } from '../transformers/bike';

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
  // formData.append('bike_data', new Blob([JSON.stringify(params)], { type: 'application/json' }));

  debugger;
  const body = await http.post(url, formData, authHeaders({ 'Content-Type': 'multipart/form-data' }));
  debugger;
  return transformBike(body.data);
}
