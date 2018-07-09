import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './index.scss';

export default class BikeCard extends Component {
  static propTypes = {
    bike: ImmutablePropTypes.map.isRequired,
  };

  render() {
    const { bike } = this.props;

    return (
      <div>
        <Card className='bike-card'>
          <CardMedia className='card-image' image={bike.get('imageUrl')}/>
          <CardContent>
            <Typography gutterBottom variant='headline' component='h2'>{bike.get('model')}</Typography>
            <Typography component='p'>
              <div className='bike-props'>
                <span className='prop-name'>Color:</span>
                <div className='bike-color' style={{ backgroundColor: bike.get('color') }}/>
              </div>
              <div className='bike-props'>
                <span className='prop-name'>Weight:</span> {bike.get('weight')}kg
              </div>
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}
