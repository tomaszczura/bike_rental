import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { MapWithBikes } from './bikesMap';

export default class BikesMapContainer extends Component {
  static propTypes = {
    bikes: ImmutablePropTypes.map,
    location: PropTypes.object
  };

  render() {
    const { bikes, location } = this.props;

    return (
      <div>
        <MapWithBikes
          containerElement={<div style={{ height: '500px', width: '100%', padding: 10 }} />}
          location={location}
          mapElement={<div style={{ height: '100%' }} />}
          bikes={bikes.get('data')}/>
      </div>
    );
  }
}
