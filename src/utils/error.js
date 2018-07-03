export function getErrorCode(error) {
  if (error.response && error.response.data) {
    return error.response.data.errorCode;
  }
  return -1;
}
