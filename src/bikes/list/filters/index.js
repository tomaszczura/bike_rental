import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Search from '@material-ui/icons/es/Search';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import './index.scss';
import FormHelperText from '@material-ui/core/es/FormHelperText/FormHelperText';
import ColorSelect from '../../../common/colorSelect';
import Button from '@material-ui/core/Button';
import { dateInputFormat } from '../../../common/dateRangeInput';
import moment from 'moment';
import SelectInput from '../../../common/selectInput';
import DateRangeDialog from './dateRangeDialog';

const rateSelect = [
  { label: '', value: '' },
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 },
];

@connect(null, dispatch => ({
  routerPush: bindActionCreators(push, dispatch)
}))
export default class BikesFilters extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    routerPush: PropTypes.func
  };

  constructor(props) {
    super(props);

    const { location: { query: { search, minWeight, maxWeight, color, startDate, endDate, minRate } } } = this.props;
    this.state = {
      search: search || '',
      minWeight,
      maxWeight,
      color,
      minRate,
      startDate: startDate ? moment(startDate, dateInputFormat) : moment().startOf('day'),
      endDate: endDate ? moment(endDate, dateInputFormat) : moment().endOf('day').add(1, 'weeks')
    };
  }

  onSearchClick = () => {
    const { location, location: { query } } = this.props;
    const newQuery = { ...query };
    newQuery.timestamp = new Date().getTime(); // to refresh when no param changed
    newQuery.search = this.state.search;
    newQuery.minWeight = this.state.minWeight;
    newQuery.maxWeight = this.state.maxWeight;
    newQuery.color = this.state.color;
    newQuery.minRate = this.state.minRate;
    newQuery.startDate = this.state.startDate ? moment(this.state.startDate).format(dateInputFormat) : '';
    newQuery.endDate = this.state.endDate ? moment(this.state.endDate).format(dateInputFormat) : '';

    this.props.routerPush({
      ...location,
      query: newQuery
    });
  };

  onClearClick = () => {
    this.setState({
      search: '',
      minWeight: '',
      maxWeight: '',
      color: '',
      minRate: '',
      startDate: moment().startOf('day'),
      endDate: moment().endOf('day').add(1, 'weeks')
    }, () => this.onSearchClick());
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name || event.target.id]: event.target.value
    });
  };

  handleDateRangeShow = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ showDateRageDialog: true });
  };

  handleDateRangeDialogClose = () => this.setState({ showDateRageDialog: false });

  handleDateRangeSelect = (startDate, endDate) => this.setState({
    startDate,
    endDate
  });

  renderRateValue = value => <div>{value}</div>;

  render() {
    const { startDate, endDate, showDateRageDialog } = this.state;

    return (
      <div className='bikes-filters-container'>
        <div className='filters'>
          <div className='search-field'>
            <Input
              fullWidth
              id='search'
              startAdornment={
                <InputAdornment position='start'>
                  <Search />
                </InputAdornment>
              }
              label='Search'
              placeholder='Model'
              type='search'
              value={this.state.search}
              onChange={this.handleChange}/>
          </div>
          <div className='filter-fields'>
            <div className='filter-input'>
              <Input
                id='minWeight'
                value={this.state.minWeight}
                onChange={this.handleChange}
                endAdornment={<InputAdornment position='end'>Kg</InputAdornment>}/>
              <FormHelperText>Min Weight</FormHelperText>
            </div>
            <div className='filter-input'>
              <Input
                id='maxWeight'
                value={this.state.maxWeight}
                onChange={this.handleChange}
                endAdornment={<InputAdornment position='end'>Kg</InputAdornment>}/>
              <FormHelperText>Max Weight</FormHelperText>
            </div>
            <div className='filter-color'>
              <ColorSelect allowEmpty labelOnDown input={{ value: this.state.color, onChange: this.handleChange, name: 'color' }}/>
            </div>
            <div className='filter-input date'>
              <Input
                value={`${startDate.format(dateInputFormat)} - ${endDate.format(dateInputFormat)}`}
                onClick={this.handleDateRangeShow}/>
              <FormHelperText>Date range</FormHelperText>
            </div>
            <div className='filter-input'>
              <SelectInput
                clearable
                input={{ value: this.state.minRate, onChange: this.handleChange, name: 'minRate' }}
                label='Min rate'
                labelOnDown
                renderOption={this.renderRateValue}
                renderValue={this.renderRateValue}
                values={rateSelect}/>
            </div>
          </div>
        </div>
        <div>
          <Button variant='contained' color='default' onClick={this.onClearClick}>Clear</Button>
          <Button variant='contained' color='primary' onClick={this.onSearchClick}>Search</Button>
        </div>
        {showDateRageDialog &&
          <DateRangeDialog
            startDate={startDate}
            endDate={endDate}
            onClose={this.handleDateRangeDialogClose}
            onDateSelect={this.handleDateRangeSelect}/>}
      </div>
    );
  }
}
