import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

export default class LoadingButton extends Component {
  static propTypes = {
    children: PropTypes.node,
    isLoading: PropTypes.bool,
    pSize: PropTypes.number
  };

  static defaultProps = {
    pSize: 18
  };

  render() {
    const { isLoading, children, pSize } = this.props;

    return (
      <Button {...this.props}>
        {isLoading && <CircularProgress size={pSize} style={{ marginRight: 10 }}/>}
        {children}
      </Button>
    );
  }
}
