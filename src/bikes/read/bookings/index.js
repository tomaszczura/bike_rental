import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import * as actions from './actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import selector from './selector';
import { hashQuery } from '../../../reducers/utils';
import { BookingType } from '../../../constants/bookingsType';
import { List } from 'immutable';
import { isLoading } from '../../../utils/data';
import DataTable from '../../../common/table';
import TableRow from '@material-ui/core/es/TableRow/TableRow';
import TableCell from '@material-ui/core/es/TableCell/TableCell';
import DeleteImageButton from '../../../common/deleteImgBtn';

@connect(selector, dispatch => ({
  fetchBikeBookings: bindActionCreators(actions.fetchBikeBookings, dispatch),
  deleteBikeBooking: bindActionCreators(actions.deleteBikeBooking, dispatch),
  routerPush: bindActionCreators(push, dispatch)
}))
export default class BikeBookingsList extends Component {
  static propTypes = {
    bookings: ImmutablePropTypes.map,
    deleteBikeBooking: PropTypes.func,
    location: PropTypes.object.isRequired,
    bikeId: PropTypes.number.isRequired,
    fetchBikeBookings: PropTypes.func,
    routerPush: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.tableHeaders = [
      { label: 'USER' },
      { label: 'START DATE', id: 'from' },
      { label: 'END DATE', id: 'to' },
      { label: 'ACTIONS' },
    ];
  }

  componentDidMount() {
    const { location, bikeId } = this.props;
    this.props.fetchBikeBookings(bikeId, location.query);
  }

  componentDidUpdate(prevProps, prevState, prevContext) { // eslint-disable-line no-unused-vars
    const { bikeId } = this.props;
    const currentQueryHash = hashQuery(this.props.location.query);
    const prevQueryHash = hashQuery(prevProps.location.query);
    if (prevQueryHash !== currentQueryHash || prevProps.bikeId !== bikeId) {
      this.props.fetchBikeBookings(bikeId, this.props.location.query);
    }
  }

  handleChange = (event, value) => {
    const { location, location: { query } } = this.props;
    this.props.routerPush({
      ...location,
      query: {
        ...query,
        type: value
      }
    });
  };

  handleBookingDelete = (bookingId) => async () => {
    const { location, bikeId } = this.props;
    await this.props.deleteBikeBooking({ bookingId });
    this.props.fetchBikeBookings(bikeId, location.query);
  };

  renderBookingRows = () => {
    const { bookings } = this.props;
    return bookings.get('data', List()).map((booking) => (
      <TableRow
        hover
        tabIndex={-1}
        key={`bookings${booking.get('id')}`}>
        <TableCell>{booking.getIn(['user', 'email'])}</TableCell>
        <TableCell>{booking.get('startDate')}</TableCell>
        <TableCell>{booking.get('endDate')}</TableCell>
        <TableCell>
          <DeleteImageButton onDelete={this.handleBookingDelete(booking.get('id'))}/>
        </TableCell>
      </TableRow>
    ));
  };

  render() {
    const { bookings, location, location: { query: { type = BookingType.ACTIVE } } } = this.props;

    return (
      <div>
        <Tabs value={type} onChange={this.handleChange}>
          <Tab label='Active' value={BookingType.ACTIVE} />
          <Tab label='Future' value={BookingType.FUTURE}/>
          <Tab label='Past' value={BookingType.PAST}/>
        </Tabs>
        <div>
          <DataTable
            isLoading={isLoading(bookings)}
            location={location}
            headers={this.tableHeaders}
            rows={this.renderBookingRows()}
            totalCount={bookings.get('totalCount')}/>
        </div>
      </div>
    );
  }
}
