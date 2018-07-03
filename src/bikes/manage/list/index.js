import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Search from '@material-ui/icons/Search';
import EditBikeDialog from '../create';

export default class BikesManageList extends Component {
  static propTypes = {};

  state = {};

  openCreateBikeDialog = () => this.setState({ showCreateDialog: true });

  closeCreateBikeDialog = () => this.setState({ showCreateDialog: false });

  render() {
    const { showCreateDialog } = this.state;

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
          <Button variant='contained' color='primary' onClick={this.openCreateBikeDialog}>New Bike</Button>
        </div>
        {showCreateDialog && <EditBikeDialog onClose={this.closeCreateBikeDialog}/>}
      </div>
    );
  }
}
