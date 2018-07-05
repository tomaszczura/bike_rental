import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import TableBody from '@material-ui/core/TableBody';
import './index.scss';
import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core//TableFooter';
import TableRow from '@material-ui/core/TableRow';
import DataTableHead from './tableHead';

@connect(null, dispatch => ({
  routerPush: bindActionCreators(push, dispatch)
}))
export default class DataTable extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    headers: PropTypes.array.isRequired,
    rows: PropTypes.object.isRequired,
    routerPush: PropTypes.func,
    totalCount: PropTypes.number,
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

  onPageChange = (event, page) => {
    const { location, location: { query } } = this.props;
    this.props.routerPush({
      ...location,
      query: {
        ...query,
        page
      }
    });
  };

  onPageChange = (event, page) => {
    const { location, location: { query } } = this.props;
    this.props.routerPush({
      ...location,
      query: {
        ...query,
        page
      }
    });
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
    const { headers, location: { query }, rows, totalCount } = this.props;

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
          <TableFooter>
            <TableRow>
              <TablePagination
                colSpan={headers.length}
                count={totalCount || 0}
                rowsPerPage={parseInt(query.pageSize, 10) || 25}
                page={parseInt(query.page, 10) || 0}
                onChangePage={this.onRowsPerPageChange}
                onChangeRowsPerPage={this.onRowsPerPageChange}/>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    );
  }
}
