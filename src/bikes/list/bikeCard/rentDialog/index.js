import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import DateRangeInput, { dateInputFormat } from '../../../../common/dateRangeInput';
import moment from 'moment';
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
    this.state = {
      startDate: startDate ? moment(startDate, dateInputFormat) : moment(),
      endDate: endDate ? moment(endDate, dateInputFormat) : moment().add(1, 'months')
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
      const startDate = moment(this.state.startDate).format(serverDateFormat);
      const endDate = moment(this.state.endDate).format(serverDateFormat);
      await this.props.bookBike({ bikeId: this.props.bike.get('id'), startDate, endDate });
      this.props.fetchBikes(this.props.location.query);
      this.setState({ loading: false });
      this.props.onClose();
    } catch (error) {
      this.resolveError(error);
    }
  };

  // handleFocusChange = (focusedInput) => {
  //   if (!focusedInput) return; // doesn't update the focusedInput if it is trying to close the DRP
  //   this.setState({ focusedInput });
  // };

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
          {/* <DateRangePicker
            startDate={this.state.startDate} // momentPropTypes.momentObj or null,
            startDateId="startDate" // PropTypes.string.isRequired,
            endDate={this.state.endDate} // momentPropTypes.momentObj or null,
            endDateId="endDate" // PropTypes.string.isRequired,
            numberOfMonths={1}
            onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
            focusedInput={this.state.focusedInput || 'startDate'} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
            onFocusChange={this.handleFocusChange} // PropTypes.func.isRequired,
          /> */}
        </div>
      </DialogBase>
    );
  }
}
