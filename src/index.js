import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './App';
import AddDevice from './components/AddDevice';

ReactDOM.render(
  <Router>
      <div>
        <Route exact path='/' component={App} />
        <Route path='/add-device' component={AddDevice} />
      </div>
  </Router>,
  document.getElementById('root')
);
