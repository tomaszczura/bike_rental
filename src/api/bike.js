import { authHeaders, http, prepareSearchPageParams } from './utils';
import { transformBike } from '../transformers/bike';

export async function fetchBikes({ page = 0, pageSize = 25, order, orderBy, search }) {
  const url = `/bikes?${prepareSearchPageParams({ page, pageSize, order, orderBy, search })}`;
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
