import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import DateRangeInput, { dateFormat } from '../../../../common/dateRangeInput';
import moment from 'moment';
import DialogBase from '../../../../common/dialogBase';
import * as actions from './actions';
import './index.scss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getErrorCode } from '../../../../utils/error';
import { Errors } from './errors';
import Snackbar from '@material-ui/core/Snackbar';

@connect(null, dispatch => ({
  bookBike: bindActionCreators(actions.bookBike, dispatch)
}))
export default class RentBikeDialog extends Component {
  static propTypes = {
    bookBike: PropTypes.func,
    bike: ImmutablePropTypes.map.isRequired,
    location: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    const { location: { query: { startDate, endDate } } } = this.props;
    this.state = {
      startDate: startDate ? moment(startDate, dateFormat) : moment(),
      endDate: endDate ? moment(endDate, dateFormat) : moment().add(1, 'months')
    };
  }

  resolveError = (error) => {
    const errorCode = getErrorCode(error);
    let errorMessage = 'Unknown error';
    if (errorCode === Errors.BIKE_BOOKED) {
      errorMessage = 'Bike is not available in this period';
    }
    this.setState({ error: errorMessage, loading: false });
  };

  handleStartDateChange = (value) => this.setState({ startDate: value });

  handleEndDateChange = (value) => this.setState({ endDate: value });

  handleSubmit = async () => {
    try {
      this.setState({ error: '', loading: true });
      const startDate = moment(this.state.startDate).format('YYYY-MM-DD');
      const endDate = moment(this.state.endDate).format('YYYY-MM-DD');
      await this.props.bookBike({ bikeId: this.props.bike.get('id'), startDate, endDate });
      this.setState({ loading: false });
      this.props.onClose();
    } catch (error) {
      this.resolveError(error);
    }
  };

  render() {
    const { bike, onClose } = this.props;
    const { error, loading } = this.state;

    return (
      <DialogBase error={error} loading={loading} title='Rent a bike' submitText='Save' onClose={onClose} onSubmit={this.handleSubmit}>
        <div className='rent-bike-info'>
          <img src={bike.get('imageUrl')}/>
          <div>{bike.get('model')}</div>
        </div>
        <div>
          <DateRangeInput
            inline
            endDate={this.state.endDate}
            startDate={this.state.startDate}
            onStartDateChange={this.handleStartDateChange}
            onEndDateChange={this.handleEndDateChange}/>
        </div>
      </DialogBase>
    );
  }
}
