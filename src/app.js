import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import './styles/common.scss';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles/index';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from './header';
import * as actions from './actions/user';
import * as appActions from './actions';
import * as session from './utils/session';
import Snackbar from '@material-ui/core/Snackbar';
import selector from './selector';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import 'react-dates/initialize';
import { getErrorCode } from './utils/error';
import { ApiErrors } from './api/apiErrors';
import { push } from 'react-router-redux';

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

@connect(selector, dispatch => ({
  logoutUser: bindActionCreators(appActions.logoutUser, dispatch),
  fetchUserProfile: bindActionCreators(actions.fetchUser, dispatch),
  closeSnackbar: bindActionCreators(appActions.closeSnackbar, dispatch),
  routerPush: bindActionCreators(push, dispatch)
}))
class App extends Component {
  static propTypes = {
    closeSnackbar: PropTypes.func,
    logoutUser: PropTypes.func,
    routerPush: PropTypes.func,
    snackbarOpened: PropTypes.bool,
    snackbarMessage: PropTypes.string,
    children: PropTypes.node,
    fetchUserProfile: PropTypes.func
  };

  state = {};

  async componentDidMount() {
    const savedUser = session.getSavedUser();
    if (savedUser) {
      try {
        await this.props.fetchUserProfile();
      } catch (error) {
        const errorCode = getErrorCode(error);
        if (errorCode === ApiErrors.NOT_FOUND) {
          this.props.logoutUser();
          this.props.routerPush('/login');
        }
      }
    }
  }

  render() {
    const { children, closeSnackbar, snackbarMessage, snackbarOpened } = this.props;

    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <CssBaseline>
            <Header/>
            <div className='main-page-container'>
              {children}
            </div>
            <Snackbar
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              autoHideDuration={3000}
              open={snackbarOpened}
              onClose={closeSnackbar}
              message={<span id='message-id'>{snackbarMessage}</span>}
              action={[
                <IconButton
                  key='close'
                  aria-label='Close'
                  color='inherit'
                  onClick={closeSnackbar}>
                  <CloseIcon />
                </IconButton>]}/>
          </CssBaseline>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default hot(module)(App);
