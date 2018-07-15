import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { reduxForm, Field } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { TextField } from '../../common/formInputs';
import * as actions from './actions';
import { Errors } from './errors';
import LoadingButton from '../../common/loadingButton';
import { getErrorCode } from '../../utils/error';

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
@connect(null, dispatch => ({
  loginUser: bindActionCreators(actions.loginUser, dispatch),
  routerPush: bindActionCreators(push, dispatch)
}))
export default class LoginDialog extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    loginUser: PropTypes.func,
    routerPush: PropTypes.func
  };

  state = {};

  onSignUpClick = () => {
    this.props.routerPush('/register');
  };

  resolveError = (error) => {
    const errorCode = getErrorCode(error);
    let errorMessage = 'Unknown error';
    if (errorCode === Errors.INVALID_CREDENTIALS) {
      errorMessage = 'Email or password invalid';
    }
    this.setState({ error: errorMessage, loading: false });
  };

  submit = async (form) => {
    try {
      this.setState({ error: '', loading: true });
      await this.props.loginUser(form.toJS());
      this.setState({ loading: false });
      this.props.routerPush('/bikes');
    } catch (error) {
      console.error(error); // eslint-disable-line no-console
      this.resolveError(error);
    }
  };

  render() {
    const { handleSubmit } = this.props;
    const { error, loading } = this.state;

    return (
      <Dialog open>
        <form onSubmit={handleSubmit(this.submit)}>
          <DialogTitle id='simple-dialog-title'>Login</DialogTitle>
          <DialogContent>
            {error && <div className='error-container'>{error}</div>}
            <div className='input-container'>
              <Field label='E-mail' component={TextField} name='login'/>
            </div>
            <div className='input-container'>
              <Field label='Password' component={TextField} name='password' type='password'/>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.onSignUpClick} color='primary'>Sign up</Button>
            <LoadingButton isBtnLoading={loading} onClick={handleSubmit(this.submit)} color='primary'>Login</LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}
