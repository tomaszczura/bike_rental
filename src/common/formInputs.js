/* eslint-disable react/prop-types,react/jsx-indent-props */
import React from 'react';
import MaterialTextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core//FormControlLabel';

export const TextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <MaterialTextField
    label={label}
    error={Boolean(touched && error)}
    helperText={touched && error}
    {...input}
    {...custom}
  />);

export const CheckboxField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <FormControlLabel
    control={
      <Checkbox
        error={Boolean(touched && error).toString()}
        checked={input.value}
        {...input}
        {...custom}
      />
    }
    label={label}
  />);
