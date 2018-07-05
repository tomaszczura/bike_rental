import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import shortid from 'shortid';

export default class DataTableHead extends React.Component {
  static propTypes = {
    headers: PropTypes.array,
    order: PropTypes.string,
    orderBy: PropTypes.string,
    onRequestSort: PropTypes.func
  };

  createSortHandler = property => event => {
    this.props.onRequestSort && this.props.onRequestSort(event, property);
  };

  render() {
    const { headers, order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
          {headers.map(column => (
            <TableCell
              key={shortid.generate()}
              numeric={column.numeric}
              padding={column.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === column.id ? order : false}>

              {column.id ?
                <TableSortLabel
                  active={column.id && orderBy === column.id}
                  direction={order}
                  onClick={this.createSortHandler(column.id)}>
                  {column.label}
                </TableSortLabel>
                : column.label
              }
            </TableCell>
          ), this)}
        </TableRow>
      </TableHead>
    );
  }
}
