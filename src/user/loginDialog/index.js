import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { reduxForm, Field } from 'redux-form/immutable';
import { TextField } from '../../common/formInputs';

const validate = (values) => {
  const errors = {};
  const { login, password } = values.toJS();

  if (!login) {
    errors.login = 'This field is required';
  }

  if (!password) {
    errors.password = 'This field is required';
  }

  return errors;
};

@reduxForm({
  form: 'loginForm',
  validate
})
export default class LoginDialog extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    onClose: PropTypes.func
  }

  submit = (form) => {
    debugger;
  }

  render() {
    const { onClose, handleSubmit } = this.props;

    return (
      <Dialog open onClose={onClose}>
        <form onSubmit={handleSubmit(this.submit)}>
          <DialogTitle id='simple-dialog-title'>Login</DialogTitle>
          <DialogContent>
            <div className='input-container'>
              <Field label='E-mail' component={TextField} name='login'/>
            </div>
            <div className='input-container'>
              <Field label='Password' component={TextField} name='password' type='password'/>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color='primary'>Cancel</Button>
            <Button onClick={handleSubmit(this.submit)} color='primary'>Login</Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}
