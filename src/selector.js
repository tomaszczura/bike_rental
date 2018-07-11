import { createStructuredSelector } from 'reselect';

export default createStructuredSelector({
  snackbarOpened: (state) => state.getIn(['app', 'snackbarOpened']),
  snackbarMessage: (state) => state.getIn(['app', 'snackbarMessage']),
});
