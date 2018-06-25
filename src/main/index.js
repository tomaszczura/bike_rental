import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../home';
import BikesContainer from '../bikes';

export default class Main extends Component {
  static propTypes = {};

  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/bikes' component={BikesContainer}/>
        </Switch>
      </main>
    );
  }
}
