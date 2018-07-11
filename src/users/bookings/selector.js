import { createStructuredSelector } from 'reselect';
import { relatedEntitiesSelector } from '../../selectors/utils';
import { hashQuery } from '../../reducers/utils';
import { bookingsEntitiesSelector, userHasBookingsEntitiesSelector } from '../../selectors/data';

const queryHasSelector = (state, props) => hashQuery(props.location.query);

export default createStructuredSelector({
  bookings: relatedEntitiesSelector(bookingsEntitiesSelector, userHasBookingsEntitiesSelector, queryHasSelector)
});
