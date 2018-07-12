import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import * as actions from './actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hashQuery } from '../../reducers/utils';
import { push } from 'react-router-redux';
import { BookingType } from '../../constants/bookingsType';
import ImmutablePropTypes from 'react-immutable-proptypes';
import BookingsListForUser from '../../bookings/usersList/index';
import selector from './selector';

@connect(selector, dispatch => ({
  fetchUserBookings: bindActionCreators(actions.fetchUserBookings, dispatch),
  routerPush: bindActionCreators(push, dispatch)
}))
export default class UsersBookingList extends Component {
  static propTypes = {
    bookings: ImmutablePropTypes.map,
    location: PropTypes.object,
    params: PropTypes.shape({
      userId: PropTypes.string
    }),
    fetchUserBookings: PropTypes.func,
    routerPush: PropTypes.func
  };

  componentDidMount() {
    const { location, params } = this.props;
    this.props.fetchUserBookings(params.userId, location.query);
  }

  componentDidUpdate(prevProps, prevState, prevContext) { // eslint-disable-line no-unused-vars
    const { params } = this.props;
    const currentQueryHash = hashQuery(this.props.location.query);
    const prevQueryHash = hashQuery(prevProps.location.query);
    if (prevQueryHash !== currentQueryHash || prevProps.params.userId !== params.userId) {
      this.props.fetchUserBookings(params.userId, this.props.location.query);
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

  handleBookingDelete = async () => {
    const { location, params } = this.props;
    this.props.fetchUserBookings(params.userId, location.query);
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
          <BookingsListForUser bookings={bookings} location={location} onDeleted={this.handleBookingDelete}/>
        </div>
      </div>
    );
  }
}
