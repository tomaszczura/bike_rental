import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { reduxForm, Field } from 'redux-form/immutable';
import Button from '@material-ui/core/Button';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TextField } from '../../common/formInputs';
import { isValidEmail } from '../../utils/validate';

const validate = (values) => {
  const errors = {};
  const { login, password, passwordConfirmation } = values.toJS();

  if (!login || !login.replace(' ', '')) { errors.login = 'Email is required'; }
  if (login && !isValidEmail(login)) { errors.login = 'Email is not valid'; }

  if (!password || !password.replace(' ', '')) { errors.password = 'Password is required'; }
  if (!passwordConfirmation) { errors.passwordConfirmation = 'Confirm password'; }
  if (password && password.length > 6) { errors.password = 'At least 6 characters'; }
  if (password !== passwordConfirmation) { errors.passwordConfirmation = 'Password does not match'; }

  return errors;
};

@reduxForm({
  form: 'registerForm',
  validate
})
@connect(null, dispatch => ({
  routerPush: bindActionCreators(push, dispatch)
}))
export default class RegisterDialog extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    routerPush: PropTypes.func
  };

  onSignUpClick = () => {
    this.props.routerPush('/login');
  };

  submit = (form) => {
    // debugger;
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <Dialog open>
        <form onSubmit={handleSubmit(this.submit)}>
          <DialogTitle id='simple-dialog-title'>Register</DialogTitle>
          <DialogContent>
            <div className='input-container'>
              <Field label='E-mail' component={TextField} name='login'/>
            </div>
            <div className='input-container'>
              <Field label='Password' component={TextField} name='password' type='password'/>
            </div>
            <div className='input-container'>
              <Field label='Password confirmation' component={TextField} name='passwordConfirmation' type='password'/>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.onSignUpClick} color='primary'>Sign in</Button>
            <Button onClick={handleSubmit(this.submit)} color='primary'>Sign up</Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}
