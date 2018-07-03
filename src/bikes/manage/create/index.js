import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form/immutable';
import InputAdornment from '@material-ui/core/InputAdornment';
import DialogBase from '../../../common/dialogBase';
import { TextField } from '../../../common/formInputs';
import SelectInput from '../../../common/selectInput';
import { Colors } from '../../../constants/colors';
import './index.scss';
import ImageInput from '../../../common/imageInput';

const validate = (values) => {
  const errors = {};
  const { model, color, weight, image } = values.toJS();

  if (!model) { errors.model = 'Model is required'; }
  if (!color) { errors.color = 'Color is required'; }
  if (!weight) { errors.weight = 'Weight is required'; }
  if (!image || image.length === 0) { errors.image = 'Image is required'; }

  return errors;
};

@reduxForm({
  form: 'bikeForm',
  validate
})
export default class EditBikeDialog extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    onClose: PropTypes.func
  };

  onSubmit = async (form) => {
    const values = form.toJS();
  };

  renderColorSelect = (value) => <div className='select-color' style={{ backgroundColor: value }} />;

  renderColorValue = (value) => <div className='select-color' style={{ backgroundColor: value }} />

  render() {
    const { handleSubmit, onClose } = this.props;

    return (
      <DialogBase title='Create Bike' onClose={onClose} onSubmit={handleSubmit(this.onSubmit)}>
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
            <Field
              component={SelectInput}
              label='Color'
              name='color'
              renderValue={this.renderColorValue}
              renderOption={this.renderColorSelect}
              values={Colors}/>
          </div>
          <div className='input-container'>
            <Field
              component={ImageInput}
              name='image'/>
          </div>
        </div>
      </DialogBase>
    );
  }
}
