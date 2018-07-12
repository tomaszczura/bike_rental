import { authHeaders, http, prepareSearchPageParams, serverDateFormat } from './utils';
import { transformBike } from '../transformers/bike';
import { dateInputFormat } from '../common/dateRangeInput';
import moment from 'moment';

export async function fetchBikes({ page = 0, pageSize = 25, order, orderBy, search, onlyAvailable, minWeight, maxWeight, color, startDate, endDate }) {
  let url = `/bikes?${prepareSearchPageParams({ page, pageSize, order, orderBy, search })}`;

  if (startDate) {
    url = `${url}&startDate=${moment(startDate, dateInputFormat).format(serverDateFormat)}`;
  }

  if (endDate) {
    url = `${url}&endDate=${moment(endDate, dateInputFormat).format(serverDateFormat)}`;
  }

  if (onlyAvailable) {
    url = `${url}&onlyAvailable=${onlyAvailable}`;
  }

  if (minWeight) {
    url = `${url}&minWeight=${minWeight}`;
  }

  if (maxWeight) {
    url = `${url}&maxWeight=${maxWeight}`;
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

  await http.post(url, params, authHeaders());
}

export async function deleteBikeBooking({ bookingId }) {
  const url = `/bookings/${bookingId}`;
  await http.delete(url, authHeaders());
}

export async function fetchBike({ bikeId }) {
  const url = `/bikes/${bikeId}`;
  const { data } = await http.get(url, authHeaders());
  return transformBike(data);
}
