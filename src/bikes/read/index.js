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
import Button from '@material-ui/core/Button';
import { push } from 'react-router-redux';
import EditBikeDialog from '../manage/create';
import RentBikeDialog from '../list/bikeCard/rentDialog';
import RateBikeDialog from './rateDialog';
import { RateStars } from '../../common/rateStars';

@connect(selector, dispatch => ({
  fetchBike: bindActionCreators(actions.fetchBike, dispatch),
  deleteBike: bindActionCreators(actions.deleteBike, dispatch),
  routerPush: bindActionCreators(push, dispatch)
}))
export default class BikeDetails extends Component {
  static propTypes = {
    bike: ImmutablePropTypes.map,
    deleteBike: PropTypes.func,
    fetchBike: PropTypes.func,
    location: PropTypes.object,
    params: PropTypes.shape({
      bikeId: PropTypes.string
    }),
    routerPush: PropTypes.func,
    userProfile: ImmutablePropTypes.map
  };

  state = {};

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

  handleRentClick = () => this.setState({ showRentDialog: true });

  hideBikeRentDialog = () => this.setState({ showRentDialog: false });

  handleRateClick = () => this.setState({ showRateDialog: true });

  hideRateBikeDialog = () => this.setState({ showRateDialog: false });

  handleEditClick = () => this.setState({ showEditDialog: true });

  handleEditClose = () => this.setState({ showEditDialog: false });

  handleDeleteClick = async () => {
    const del = await window.confirm('Are you sure you want to delete this?');
    if (del) {
      await this.props.deleteBike({ bikeId: this.props.bike.get('id') });
      this.props.routerPush('/bikes');
    }
  };

  render() {
    const { bike, userProfile, location } = this.props;
    const { showEditDialog, showRentDialog, showRateDialog } = this.state;
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
                <div className='rating'>
                  <RateStars count={bike.get('ratesCount')} rating={bike.get('rate')} starDimension='35px' starSpacing='0px'/>
                </div>
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
            <div className='bike-actions'>
              <Button size='medium' color='primary' onClick={this.handleRentClick}>Rent</Button>
              <Button size='medium' color='primary' onClick={this.handleRateClick}>Rate</Button>
              {isManager && <Button size='medium' color='primary' onClick={this.handleEditClick}>Edit</Button>}
              {isManager && <Button size='medium' color='primary' onClick={this.handleDeleteClick}>Delete</Button>}
            </div>
            {isManager && <BikeBookingsList location={location} bikeId={bike.get('id')}/>}
          </div>
        }
        {showEditDialog &&
          <EditBikeDialog
            initialValues={{
              ...bike.toJS(),
              image: bike.get('imageUrl')
            }}
            onBikeSaved={this.handleBikeSaved}
            onClose={this.handleEditClose}/>
        }
        {showRentDialog && <RentBikeDialog bike={bike} location={location} onClose={this.hideBikeRentDialog}/>}
        {showRateDialog && <RateBikeDialog bike={bike} onClose={this.hideRateBikeDialog}/>}
      </div>
    );
  }
}
