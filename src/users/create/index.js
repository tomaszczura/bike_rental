import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '../../common/formInputs';
import { connect } from 'react-redux';
import * as listActions from '../list/actions';
import * as actions from './actions';
import { bindActionCreators } from 'redux';
import { reduxForm, Field } from 'redux-form/immutable';
import DialogBase from '../../common/dialogBase';
import { isValidEmail } from '../../utils/validate';
import SelectInput from '../../common/selectInput';
import { UserRolesSelect } from '../../constants/userRoles';
import { getErrorCode } from '../../utils/error';
import { Errors } from '../../user/registerDialog/errors';

const validate = (values) => {
  const errors = {};
  const { id, email, password, passwordConfirmation } = values.toJS();

  if (!email || !email.replace(' ', '')) { errors.email = 'Email is required'; }
  if (email && !isValidEmail(email)) { errors.email = 'Email is not valid'; }

  if (!id && (!password || !password.replace(' ', ''))) { errors.password = 'Password is required'; }
  if (password && !passwordConfirmation) { errors.passwordConfirmation = 'Confirm password'; }
  if (password && password.length < 6) { errors.password = 'At least 6 characters'; }
  if (password !== passwordConfirmation) { errors.passwordConfirmation = 'Password does not match'; }

  return errors;
};

@reduxForm({
  form: 'userForm',
  validate
})
@connect(null, dispatch => ({
  persistUser: bindActionCreators(actions.persistUser, dispatch),
  fetchUsers: bindActionCreators(listActions.fetchUsers, dispatch)
}))
export default class EditUserDialog extends Component {
  static propTypes = {
    edit: PropTypes.bool,
    fetchUsers: PropTypes.func,
    handleSubmit: PropTypes.func,
    location: PropTypes.object,
    persistUser: PropTypes.func,
    onClose: PropTypes.func
  };

  state = {};

  onSubmit = async (form) => {
    try {
      this.setState({ error: '', loading: true });
      const values = form.toJS();
      await this.props.persistUser(values);
      await this.props.fetchUsers(this.props.location.query);
      this.setState({ loading: false });
      this.props.onClose();
    } catch (error) {
      this.resolveError(error);
    }
  };

  resolveError = (error) => {
    const errorCode = getErrorCode(error);
    let errorMessage = 'Unknown error';
    if (errorCode === Errors.EMAIL_TAKEN) {
      errorMessage = 'Email already taken';
    }
    this.setState({ error: errorMessage, loading: false });
  };

  renderRoleSelect = (value) => <div>{value}</div>;

  render() {
    const { handleSubmit, onClose, edit } = this.props;
    const { error, loading } = this.state;

    return (
      <DialogBase error={error} loading={loading} title={edit ? 'Edit User' : 'Create User'} submitText='Save' onClose={onClose} onSubmit={handleSubmit(this.onSubmit)}>
        <div>
          <div className='input-container'>
            <Field disabled={edit} label='E-mail' component={TextField} name='email'/>
          </div>
          <div className='input-container'>
            <Field label='Password' component={TextField} name='password' type='password'/>
          </div>
          <div className='input-container'>
            <Field label='Password confirmation' component={TextField} name='passwordConfirmation' type='password'/>
          </div>
          <div className='input-container'>
            <Field
              component={SelectInput}
              label='Role'
              name='role'
              renderValue={this.renderRoleSelect}
              renderOption={this.renderRoleSelect}
              values={UserRolesSelect}/>
          </div>
        </div>
      </DialogBase>
    );
  }
}
