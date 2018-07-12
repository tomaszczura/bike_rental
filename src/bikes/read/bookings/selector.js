import { createStructuredSelector } from 'reselect';
import { hashQuery } from '../../../reducers/utils';
import { bikeHasBookingsEntitiesSelector, bookingsEntitiesSelector } from '../../../selectors/data';
import { relatedEntitiesSelector } from '../../../selectors/utils';

const queryHasSelector = (state, props) => hashQuery(props.location.query);

export default createStructuredSelector({
  bookings: relatedEntitiesSelector(bookingsEntitiesSelector, bikeHasBookingsEntitiesSelector, queryHasSelector)
});
