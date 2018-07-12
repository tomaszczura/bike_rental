import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InfoWindow, Marker } from 'react-google-maps';
import ImmutablePropTypes from 'react-immutable-proptypes';
import './index.scss';
import Button from '@material-ui/core/Button';
import RentBikeDialog from '../bikeCard/rentDialog';

export default class BikeMarker extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    bike: ImmutablePropTypes.map.isRequired
  };

  state = {};

  componentDidMount() {
    this.isCompMounted = true;
  }

  componentWillUnmount() {
    this.isCompMounted = false;
  }

  handleMarkerClick = () => this.isCompMounted && this.setState({ isOpened: true });

  handleMarkerClose = () => this.isCompMounted && this.setState({ isOpened: false });

  showBikeRentDialog = () => this.isCompMounted && this.setState({ showRentDialog: true });

  hideBikeRentDialog = () => this.isCompMounted && this.setState({ showRentDialog: false });

  render() {
    const { bike, location } = this.props;

    return (
      <Marker
        position={{ lat: bike.getIn(['location', 'lat']), lng: bike.getIn(['location', 'lng']) }}
        onClick={this.handleMarkerClick}>
        {this.state.isOpened &&
          <InfoWindow onCloseClick={this.handleMarkerClose}>
            <div>
              <div className='bike-marker-info'>
                <img src={bike.get('imageUrl')}/>
                <div>
                  <div className='bike-name'>{bike.get('model')}</div>
                  <div>{bike.get('weight')}kg</div>
                </div>
              </div>
              <div className='bike-marker-buttons'>
                <Button size='small' color='primary' onClick={this.showBikeRentDialog}>Rent</Button>
                <Button size='small' color='primary'>Details</Button>
              </div>
            </div>
          </InfoWindow>
        }
        {this.state.showRentDialog && <RentBikeDialog bike={bike} location={location} onClose={this.hideBikeRentDialog}/>}
      </Marker>
    );
  }
}
