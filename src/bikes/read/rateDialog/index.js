import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import DialogBase from '../../../common/dialogBase';
import * as actions from '../../../actions/bike';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RateStars } from '../../../common/rateStars';

@connect(null, dispatch => ({
  rateBike: bindActionCreators(actions.rateBike, dispatch)
}))
export default class RateDialog extends Component {
  static propTypes = {
    bike: ImmutablePropTypes.map.isRequired,
    rateBike: PropTypes.func,
    onClose: PropTypes.func.isRequired
  };

  state = {};

  changeRating = (rating) => this.setState({ rating });

  handleSubmit = async () => {
    try {
      this.setState({ error: '', loading: true });
      await this.props.rateBike({ bikeId: this.props.bike.get('id'), rate: this.state.rating });
      this.setState({ loading: false });
      this.props.onClose();
    } catch (error) {
      this.setState({ error: 'Unknown error', loading: false });
    }
  };

  render() {
    const { onClose } = this.props;
    const { error, loading } = this.state;

    return (
      <DialogBase error={error} loading={loading} title='Rate this bike' submitText='Save' onClose={onClose} onSubmit={this.handleSubmit}>
        <RateStars
          rating={this.state.rating}
          changeRating={this.changeRating}/>
      </DialogBase>
    );
  }
}
