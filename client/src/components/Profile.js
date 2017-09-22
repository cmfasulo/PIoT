import React, { Component } from 'react';
import axios from '../axios';
import decode from 'jwt-decode';

import List from './util/List';
import userList from '../props/userList';

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
   }

   componentWillMount() {
     let token = localStorage.getItem('jwtPIoT');
     let id = decode(token).id;

     axios.get('/users/' + id, { headers: { Authorization: localStorage.getItem('jwtPIoT') } })
     .then(response => {
       this.setState({
         items: [response.data]
       });
     })
     .catch(function (error) {
       console.log(error);
     })
   }

  render() {
    userList.dashboard = true;
    
    return (
      <div>
        <h2>Profile</h2>
        <List {...userList} />
      </div>
    );
  }
}

export default Profile;
