import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CustomGoogleMap } from './map';

export default class MapField extends Component {
  static propTypes = {
    input: PropTypes.object
  };

  onChange = (value) => {
    debugger;
    value.latLng.lat();
    value.latLng.lng();
    this.props.input.onChange({  })
  }

  render() {
    return (
      <div>
        <CustomGoogleMap
          containerElement={<div style={{ height: '300px', width: '100%' }} />}
          mapElement={<div style={{ height: '100%' }} />}
          onClick={this.onChange}/>
      </div>
    );
  }
}
