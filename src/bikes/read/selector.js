import { createStructuredSelector } from 'reselect';
import { bikesEntitiesSelector } from '../../selectors/data';

export default createStructuredSelector({
  bike: (state, props) => bikesEntitiesSelector(state).get(props.params.bikeId)
});
