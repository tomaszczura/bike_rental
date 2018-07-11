import React, { Component } from 'react';
import selector from './selector';
import * as actions from './actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hashQuery } from '../../reducers/utils';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import BikeCard from './bikeCard';
import shortid from 'shortid';
import './index.scss';
import BikesFilters from './filters';
import { push } from 'react-router-redux';
import TablePagination from '@material-ui/core/TablePagination';
import Table from '@material-ui/core/Table';

@connect(selector, dispatch => ({
  fetchBikes: bindActionCreators(actions.fetchBikes, dispatch),
  routerPush: bindActionCreators(push, dispatch)
}))
export default class BikesList extends Component {
  static propTypes = {
    bikes: ImmutablePropTypes.map,
    fetchBikes: PropTypes.func,
    location: PropTypes.object,
    routerPush: PropTypes.func
  };

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
        <div>
          <BikesFilters location={location}/>
        </div>
        <div key={shortid.generate()} className='cards-container'>
          {bikes.get('data').map((bike) => <BikeCard key={shortid.generate()} bike={bike}/>)}
        </div>
        <div>
          <Table>
            <TablePagination
              count={totalCount || 0}
              rowsPerPage={parseInt(query.pageSize, 10) || 27}
              rowsPerPageOptions={[9, 27, 45]}
              page={parseInt(query.page, 10) || 0}
              onChangePage={this.onPageChange}
              onChangeRowsPerPage={this.onRowsPerPageChange}/>
          </Table>
        </div>
      </div>
    );
  }
}
