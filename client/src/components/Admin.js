import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {Tabs, Tab} from 'material-ui/Tabs';
import decode from 'jwt-decode';

import Users from './Users';
import Devices from './Devices';
import Rooms from './Rooms';

class Admin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      admin: false,
      items: ''
    };
   }

   componentWillMount() {
      this.checkAuth();
    }

   checkAuth() {
     let token = localStorage.getItem('jwtPIoT') || null;
     let decoded = token && decode(token);

    if (decoded && decoded.admin) {
      this.setState({ admin: true });
    } else {
      this.setState({ admin: false });
      this.props.history.push('/');
    }
   }

  render() {
    return this.state.admin ? (
      <Tabs>
        <Tab label="Users" >
          <Users toggleLoading={this.props.toggleLoading} />
        </Tab>
        <Tab label="Devices" >
          <Devices toggleLoading={this.props.toggleLoading} />
        </Tab>
        <Tab label="Rooms" >
          <Rooms toggleLoading={this.props.toggleLoading} />
        </Tab>
      </Tabs>
    ) : null;
  }
}

export default withRouter(Admin);
