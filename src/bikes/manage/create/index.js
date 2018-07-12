import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form/immutable';
import InputAdornment from '@material-ui/core/InputAdornment';
import DialogBase from '../../../common/dialogBase';
import { CheckboxField, TextField } from '../../../common/formInputs';
import './index.scss';
import ImageInput from '../../../common/imageInput';
import MapField from '../../../common/mapField';
import * as actions from './actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ColorSelect from '../../../common/colorSelect';

const validate = (values) => {
  const errors = {};
  const { model, color, weight, image, location } = values.toJS();

  if (!model) { errors.model = 'Model is required'; }
  if (!color) { errors.color = 'Color is required'; }
  if (!weight) { errors.weight = 'Weight is required'; }
  if (!image || image.length === 0) { errors.image = 'Image is required'; }
  if (!location || !location.lat || !location.lng) { errors.location = 'Location is required'; }

  return errors;
};

@reduxForm({
  form: 'bikeForm',
  validate
})
@connect(null, dispatch => ({
  persistBike: bindActionCreators(actions.persistBike, dispatch),
}))
export default class EditBikeDialog extends Component {
  static propTypes = {
    edit: PropTypes.bool,
    handleSubmit: PropTypes.func,
    persistBike: PropTypes.func,
    onBikeSaved: PropTypes.func,
    onClose: PropTypes.func
  };

  state = {};

  onSubmit = async (form) => {
    try {
      this.setState({ loading: true });
      const values = form.toJS();
      await this.props.persistBike(values);
      this.props.onBikeSaved && this.props.onBikeSaved();
      this.setState({ loading: false });
      this.props.onClose();
    } catch (error) {
      this.setState({ loading: false });
    }
  };

  render() {
    const { handleSubmit, onClose, edit } = this.props;

    return (
      <DialogBase loading={this.state.loading} title={edit ? 'Edit Bike' : 'Create Bike'} submitText='Save' onClose={onClose} onSubmit={handleSubmit(this.onSubmit)}>
        <div className='form-container'>
          <div className='bike-image'>
            <Field component={ImageInput} name='image'/>
          </div>
          <div>
            <div className='input-container'>
              <Field label='Model' component={TextField} name='model'/>
            </div>
            <div className='input-container'>
              <Field
                InputProps={{
                  startAdornment: <InputAdornment position='start'>Kg</InputAdornment>,
                }}
                label='Weight'
                component={TextField}
                name='weight'
                type='number'
                step='0.01'
                min='0'/>
            </div>
            <div className='input-container'>
              <Field component={ColorSelect} name='color'/>
            </div>
            <div className='input-container'>
              <Field component={CheckboxField} label='Is available' name='isAvailable'/>
            </div>
          </div>
        </div>
        <Field component={MapField} label='Location' name='location'/>
      </DialogBase>
    );
  }
}
