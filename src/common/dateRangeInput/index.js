import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import '../react-datepicker.scss';
import Input from '@material-ui/core/Input';
import './index.scss';
import FormHelperText from '@material-ui/core/FormHelperText';

export const dateInputFormat = 'DD-MM-YYYY';

export default class DateRangeInput extends Component {
  static propTypes = {
    endDate: PropTypes.object,
    startDate: PropTypes.object,
    onStartDateChange: PropTypes.func.isRequired,
    onEndDateChange: PropTypes.func.isRequired,
  };

  render() {
    const { startDate, endDate, onStartDateChange, onEndDateChange } = this.props;
    const startDateValue = startDate ? moment(startDate, dateInputFormat).format(dateInputFormat) : '';
    const endDateValue = endDate ? moment(endDate, dateInputFormat).format(dateInputFormat) : '';
    const yesterday = moment().subtract(1, 'days');

    return (
      <div className='datepicker-range-container'>
        <div className='picker'>
          <DatePicker
            {...this.props}
            customInput={<Input value={startDateValue}/>}
            endDate={endDate}
            filterDate={(date) => (endDate ? date.diff(endDate) <= 0 && date > yesterday : date > yesterday)}
            dateFormat={dateInputFormat}
            readOnly
            selected={startDate}
            selectsStart
            startDate={startDate}
            onChange={(value) => onStartDateChange(value)}
            onChangeRaw={(e) => onStartDateChange(moment(e.target.value))} />
          <FormHelperText>Start date</FormHelperText>
        </div>
        <div className='picker'>
          <DatePicker
            {...this.props}
            customInput={<Input value={endDateValue}/>}
            endDate={endDate}
            filterDate={(date) => (startDate ? date.diff(startDate) >= 0 && date > yesterday : date > yesterday)}
            dateFormat={dateInputFormat}
            readOnly
            selected={endDate}
            selectsEnd
            startDate={startDate}
            onChange={(value) => onEndDateChange(value)}
            onChangeRaw={(e) => onEndDateChange(moment(e.target.value))} />
          <FormHelperText>End date</FormHelperText>
        </div>
      </div>
    );
  }
}
