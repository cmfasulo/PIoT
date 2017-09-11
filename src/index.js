import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import pi from './drawables/pi.svg';
import './styles/index.css';
import './styles/App.css';

import App from './App';
import Login from './Login';
import Signup from './Signup';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    localStorage.getItem('authToken') ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

ReactDOM.render(
  <Router>
    <div className="App">
      <div className="App-header">
        <img src={pi} className="App-logo" alt="pi" />
        <h2>Welcome to PIoT!</h2>
      </div>
        <PrivateRoute exact path='/' component={App} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
      <div className="App-footer">
      </div>
    </div>
  </Router>,
  document.getElementById('root')
);
