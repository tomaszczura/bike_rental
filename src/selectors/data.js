export const userProfileSelector = state => state.getIn(['data', 'profile']);
export const bikesEntitiesSelector = state => state.getIn(['data', 'entities', 'bikes']);

export const bikesQueryHasEntitiesSelector = state => state.getIn(['data', 'relations', 'queryHasBikes']);
