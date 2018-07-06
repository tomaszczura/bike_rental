import { authHeaders, http } from './utils';
import { transformBike } from '../transformers/bike';

export async function fetchBikes({ page = 0, pageSize = 25, order, orderBy }) {
  let url = `/bikes?page=${parseInt(page, 0) + 1}&pageSize=${pageSize}`;

  if (orderBy && ['asc', 'desc'].includes(order)) {
    url = `${url}&sortBy=${orderBy}&sortDir=${order.toUpperCase()}`;
  }

  const { data } = await http.get(url, authHeaders());
  data.data = data.data.map(transformBike);
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
