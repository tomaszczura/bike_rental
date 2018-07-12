import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { dateInputFormat } from '../../../../common/dateRangeInput';
import Moment from 'moment';
import DialogBase from '../../../../common/dialogBase';
import * as actions from './actions';
import './index.scss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getErrorCode } from '../../../../utils/error';
import { Errors } from './errors';
import './_datepicker.scss';
import { serverDateFormat } from '../../../../api/utils';
import * as listActions from '../../actions';
import DateRangePicker from 'react-daterange-picker';
import { extendMoment } from 'moment-range';
import './_calendar.scss';

const moment = extendMoment(Moment);

@connect(null, dispatch => ({
  bookBike: bindActionCreators(actions.bookBike, dispatch),
  fetchBikes: bindActionCreators(listActions.fetchBikes, dispatch)
}))
export default class RentBikeDialog extends Component {
  static propTypes = {
    bookBike: PropTypes.func,
    bike: ImmutablePropTypes.map.isRequired,
    fetchBikes: PropTypes.func,
    location: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    const { location: { query: { startDate, endDate } } } = this.props;
    const startDateMoment = startDate ? moment(startDate, dateInputFormat) : moment().startOf('day');
    const endDateMoment = endDate ? moment(endDate, dateInputFormat) : moment().add(1, 'weeks').endOf('day');
    this.state = {
      dateRange: moment.range(startDateMoment, endDateMoment)
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

  handleSubmit = async () => {
    try {
      this.setState({ error: '', loading: true });
      const startDate = moment(this.state.dateRange.start).format(serverDateFormat);
      const endDate = moment(this.state.dateRange.end).format(serverDateFormat);
      await this.props.bookBike({ bikeId: this.props.bike.get('id'), startDate, endDate });
      this.setState({ loading: false });
      this.props.fetchBikes(this.props.location.query);
      this.props.onClose();
    } catch (error) {
      this.resolveError(error);
    }
  };

  handleSelect = (range) => this.setState({ dateRange: range });

  render() {
    const { bike, onClose } = this.props;
    const { error, loading, dateRange } = this.state;

    return (
      <DialogBase error={error} loading={loading} title='Rent this bike' submitText='Save' onClose={onClose} onSubmit={this.handleSubmit}>
        <div className='rent-bike-info'>
          <img src={bike.get('imageUrl')}/>
          <div>{bike.get('model')}</div>
        </div>
        <div>
          <div className='period'>{moment(dateRange.start).format(dateInputFormat)} - {moment(dateRange.end).format(dateInputFormat)}</div>
          <DateRangePicker
            minimumDate={moment().toDate()}
            value={this.state.dateRange}
            onSelect={this.handleSelect} />
        </div>
      </DialogBase>
    );
  }
}
