/* eslint-disable react/prop-types,react/jsx-indent-props */
import React from 'react';
import MaterialTextField from '@material-ui/core/TextField';

export const TextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <MaterialTextField
    label={label}
    error={Boolean(touched && error)}
    helperText={touched && error}
    {...input}
    {...custom}
  />);
