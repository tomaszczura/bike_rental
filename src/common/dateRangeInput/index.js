import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import '../react-datepicker.scss';
import Input from '@material-ui/core/Input';
import './index.scss';
import FormHelperText from '@material-ui/core/FormHelperText';

export const dateFormat = 'DD-MM-YYYY';

export default class DateRangeInput extends Component {
  static propTypes = {
    endDate: PropTypes.object,
    startDate: PropTypes.object,
    onStartDateChange: PropTypes.func.isRequired,
    onEndDateChange: PropTypes.func.isRequired,
  };

  render() {
    const { startDate, endDate, onStartDateChange, onEndDateChange } = this.props;
    const startDateValue = startDate ? moment(startDate, dateFormat).format(dateFormat) : '';
    const endDateValue = endDate ? moment(endDate, dateFormat).format(dateFormat) : '';

    return (
      <div className='datepicker-range-container'>
        <div className='picker'>
          <DatePicker
            {...this.props}
            customInput={<Input value={startDateValue}/>}
            endDate={endDate}
            filterDate={(date) => date.diff(endDate) <= 0}
            dateFormat={dateFormat}
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
            filterDate={(date) => date.diff(startDate) >= 0}
            dateFormat={dateFormat}
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
