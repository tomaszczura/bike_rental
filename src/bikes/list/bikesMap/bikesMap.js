import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GoogleMap, withGoogleMap } from 'react-google-maps';
import shortid from 'shortid';
import ImmutablePropTypes from 'react-immutable-proptypes';
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer';
import BikeMarker from './bikeMarker';

@withGoogleMap
export class MapWithBikes extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    bikes: ImmutablePropTypes.list
  };

  state = {};

  render() {
    const { bikes, location } = this.props;

    let defaultCenter = { lat: 50.049683, lng: 19.944544 };
    if (bikes && bikes.size > 0) {
      const markerLocation = bikes.getIn([0, 'location']);
      defaultCenter = { lat: markerLocation.get('lat'), lng: markerLocation.get('lng') };
    }

    return (
      <GoogleMap
        {...this.props}
        defaultZoom={10}
        center={defaultCenter}>
        <MarkerClusterer
          averageCenter
          enableRetinaIcons
          gridSize={60}>
          {bikes && bikes.map((bike) => <BikeMarker location={location} key={shortid.generate()} bike={bike}/>)}
        </MarkerClusterer>
      </GoogleMap>
    );
  }
}
