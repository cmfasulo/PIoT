import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {Tabs, Tab} from 'material-ui/Tabs';
import decode from 'jwt-decode';

import List from './util/List';
import userList from '../props/userList';
import deviceList from '../props/deviceList';
import roomList from '../props/roomList';

const styles = {
  color: {
    primary: "#2196f4",
    black: "#000000",
    white: "#ffffff"
  }
};

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
    userList.dashboard = false;

    return this.state.admin ? (
      <Tabs
        inkBarStyle={{ background: styles.color.black }}
        tabItemContainerStyle={{ backgroundColor: styles.color.primary}}
      >
        <Tab label="Users" >
          <List {...userList} toggleLoading={this.props.toggleLoading}></List>
        </Tab>
        <Tab label="Devices" >
          <List {...deviceList} toggleLoading={this.props.toggleLoading}></List>
        </Tab>
        <Tab label="Rooms" >
          <List {...roomList} toggleLoading={this.props.toggleLoading}></List>
        </Tab>
      </Tabs>
    ) : null;
  }
}

export default withRouter(Admin);
