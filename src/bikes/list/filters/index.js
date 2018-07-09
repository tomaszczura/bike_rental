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

    const { location: { query: { search, minWeight, maxWeight, color } } } = this.props;
    this.state = {
      search: search || '',
      minWeight,
      maxWeight,
      color
    };
  }

  onSearchClick = () => {
    const { location, location: { query } } = this.props;
    const newQuery = { ...query };
    newQuery.search = this.state.search;
    newQuery.minWeight = this.state.minWeight;
    newQuery.maxWeight = this.state.maxWeight;
    newQuery.color = this.state.color;

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
      color: ''
    }, () => this.onSearchClick());
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name || event.target.id]: event.target.value
    });
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
