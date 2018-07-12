import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import LoadingButton from './loadingButton';

export default class DialogBase extends Component {
  static propTypes = {
    children: PropTypes.node,
    loading: PropTypes.bool,
    error: PropTypes.string,
    submitText: PropTypes.string,
    cancelText: PropTypes.string,
    title: PropTypes.string,
    onCancel: PropTypes.func,
    onClose: PropTypes.func,
    onSubmit: PropTypes.func
  };

  static defaultProps = {
    submitText: 'Create',
    cancelText: 'Cancel'
  };

  render() {
    const { onClose, error, onSubmit, loading, submitText, cancelText, title, children, onCancel } = this.props;

    return (
      <Dialog disableEnforceFocus open onClose={onClose}>
        <form onSubmit={onSubmit}>
          <DialogTitle id='simple-dialog-title'>{title}</DialogTitle>
          <DialogContent>
            {error && <div className='error-container'>{error}</div>}
            {children}
          </DialogContent>
          <DialogActions>
            <Button onClick={onCancel || onClose} color='primary'>{cancelText}</Button>
            <LoadingButton loading={loading} onClick={onSubmit} color='primary'>{submitText}</LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}
