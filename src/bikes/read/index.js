import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as actions from './actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import selector from './selector';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CircularProgress from '@material-ui/core/CircularProgress';
import './index.scss';
import { hasError, isLoaded, isLoading } from '../../utils/data';
import { getErrorCode } from '../../utils/error';
import { ApiErrors } from '../../api/apiErrors';
import { CustomGoogleMap } from '../../common/map';
import { UserRoles } from '../../constants/userRoles';
import BikeBookingsList from './bookings';

@connect(selector, dispatch => ({
  fetchBike: bindActionCreators(actions.fetchBike, dispatch)
}))
export default class BikeDetails extends Component {
  static propTypes = {
    bike: ImmutablePropTypes.map,
    fetchBike: PropTypes.func,
    location: PropTypes.object,
    params: PropTypes.shape({
      bikeId: PropTypes.string
    }),
    userProfile: ImmutablePropTypes.map
  };

  componentDidMount() {
    const { bike, params } = this.props;
    if (!bike || bike.get('id') !== params.bikeId || !isLoaded(bike)) {
      this.props.fetchBike({ bikeId: this.props.params.bikeId });
    }
  }

  componentDidUpdate(prevProps, prevState, prevContext) { // eslint-disable-line no-unused-vars
    if (this.props.params.bikeId !== prevProps.params.bikeId) {
      const { bike, params } = this.props;
      if (!bike || bike.get('id') !== params.bikeId || !isLoaded(bike)) {
        this.props.fetchBike({ bikeId: this.props.params.bikeId });
      }
    }
  }

  getErrorMessage = (error) => {
    const errorMessage = 'Unknown error';
    if (!error) {
      return errorMessage;
    }
    const errorCode = getErrorCode(error);
    if (errorCode === ApiErrors.NOT_FOUND) {
      return 'Bike not found';
    }
    return errorMessage;
  };

  render() {
    const { bike, userProfile, location } = this.props;
    const isManager = userProfile.get('role') === UserRoles.MANAGER;

    return (
      <div className='bike-details-container'>
        {isLoading(bike) &&
          <div className='progress'>
            <CircularProgress size={50}/>
          </div>
        }
        {hasError(bike) && <div className='error-container'>{this.getErrorMessage(bike.get('error'))}</div>}
        {isLoaded(bike) &&
          <div>
            <div className='bike-data'>
              <div className='bike-image'>
                <img src={bike.get('imageUrl')}/>
              </div>
              <div>
                <div className='model'>{bike.get('model')}</div>
                <div className='property'>
                  <span className='property-name'>Color:</span>
                  <div className='color' style={{ background: bike.get('color') }}/>
                </div>
                <div className='property'>
                  <span className='property-name'>Weight:</span>
                  <span>{bike.get('weight')}</span>
                </div>
              </div>
              <div className='bike-map'>
                <CustomGoogleMap
                  containerElement={<div style={{ height: '300px', width: '300px' }} />}
                  defaultCenter={bike.get('location').toJS()}
                  mapElement={<div style={{ height: '100%' }} />}
                  marker={bike.get('location')}/>
              </div>
            </div>
            {isManager && <BikeBookingsList location={location} bikeId={bike.get('id')}/>}
          </div>
        }
      </div>
    );
  }
}
