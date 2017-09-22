import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import decode from 'jwt-decode';

import './styles/index.css';
import './styles/App.css';

import App from './App';
import Login from './components/Login';

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
    <Switch>
      <Route exact path='/login' component={Login} />
      <PrivateRoute path="/" component={App} />
    </Switch>
  </Router>,
  document.getElementById('root')
);
