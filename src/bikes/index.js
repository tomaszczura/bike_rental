import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import BikesList from './list';
import BikeDetails from './read/BikeDetails';

export default class BikesContainer extends Component {
    static propTypes = {};

    render() {
      return (
        <Switch>
          <Route exact path='/bikes' component={BikesList}/>
          <Route path='/bikes/:id' component={BikeDetails}/>
        </Switch>
      );
    }
}
