import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InfoWindow, Marker } from 'react-google-maps';
import ImmutablePropTypes from 'react-immutable-proptypes';
import shortid from 'shortid';

export default class BikeMarker extends Component {
  static propTypes = {
    bike: ImmutablePropTypes.map.isRequired
  };

  state = {};

  handleMarkerClick = () => {
    this.setState({ isOpened: true });
  };

  handleMarkerClose = () => this.setState({ isOpened: false });

  render() {
    const { bike } = this.props;

    return (
      <Marker
        position={{ lat: bike.getIn(['location', 'lat']), lng: bike.getIn(['location', 'lng']) }}
        onClick={this.handleMarkerClick}>
        {this.state.isOpened &&
          <InfoWindow onCloseClick={this.handleMarkerClose}>
            <div>{bike.get('model')}</div>
          </InfoWindow>
        }
      </Marker>
    );
  }
}
