import React, { Component } from 'react';
import axios from '../axios';
import { Tabs, Tab } from 'react-bootstrap';

import List from './util/List';
import userList from '../props/userList';
import deviceList from '../props/deviceList';
import roomList from '../props/roomList';

class Admin extends Component {

  constructor(props) {
    super(props);
    this.state = { items: '' };
   }

   componentWillMount() {
     axios.get('/users/', { headers: { Authorization: localStorage.getItem('jwtPIoT') } })
     .then(response => {
       this.setState({ items: response.data });
     })
     .catch(function (error) {
       console.log(error);
     })
   }

  render() {
    userList.dashboard = false;
    
    return (
      <div>
        <h2>Admin</h2>
        <Tabs defaultActiveKey={1} id="admin-tabs">
          <Tab eventKey={1} title="Users"><List {...userList}></List></Tab>
          <Tab eventKey={2} title="Devices"><List {...deviceList}></List></Tab>
          <Tab eventKey={3} title="Rooms"><List {...roomList}></List></Tab>
        </Tabs>
      </div>
    );
  }
}

export default Admin;
