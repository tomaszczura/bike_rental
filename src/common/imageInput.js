import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import './index.scss';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

export default class ImageInput extends Component {
  static propTypes = {
    input: PropTypes.object,
    meta: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      imagePreviewUrl: this.props.input.value
    };
  }

  onFileChange = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
    this.props.input.onChange(e);
  };

  render() {
    const { meta: { touched, error } } = this.props;
    const { imagePreviewUrl } = this.state;

    return (
      <FormControl error={touched && error ? error : null}>
        <input
          accept='image/*'
          id='raised-button-file'
          multiple
          style={{ display: 'none' }}
          type='file'
          onChange={this.onFileChange}/>
        <label htmlFor='raised-button-file'>
          <Button variant='raised' component='span'>
            Upload image
          </Button>
        </label>
        <div>
          <img className='form-image-preview' alt='' src={imagePreviewUrl}/>
        </div>
        {touched && error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    );
  }
}
