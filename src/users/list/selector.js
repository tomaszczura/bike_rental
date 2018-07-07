import { createStructuredSelector } from 'reselect';
import { hashQuery } from '../../reducers/utils';
import { usersEntitiesSelector, usersQueryHasEntitiesSelector } from '../../selectors/data';
import { relatedEntitiesSelector } from '../../selectors/utils';

const queryHasSelector = (state, props) => hashQuery(props.location.query);

export default createStructuredSelector({
  users: relatedEntitiesSelector(usersEntitiesSelector, usersQueryHasEntitiesSelector, queryHasSelector)
});
