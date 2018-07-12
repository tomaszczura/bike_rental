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
import DateRangeInput, { dateInputFormat } from '../../../common/dateRangeInput';
import moment from 'moment';

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

    const { location: { query: { search, minWeight, maxWeight, color, startDate, endDate } } } = this.props;
    this.state = {
      search: search || '',
      minWeight,
      maxWeight,
      color,
      startDate: startDate ? moment(startDate, dateInputFormat) : moment(),
      endDate: endDate ? moment(endDate, dateInputFormat) : moment().add(1, 'weeks')
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
      startDate: moment(),
      endDate: moment().add(1, 'weeks')
    }, () => this.onSearchClick());
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name || event.target.id]: event.target.value
    });
  };

  handleStartDateChange = (value) => {
    value && this.setState({ startDate: value });
  };

  handleEndDateChange = (value) => {
    value && this.setState({ endDate: value });
  };

  render() {
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
            <div>
              <DateRangeInput
                endDate={this.state.endDate}
                startDate={this.state.startDate}
                onStartDateChange={this.handleStartDateChange}
                onEndDateChange={this.handleEndDateChange}/>
            </div>
          </div>
        </div>
        <div>
          <Button variant='contained' color='default' onClick={this.onClearClick}>Clear</Button>
          <Button variant='contained' color='primary' onClick={this.onSearchClick}>Search</Button>
        </div>
      </div>
    );
  }
}
