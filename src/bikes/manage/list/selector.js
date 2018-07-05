import { createStructuredSelector } from 'reselect';
import { hashQuery } from '../../../reducers/utils';
import { bikesEntitiesSelector, bikesQueryHasEntitiesSelector } from '../../../selectors/data';
import { relatedEntitiesSelector } from '../../../selectors/utils';

const queryHasSelector = (state, props) => hashQuery(props.location.query);

export default createStructuredSelector({
  bikes: relatedEntitiesSelector(bikesEntitiesSelector, bikesQueryHasEntitiesSelector, queryHasSelector)
});
