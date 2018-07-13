import { transformBike } from './bike';
import { transformUser } from './user';
import moment from 'moment';
import { dateInputFormat } from '../common/dateRangeInput';

export function transformBooking({ id, bike, user, from, to }) {
  return {
    id,
    startDate: moment(from).format(dateInputFormat),
    endDate: moment(to).format(dateInputFormat),
    bike: transformBike(bike),
    user: transformUser(user)
  };
}
