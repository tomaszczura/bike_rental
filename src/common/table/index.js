import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import TableBody from '@material-ui/core/TableBody';
import DataTableHead from './tableHead';
import './index.scss';

@connect(null, dispatch => ({
  routerPush: bindActionCreators(push, dispatch)
}))
export default class DataTable extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    headers: PropTypes.array.isRequired,
    rows: PropTypes.object.isRequired,
    routerPush: PropTypes.func
  };

  onSortChange = (event, orderBy) => {
    const { location, location: { query } } = this.props;
    const newOrder = query.order === 'asc' ? 'desc' : 'asc';
    this.props.routerPush({
      ...location,
      query: {
        ...query,
        order: newOrder,
        orderBy
      }
    });
  };

  render() {
    const { headers, location: { query }, rows } = this.props;

    return (
      <div className='data-table'>
        <Table>
          <DataTableHead
            headers={headers}
            order={query.order}
            orderBy={query.orderBy}
            onRequestSort={this.onSortChange}/>
          <TableBody>
            {rows}
          </TableBody>
        </Table>
      </div>
    );
  }
}
