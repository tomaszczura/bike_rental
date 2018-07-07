import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

export default class EditImageButton extends Component {
  static propTypes = {
    onEdit: PropTypes.func
  };

  render() {
    const { onEdit } = this.props;
    return <IconButton onClick={onEdit}><EditIcon/></IconButton>;
  }
}
