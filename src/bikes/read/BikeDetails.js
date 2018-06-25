import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class BikeDetails extends Component {
    static propTypes = {
      match: PropTypes.object
    };

    render() {
      return (
        <div>Bike details</div>
      );
    }
}
