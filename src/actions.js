export const SNACKBAR_OPEN = 'APP/SNACKBAR_OPEN';
export const SNACKBAR_CLOSE = 'APP/SNACKBAR_CLOSE';

export function closeSnackbar() {
  return async (dispatch) => dispatch({ type: SNACKBAR_CLOSE });
}
