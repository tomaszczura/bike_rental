import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { dateInputFormat } from '../../../common/dateRangeInput';
import Moment from 'moment';
import DateRangePicker from 'react-daterange-picker';
import '../../../styles/_calendar.scss';
import './index.scss';
import DialogBase from '../../../common/dialogBase';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

export default class DateRangeDialog extends Component {
  static propTypes = {
    startDate: PropTypes.object.isRequired,
    endDate: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onDateSelect: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      dateRange: moment.range(this.props.startDate, this.props.endDate)
    };
  }

  handleSelect = (range) => this.setState({ dateRange: range });

  handleSubmit = () => {
    this.props.onDateSelect(this.state.dateRange.start, this.state.dateRange.end);
    this.props.onClose();
  };

  render() {
    const { onClose } = this.props;
    const { dateRange } = this.state;

    return (
      <DialogBase title='Select date range' submitText='Save' onClose={onClose} onSubmit={this.handleSubmit}>
        <div className='period'>{dateRange.start.format(dateInputFormat)} - {dateRange.end.format(dateInputFormat)}</div>
        <DateRangePicker
          minimumDate={moment().toDate()}
          value={this.state.dateRange}
          onSelect={this.handleSelect} />
      </DialogBase>
    );
  }
}
