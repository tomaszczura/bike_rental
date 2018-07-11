import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import DateRangeInput, { dateFormat } from '../../../../common/dateRangeInput';
import moment from 'moment';
import DialogBase from '../../../../common/dialogBase';
import './index.scss';

export default class RentBikeDialog extends Component {
  static propTypes = {
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

  handleStartDateChange = (value) => this.setState({ startDate: value });

  handleEndDateChange = (value) => this.setState({ endDate: value });

  handleSubmit = () => {

  };

  render() {
    const { bike, onClose } = this.props;

    return (
      <DialogBase title='Rent a bike' submitText='Save' onClose={onClose} onSubmit={this.handleSubmit}>
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
