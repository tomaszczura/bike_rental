import { transformBike } from './bike';
import { transformUser } from './user';

export function transformBooking({ id, bike, user, from, to }) {
  return {
    id,
    startDate: from,
    endDate: to,
    bike: transformBike(bike),
    user: transformUser(user)
  };
}
