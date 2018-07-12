import { createStructuredSelector } from 'reselect';
import { bikesEntitiesSelector, userProfileSelector } from '../../selectors/data';

export default createStructuredSelector({
  bike: (state, props) => bikesEntitiesSelector(state).get(props.params.bikeId),
  userProfile: userProfileSelector
});
