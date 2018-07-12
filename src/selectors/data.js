export const userProfileSelector = state => state.getIn(['data', 'profile']);
export const bikesEntitiesSelector = state => state.getIn(['data', 'entities', 'bikes']);
export const usersEntitiesSelector = state => state.getIn(['data', 'entities', 'users']);
export const bookingsEntitiesSelector = state => state.getIn(['data', 'entities', 'bookings']);

export const bikesQueryHasEntitiesSelector = state => state.getIn(['data', 'relations', 'queryHasBikes']);
export const usersQueryHasEntitiesSelector = state => state.getIn(['data', 'relations', 'queryHasUsers']);
export const userHasBookingsEntitiesSelector = state => state.getIn(['data', 'relations', 'userHasBookings']);
export const bikeHasBookingsEntitiesSelector = state => state.getIn(['data', 'relations', 'bikeHasBookings']);
