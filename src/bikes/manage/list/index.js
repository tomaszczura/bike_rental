import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Search from '@material-ui/icons/Search';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { List } from 'immutable';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import EditBikeDialog from '../create';
import * as actions from './actions';
import selector from './selector';
import DataTable from '../../../common/table';
import { hashQuery } from '../../../reducers/utils';

@connect(selector, dispatch => ({
  fetchBikes: bindActionCreators(actions.fetchBikes, dispatch)
}))
export default class BikesManageList extends Component {
  static propTypes = {
    bikes: ImmutablePropTypes.map,
    fetchBikes: PropTypes.func,
    location: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.tableHeaders = [
      { label: 'ID' },
      { label: 'MODEL', id: 'model' },
      { label: 'COLOR' },
      { label: 'WEIGHT', id: 'weight' },
      { label: 'AVAILABLE' },
      { label: 'ACTIONS' },
    ];
  }

  state = {};

  componentDidMount() {
    const { location } = this.props;
    this.props.fetchBikes(location.query);
  }

  componentDidUpdate(prevProps, prevState, prevContext) { // eslint-disable-line no-unused-vars
    const currentQueryHash = hashQuery(this.props.location.query);
    const prevQueryHash = hashQuery(prevProps.location.query);
    if (prevQueryHash !== currentQueryHash) {
      this.props.fetchBikes(this.props.location.query);
    }
  }

  openCreateBikeDialog = () => this.setState({ showCreateDialog: true });

  closeCreateBikeDialog = () => this.setState({ showCreateDialog: false });

  handleBikeClick = (bike) => {
    console.log(`Click bike: ${bike.get('id')}`);
  };

  renderBikeRows = () => {
    const { bikes } = this.props;
    return bikes.get('data', List()).map((bike) => (
      <TableRow
        hover
        onClick={() => this.handleBikeClick(bike)}
        tabIndex={-1}
        key={`bike_${bike.get('id')}`}>
        <TableCell>{bike.get('id')}</TableCell>
        <TableCell>
          <div className='row-with-image'>
            <img src={bike.get('imageUrl')}/>
            {bike.get('model')}
          </div>
        </TableCell>
        <TableCell><div style={{ width: 20, height: 20, backgroundColor: bike.get('color') }}/></TableCell>
        <TableCell>{bike.get('weight')}</TableCell>
        <TableCell><Checkbox checked={bike.get('isAvailable')}/></TableCell>
        <TableCell/>
      </TableRow>
    ));
  };

  render() {
    const { bikes, location } = this.props;
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
          <DataTable
            location={location}
            headers={this.tableHeaders}
            rows={this.renderBikeRows()}
            totalCount={bikes.get('totalCount')}/>
        </div>
        {showCreateDialog && <EditBikeDialog onClose={this.closeCreateBikeDialog}/>}
      </div>
    );
  }
}
