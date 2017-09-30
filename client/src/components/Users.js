import React from 'react';
import CollectionTable from './util/CollectionTable';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import UserForm from './forms/UserForm';
import axios from '../axios';

class Users extends CollectionTable {

  constructor(props) {
    super(props);
    this.endpoint = '/users/';
    this.headerLabels = ['First Name', 'Last Name', 'Username', 'Permissions'];
    this.form = UserForm;
    this.dialogTitleField = 'username';

    this.dataRow = this.dataRow.bind(this);
  }

  componentDidMount() {
    axios.get('/rooms/', { headers: { Authorization: localStorage.getItem('jwtPIoT') } })
      .then(function(response) {
        let extras = this.state.dialogExtras;
        extras.rooms = response.data;
        this.setState({ dialogExtras: extras });
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });
  }

  dataRow() {
    if (this.state.items instanceof Array) {
      return this.state.items.map((object, i) => {
        return (
          <TableRow key={i}>
            <TableRowColumn>{object.firstName}</TableRowColumn>
            <TableRowColumn>{object.lastName}</TableRowColumn>
            <TableRowColumn>{object.username}</TableRowColumn>
            <TableRowColumn>{object.permissions.length && object.permissions.join(', ')}</TableRowColumn>
          </TableRow>
        );
      });
    }
  }
}

export default Users;
