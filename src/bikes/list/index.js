import React, { Component } from 'react';
import selector from './selector';
import * as actions from './actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hashQuery } from '../../reducers/utils';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import './index.scss';
import BikesFilters from './filters';
import { push } from 'react-router-redux';
import { dateInputFormat } from '../../common/dateRangeInput';
import moment from 'moment';
import BikesCards from './bikesCards';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import BikesMapContainer from './bikesMap';

const BikesTabs = {
  LIST: 'LIST',
  MAP: 'MAP'
};

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

  state = {
    tab: BikesTabs.LIST
  };

  componentDidMount() {
    const { location, location: { query, query: { startDate, endDate } } } = this.props;
    if (!startDate || !endDate) {
      const newQuery = { ...query };
      if (!startDate) {
        newQuery.startDate = moment().format(dateInputFormat);
      }
      if (!endDate) {
        newQuery.endDate = moment().add(1, 'weeks').format(dateInputFormat);
      }
      this.props.routerPush({ ...location, query: newQuery });
    } else {
      this.props.fetchBikes(query);
    }
  }

  async componentDidUpdate(prevProps, prevState, prevContext) { // eslint-disable-line no-unused-vars
    const currentQueryHash = hashQuery(this.props.location.query);
    const prevQueryHash = hashQuery(prevProps.location.query);
    if (prevQueryHash !== currentQueryHash) {
      await this.props.fetchBikes(this.props.location.query);
    }
  }

  handleTabChange = (event, tab) => {
    const { location, location: { query } } = this.props;
    const newQuery = { ...query };
    newQuery.pageSize = tab === BikesTabs.MAP ? 250 : 27;
    this.props.routerPush({ ...location, query: newQuery });
    this.setState({ tab });
  };

  render() {
    const { bikes, location } = this.props;
    const { tab } = this.state;

    return (
      <div>
        <div>
          <BikesFilters location={location}/>
        </div>
        <div>
          <Tabs value={this.state.tab} onChange={this.handleTabChange}>
            <Tab label='List' value={BikesTabs.LIST}/>
            <Tab label='Map' value={BikesTabs.MAP}/>
          </Tabs>
        </div>
        <div>
          {tab === BikesTabs.LIST && <BikesCards location={location} bikes={bikes}/>}
          {tab === BikesTabs.MAP && <BikesMapContainer location={location} bikes={bikes}/>}
        </div>
      </div>
    );
  }
}
