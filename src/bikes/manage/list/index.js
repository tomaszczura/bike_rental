import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Search from '@material-ui/icons/Search';

export default class BikesManageList extends Component {
  static propTypes = {};

  render() {
    return (
      <div>
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
              type='search'/>
          </div>
          <Button variant='contained' color='primary'>New Bike</Button>
        </div>
      </div>
    );
  }
}
