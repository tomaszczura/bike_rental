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
import * as actions from './actions';
import { Errors } from './errors';
import LoadingButton from '../../common/loadingButton';
import { getErrorCode } from '../../utils/error';

const validate = (values) => {
  const errors = {};
  const { login, password, passwordConfirmation } = values.toJS();

  if (!login || !login.replace(' ', '')) { errors.login = 'Email is required'; }
  if (login && !isValidEmail(login)) { errors.login = 'Email is not valid'; }

  if (!password || !password.replace(' ', '')) { errors.password = 'Password is required'; }
  if (!passwordConfirmation) { errors.passwordConfirmation = 'Confirm password'; }
  if (password && password.length < 6) { errors.password = 'At least 6 characters'; }
  if (password !== passwordConfirmation) { errors.passwordConfirmation = 'Password does not match'; }

  return errors;
};

@reduxForm({
  form: 'registerForm',
  validate
})
@connect(null, dispatch => ({
  routerPush: bindActionCreators(push, dispatch),
  registerUser: bindActionCreators(actions.registerUser, dispatch)
}))
export default class RegisterDialog extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    registerUser: PropTypes.func,
    routerPush: PropTypes.func
  };

  state = {
    error: ''
  };

  onSignUpClick = () => {
    this.props.routerPush('/login');
  };

  resolveError = (error) => {
    const errorCode = getErrorCode(error);
    let errorMessage = 'Unknown error';
    if (errorCode === Errors.EMAIL_TAKEN) {
      errorMessage = 'Email already taken';
    }
    this.setState({ error: errorMessage, loading: false });
  };

  submit = async (form) => {
    try {
      this.setState({ error: '', loading: true });
      await this.props.registerUser(form.toJS());
      this.setState({ loading: false });
      this.props.routerPush('/bikes');
    } catch (error) {
      this.resolveError(error);
    }
  };

  render() {
    const { handleSubmit } = this.props;
    const { error, loading } = this.state;

    return (
      <Dialog open>
        <form onSubmit={handleSubmit(this.submit)}>
          <DialogTitle id='simple-dialog-title'>Register</DialogTitle>
          <DialogContent>
            {error && <div className='error-container'>{error}</div>}
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
            <LoadingButton loading={loading} onClick={handleSubmit(this.submit)} color='primary'>Sign up</LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}
