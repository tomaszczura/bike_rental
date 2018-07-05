import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Search from '@material-ui/icons/Search';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import EditBikeDialog from '../create';
import * as actions from './actions';
import selector from './selector';

@connect(selector, dispatch => ({
  fetchBikes: bindActionCreators(actions.fetchBikes, dispatch)
}))
export default class BikesManageList extends Component {
  static propTypes = {
    bikes: ImmutablePropTypes.map,
    fetchBikes: PropTypes.func,
    location: PropTypes.object
  };

  state = {};

  componentDidMount() {
    const { location } = this.props;
    this.props.fetchBikes(location.query);
  }

  openCreateBikeDialog = () => this.setState({ showCreateDialog: true });

  closeCreateBikeDialog = () => this.setState({ showCreateDialog: false });

  render() {
    const { bikes } = this.props;
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
        <div>

        </div>
        {showCreateDialog && <EditBikeDialog onClose={this.closeCreateBikeDialog}/>}
      </div>
    );
  }
}
