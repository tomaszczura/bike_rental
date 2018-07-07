export const userProfileSelector = state => state.getIn(['data', 'profile']);
export const bikesEntitiesSelector = state => state.getIn(['data', 'entities', 'bikes']);
export const usersEntitiesSelector = state => state.getIn(['data', 'entities', 'users']);

export const bikesQueryHasEntitiesSelector = state => state.getIn(['data', 'relations', 'queryHasBikes']);
export const usersQueryHasEntitiesSelector = state => state.getIn(['data', 'relations', 'queryHasUsers']);
