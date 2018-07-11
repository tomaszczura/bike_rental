import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { isLoading } from '../../utils/data';
import DataTable from '../../common/table';
import { List } from 'immutable';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import DeleteImageButton from '../../common/deleteImgBtn';

export default class UserBookingsList extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    bookings: ImmutablePropTypes.map.isRequired
  };

  constructor(props) {
    super(props);

    this.tableHeaders = [
      { label: 'MODEL' },
      { label: 'START DATE', id: 'from' },
      { label: 'END DATE', id: 'to' },
      { label: 'ACTIONS' },
    ];
  }

  handleBookingDeleteClick = (bookingId) => {

  };

  renderBookingRows = () => {
    const { bookings } = this.props;
    return bookings.get('data', List()).map((booking) => (
      <TableRow
        hover
        tabIndex={-1}
        key={`bookings${booking.get('id')}`}>
        <TableCell>
          <div className='row-with-image'>
            <img src={booking.getIn(['bike', 'imageUrl'])}/>
            {booking.getIn(['bike', 'model'])}
          </div>
        </TableCell>
        <TableCell>{booking.get('startDate')}</TableCell>
        <TableCell>{booking.get('endDate')}</TableCell>
        <TableCell>
          <DeleteImageButton onDelete={this.handleBookingDeleteClick(booking.get('id'))}/>
        </TableCell>
      </TableRow>
    ));
  };

  render() {
    const { bookings, location } = this.props;

    return (
      <div>
        <DataTable
          isLoading={isLoading(bookings)}
          location={location}
          headers={this.tableHeaders}
          rows={this.renderBookingRows()}
          totalCount={bookings.get('totalCount')}/>
      </div>
    );
  }
}
