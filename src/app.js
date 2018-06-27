import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import './styles/common.scss';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles/index';
import PropTypes from 'prop-types';
import Main from './main';
import Header from './header';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4CAF50',
      light: '#C8E6C9',
      dark: '#388E3C',
      contrastText: '#212121',
    },
    secondary: {
      main: '#1976d2',
      light: '#63a4ff',
      dark: '#004ba0',
      contrastText: '#fff',
    },
    accent: '#448AFF'
  }
});

class App extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    const { children } = this.props;

    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <CssBaseline>
            <Header/>
            {children}
          </CssBaseline>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default hot(module)(App);
