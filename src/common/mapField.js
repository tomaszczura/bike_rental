import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CustomGoogleMap } from './map';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core//FormHelperText';

export default class MapField extends Component {
  static propTypes = {
    input: PropTypes.object,
    label: PropTypes.string,
    meta: PropTypes.object
  };

  onChange = (value) => {
    const lat = value.latLng.lat();
    const lng = value.latLng.lng();
    this.props.input.onChange({ lat, lng });
  };

  render() {
    const { input, label, meta: { touched, error } } = this.props;

    return (
      <FormControl error={touched && error ? error : null} style={{ width: '100%' }}>
        <InputLabel htmlFor={input.name}>{label}</InputLabel>
        <CustomGoogleMap
          containerElement={<div style={{ height: '300px', width: '100%', marginTop: '55px' }} />}
          mapElement={<div style={{ height: '100%' }} />}
          marker={input.value}
          onClick={this.onChange}/>
        {touched && error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    );
  }
}
