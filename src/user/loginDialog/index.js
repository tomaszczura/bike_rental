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
  routerPush: bindActionCreators(push, dispatch)
}))
export default class LoginDialog extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    routerPush: PropTypes.func
  };

  onSignUpClick = () => {
    this.props.routerPush('/register');
  };

  submit = (form) => {
    // debugger;
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <Dialog open>
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
            <Button onClick={this.onSignUpClick} color='primary'>Sign up</Button>
            <Button onClick={handleSubmit(this.submit)} color='primary'>Login</Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}
