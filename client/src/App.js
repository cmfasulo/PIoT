import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import './styles/App.css';

import AppNav from './components/util/AppNav';
import Admin from './components/Admin';
import Profile from './components/Profile';
import List from './components/util/List';
import dashboardDevices from './props/dashboardDevices';

class App extends Component {

  renderList(props) {
    return <List {...props}/>;
  }

  render() {
    return (
      <div>
        <AppNav/>
        <Grid fluid>
          <Row>
            <Col xs={1}></Col>
            <Col xs={10} className="App">
              <Route exact path='/' render={() => (<List {...dashboardDevices} />)}/>
              <Route path='/admin' component={Admin}/>
              <Route path='/profile' component={Profile}/>
            </Col>
            <Col xs={1}></Col>
          </Row>
          <div className="App-footer"></div>
        </Grid>
      </div>
    );
  }
}

export default App;
