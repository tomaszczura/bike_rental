import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Search from '@material-ui/icons/es/Search';
import Button from '@material-ui/core/es/Button';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { debounce } from 'lodash';

@connect(null, dispatch => ({
  routerPush: bindActionCreators(push, dispatch)
}))
export default class SearchBar extends Component {
  static propTypes = {
    createTitle: PropTypes.string,
    location: PropTypes.object,
    routerPush: PropTypes.func,
    onCreateClick: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      value: this.props.location.query.search || ''
    };
  }

  onSearchChange = (event) => {
    const value = event.target.value;
    this.setState({ value });
    this.setSearchPath();
  };

  setSearchPath = debounce(() => {
    const { location, location: { query } } = this.props;
    this.props.routerPush({
      ...location,
      query: {
        ...query,
        search: this.state.value
      }
    });
  }, 300);

  render() {
    const { onCreateClick, createTitle } = this.props;

    return (
      <div className='manage-table-bar'>
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
            placeholder='Search'
            type='search'
            value={this.state.value}
            onChange={this.onSearchChange}/>
        </div>
        {onCreateClick && <Button variant='contained' color='primary' onClick={onCreateClick}>{createTitle}</Button>}
      </div>
    );
  }
}
