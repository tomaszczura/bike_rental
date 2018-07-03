import { createStructuredSelector } from 'reselect';
import { userProfileSelector } from '../../selectors/data';

export default createStructuredSelector({
  userProfile: userProfileSelector
});
