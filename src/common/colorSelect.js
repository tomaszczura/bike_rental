import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Colors, ColorsWithEmpty } from '../constants/colors';
import SelectInput from './selectInput';

export default class ColorSelect extends Component {
  static propTypes = {
    allowEmpty: PropTypes.bool,
    input: PropTypes.object
  };

  renderColorSelect = (value) => (value ? <div className='select-color' style={{ backgroundColor: value }} /> : <div>None</div>)

  renderColorValue = (value) => <div className='color-value' style={{ backgroundColor: value }} />;

  render() {
    return (
      <SelectInput
        {...this.props}
        label='Color'
        name='color'
        renderValue={this.renderColorValue}
        renderOption={this.renderColorSelect}
        values={this.props.allowEmpty ? ColorsWithEmpty : Colors}/>
    );
  }
}
