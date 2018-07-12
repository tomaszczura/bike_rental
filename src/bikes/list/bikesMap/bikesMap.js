import React, { Component } from 'react';
import { GoogleMap, withGoogleMap } from 'react-google-maps';
import shortid from 'shortid';
import ImmutablePropTypes from 'react-immutable-proptypes';
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer';
import BikeMarker from './bikeMarker';

@withGoogleMap
export class MapWithBikes extends Component {
  static propTypes = {
    bikes: ImmutablePropTypes.list
  };

  state = {};

  render() {
    const { bikes } = this.props;
    
    let defaultCenter = { lat: 50.049683, lng: 19.944544 };
    if (bikes && bikes.size > 0) {
      const location = bikes.getIn([0, 'location']);
      defaultCenter = { lat: location.get('lat'), lng: location.get('lng') };
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
          {bikes && bikes.map((bike) => <BikeMarker key={shortid.generate()} bike={bike}/>)}
        </MarkerClusterer>
      </GoogleMap>
    );
  }
}
