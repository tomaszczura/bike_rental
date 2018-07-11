import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/es/Select';
import Input from '@material-ui/core/es/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';

export default class SelectInput extends Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    label: PropTypes.string,
    labelOnDown: PropTypes.bool,
    values: PropTypes.array,
    meta: PropTypes.object,
    renderOption: PropTypes.func.isRequired,
    renderValue: PropTypes.func.isRequired
  };

  static defaultProps = {
    meta: {}
  };

  render() {
    const { values, input, meta: { touched, error }, label, renderValue, renderOption, labelOnDown } = this.props;

    return (
      <FormControl error={touched && error ? error : null}>
        {!labelOnDown && <InputLabel htmlFor={input.name}>{label}</InputLabel>}
        <Select
          {...input}
          MenuProps={{
            PaperProps: {
              style: {
                transform: 'translate3d(0, 0, 0)'
              }
            }
          }}
          value={input.value || ''}
          renderValue={value => renderValue(value)}
          input={<Input id={input.name}/>}>
          {values.map((value, index) => <MenuItem key={index} value={value.value}>{renderOption(value.value)}</MenuItem>)}
        </Select>
        {touched && error && <FormHelperText>{error}</FormHelperText>}
        {labelOnDown && <FormHelperText>{label}</FormHelperText>}
      </FormControl>
    );
  }
}
