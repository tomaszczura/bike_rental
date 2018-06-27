import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Main extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    const { children } = this.props;

    return (
      <main>
        Main
        { children }
      </main>
    );
  }
}
