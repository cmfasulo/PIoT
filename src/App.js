import React, { Component } from 'react';
import pi from './drawables/pi.svg';
import './styles/App.css';

import List from './components/List';
import deviceProps from './components/Device/deviceProps';

// TODO: establish consistent use of ES6 throughout app
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={pi} className="App-logo" alt="pi" />
          <h2>Welcome to PIoT!</h2>
        </div>
        <List {...deviceProps}></List>
        <div className="App-footer">
        </div>
      </div>
    );
  }
}

export default App;
