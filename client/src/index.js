import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import decode from 'jwt-decode';

import App from './App';
import Login from './components/Login';
import './styles/index.css';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#2196f4',
    accent1Color: '#000000',
  }
});

const checkToken = () => {
  let token = localStorage.getItem('jwtPIoT') || null;
  let decoded = token && decode(token);

  if (decoded && ((Date.now()/1000) < decoded.exp)) {
    return true;
  } else {
    localStorage.removeItem('jwtPIoT');
    return false;
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => {
    let validToken = checkToken();

    if (validToken) {
      return (<Component {...props}/>)
    } else {
      return (<Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>)
    }
  }}/>
)

ReactDOM.render(
  <Router>
    <MuiThemeProvider muiTheme={muiTheme}>
      <Switch>
        <Route exact path='/login' component={Login} />
        <PrivateRoute path="/" component={App} />
      </Switch>
    </MuiThemeProvider>
  </Router>,
  document.getElementById('root')
);
