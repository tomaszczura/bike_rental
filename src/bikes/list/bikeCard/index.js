import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './index.scss';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import RentBikeDialog from './rentDialog';
import { Link } from 'react-router';

export default class BikeCard extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    bike: ImmutablePropTypes.map.isRequired,
  };

  state = {};

  componentDidMount() {
    this.isCompMounted = true;
  }

  componentWillUnmount() {
    this.isCompMounted = false;
  }

  showBikeRentDialog = () => this.isCompMounted && this.setState({ showRentDialog: true });

  hideBikeRentDialog = () => this.isCompMounted && this.setState({ showRentDialog: false });

  render() {
    const { bike, location } = this.props;

    return (
      <div>
        <Card className='bike-card'>
          <CardMedia className='card-image' image={bike.get('imageUrl')}/>
          <CardContent>
            <Typography gutterBottom variant='headline' component='h2'>{bike.get('model')}</Typography>
            <Typography component='div'>
              <div className='bike-props'>
                <span className='prop-name'>Color:</span>
                <div className='bike-color' style={{ backgroundColor: bike.get('color') }}/>
              </div>
              <div className='bike-props'>
                <span className='prop-name'>Weight:</span> {bike.get('weight')}kg
              </div>
            </Typography>
          </CardContent>
          <CardActions>
            <Button size='small' color='primary' onClick={this.showBikeRentDialog}>Rent this bike</Button>
            <Button size='small' color='primary' component={Link} to={`/bikes/${bike.get('id')}`}>Show details</Button>
          </CardActions>
        </Card>
        {this.state.showRentDialog && <RentBikeDialog bike={bike} location={location} onClose={this.hideBikeRentDialog}/>}
      </div>
    );
  }
}
