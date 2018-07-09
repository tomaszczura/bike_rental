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

@connect(selector, dispatch => ({
  fetchBikes: bindActionCreators(actions.fetchBikes, dispatch)
}))
export default class BikesList extends Component {
  static propTypes = {
    bikes: ImmutablePropTypes.map,
    fetchBikes: PropTypes.func,
    location: PropTypes.object
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

  render() {
    const { bikes } = this.props;

    return (
      <div>
        <div className='cards-container'>
          {bikes.get('data').map((bike) => <BikeCard key={shortid.generate()} bike={bike}/>)}
        </div>
      </div>
    );
  }
}
