import { createSelector } from 'reselect';
import { fromJS, Map, List } from 'immutable';

export function relatedEntitiesSelector(entitiesSelector, relationsSelector, keySelector) {
  return createSelector(entitiesSelector, relationsSelector, keySelector, (entities, relations, key) => {
    const relData = relations.get(key) || Map();
    const entityIds = relData.get('data') || List();
    const dataArray = entityIds.reduce((array, entityId) => {
      const entity = entities.get(entityId);
      if (entity) {
        array.push(entity);
      }
      return array;
    }, []);
    return fromJS({
      ...relData.toJS(),
      data: dataArray,
    });
  });
}
