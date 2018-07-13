import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import selector from './selector';
import { push } from 'react-router-redux';
import BikeCard from './bikeCard';
import { bindActionCreators } from 'redux';
import TablePagination from '@material-ui/core/TablePagination';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import { isLoaded } from '../../utils/data';

@connect(selector, dispatch => ({
  routerPush: bindActionCreators(push, dispatch)
}))
export default class BikesCards extends Component {
  static propTypes = {
    bikes: ImmutablePropTypes.map,
    location: PropTypes.object.isRequired,
    routerPush: PropTypes.func
  };

  onPageChange = (event, page) => {
    if (event !== null) {
      const { location, location: { query } } = this.props;
      this.props.routerPush({
        ...location,
        query: {
          ...query,
          page
        }
      });
    }
  };

  onRowsPerPageChange = event => {
    const { location, location: { query } } = this.props;
    this.props.routerPush({
      ...location,
      query: {
        ...query,
        pageSize: event.target.value
      }
    });
  };

  render() {
    const { bikes, location, location: { query } } = this.props;
    const totalCount = bikes.get('totalCount');

    return (
      <div>
        <div key={shortid.generate()} className='cards-container'>
          {bikes.get('data').map((bike) => <BikeCard key={shortid.generate()} location={location} bike={bike}/>)}
          {isLoaded(bikes) && bikes.get('data').size === 0 && <div className='no-data'>No bikes to display</div>}
        </div>
        <div>
          <Table>
            <TableFooter>
              <TableRow>
                <TablePagination
                  count={totalCount || 0}
                  rowsPerPage={parseInt(query.pageSize, 10) || 27}
                  rowsPerPageOptions={[9, 27, 45]}
                  page={parseInt(query.page, 10) || 0}
                  onChangePage={this.onPageChange}
                  onChangeRowsPerPage={this.onRowsPerPageChange}/>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    );
  }
}
