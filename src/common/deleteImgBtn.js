import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

export default class DeleteImageButton extends Component {
  static propTypes = {
    onDelete: PropTypes.func
  };

  onDeleteClick = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const del = await window.confirm('Are you sure you want to delete this?');
    if (del) {
      this.props.onDelete();
    }
  };

  render() {
    return <IconButton onClick={this.onDeleteClick}><DeleteIcon/></IconButton>;
  }
}
