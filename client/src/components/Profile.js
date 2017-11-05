import React, { Component } from 'react';
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from '../axios';
import decode from 'jwt-decode';

class Profile extends Component {

  constructor(props) {
    super(props);

    let token = localStorage.getItem('jwtPIoT');
    this.userId = token && decode(token).id;
    this.state = {
      isEditing: false,
      error: false,
      errorMessage: {},
      passwordOld: '',
      password: '',
      passwordConfirm: ''
    };

    this.toggleEditing = this.toggleEditing.bind(this);
    this.edit = this.edit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.validate = this.validate.bind(this);
  }

  componentWillMount() {
    axios.get('/users/' + this.userId, { headers: { Authorization: localStorage.getItem('jwtPIoT') } })
      .then(response => {
        response.data && this.setState(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  toggleEditing(event) {
    event && event.preventDefault();
    this.editedState = this.state;
    this.setState({ isEditing: !this.state.isEditing, error: false, errorMessage: {} });
  }

  handleChange(event) {
    this.editedState[event.target.name] = event.target.value;
    this.setState(this.validate());
  }

  handleUpdate(event) {
    let updated = this.editedState;
    delete updated.isEditing;
    delete updated.error;
    delete updated.errorMessage;

    if (!updated.password) {
      delete updated.passwordOld;
      delete updated.password;
      delete updated.passwordConfirm;
    }

    this.props.toggleLoading(true);

    let reqOptions = {
      headers: { Authorization: localStorage.getItem('jwtPIoT') },
      validateStatus: (status) => {
        return (status >= 200 && status < 300) || status === 400;
      }
    }

    axios.put('/users/' + this.userId, updated, reqOptions)
      .then(function(response) {
        if (response && response.data) {
          if (response.data.errors) {
            let messages = {};

            response.data.errors.forEach((error) => {
              messages[error.field] = error.message;
            });

            this.setState({ error: true, errorMessage: messages })
          } else {
            this.setState(response.data);
            this.toggleEditing(null);
          }

          this.props.toggleLoading(false);
        }
      }.bind(this))
      .catch(function(error) {
        console.log(error);
        this.props.toggleLoading(false);
      }.bind(this));
  }

  validate() {
    let result = {
      error: false,
      errorMessage: {}
    };

    if (this.editedState.password || this.editedState.passwordConfirm) {
      if (!this.editedState.passwordOld) {
        result.error = true;
        result.errorMessage.passwordOld = 'Old password is required to set a new one.';
        return result;
      }

      if (this.editedState.passwordOld === this.editedState.password) {
        result.error = true;
        result.errorMessage.password = 'New password cannot be the same as the old one.';
        return result;
      }

      if (this.editedState.password !== this.editedState.passwordConfirm) {
        result.error = true;
        result.errorMessage.passwordConfirm = 'Passwords do not match.';
        return result;
      }
    }

    return result;
  }

  edit(field, type) {
    return (
      <TextField
        name={field}
        type={type || "text"}
        defaultValue={this.state[field]}
        onChange={this.handleChange}
        errorText={this.state.errorMessage[field] || ''}
      />
    )
  }

  buttonRow(editing) {
    return editing ? (
      <div>
        <RaisedButton
          label="Cancel"
          className="cancel"
          onClick={this.toggleEditing} />
        <RaisedButton
          label="Update"
          className="update"
          disabled={this.state.error}
          onClick={this.handleUpdate} />
      </div>
    ) : (
      <div>
        <RaisedButton
          label="Edit"
          className="submit"
          onClick={this.toggleEditing} />
      </div>
    )
  }

  render() {
    return (
      <div>
        <h2>Profile</h2>
        <Table className="table-left">
          <TableBody displayRowCheckbox={false}>
            <TableRow>
              <TableRowColumn>First Name: </TableRowColumn>
              <TableRowColumn>
                {this.state.isEditing ? this.edit('firstName') : this.state.firstName}
              </TableRowColumn>
            </TableRow>

            <TableRow>
              <TableRowColumn>Last Name: </TableRowColumn>
              <TableRowColumn>
                {this.state.isEditing ? this.edit('lastName') : this.state.lastName}
              </TableRowColumn>
            </TableRow>

            <TableRow>
              <TableRowColumn>Username: </TableRowColumn>
              <TableRowColumn>
                {this.state.isEditing ? this.edit('username') : this.state.username}
              </TableRowColumn>
            </TableRow>

          {this.state.isEditing && (
            <TableRow>
              <TableRowColumn>Old Password: </TableRowColumn>
              <TableRowColumn>
                {this.edit('passwordOld', 'password')}
              </TableRowColumn>
            </TableRow>
          )}

          {this.state.isEditing && (
            <TableRow>
              <TableRowColumn>New Password: </TableRowColumn>
              <TableRowColumn>
                {this.edit('password', 'password')}
              </TableRowColumn>
            </TableRow>
          )}

          {this.state.isEditing && (
            <TableRow>
              <TableRowColumn>Confirm New Password: </TableRowColumn>
              <TableRowColumn>
                {this.edit('passwordConfirm', 'password')}
              </TableRowColumn>
            </TableRow>
          )}
          </TableBody>
        </Table>

        <div className="buttonRow">
          {this.buttonRow(this.state.isEditing)}
        </div>
      </div>
    );
  }
}

export default Profile;
