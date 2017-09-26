import React, { Component } from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import axios from '../../axios';

class UserForm extends Component {

  constructor(props) {
    super(props);
    props.obj.rooms = [];
    props.obj.passwordConfirm = '';
    this.state = props.obj || {};

    this.updatePermissions = this.updatePermissions.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    axios.get('/rooms/', { headers: { Authorization: localStorage.getItem('jwtPIoT') } })
      .then(function(response) {
        this.setState({ rooms: response.data });
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });
  }

  updatePermissions(event) {
    let target = event.target;
    let state = this.state;

    if (target.value === 'on' && state.permissions.indexOf(target.name) === -1) {
      state.permissions.push(target.name);
    } else {
      let index = state.permissions.indexOf(target.name);
      state.permissions.splice(index, 1);
    }

    this.setState(state);
  }

  button1() {
    if (this.state.isNew) {
      return '';
    } else {
      return (
        <RaisedButton
          label="Cancel"
          labelColor={"#ffffff"}
          backgroundColor={"#ffbf00"}
          style={{ margin: "5px auto" }}
          onClick={this.props.toggleEditing} />
      )
    }
  }

  button2() {
    if (this.state.isNew) {
      return (
        <RaisedButton
          label="Add"
          labelColor={"#ffffff"}
          backgroundColor={"#22cb00"}
          style={{ margin: "5px auto" }}
          onClick={this.handleAdd} />
      )
    } else {
      return (
        <RaisedButton
          label="Update"
          labelColor={"#ffffff"}
          backgroundColor={"#22cb00"}
          style={{ margin: "5px auto" }}
          onClick={(event) => this.props.handleUpdate(event, this.state)} />
      )
    }
  }

  handleAdd(event) {
    if (this.state.password === this.state.passwordConfirm) {
      let newItem = this.state;
      newItem.permissions = newItem.permissions || [];

      this.props.handleAdd(event, newItem)
        .then(function() {
          this.setState(this.props.obj);
        }.bind(this));
    } else {
      event.prevenTableRowColumnefault();
      alert('Invalid: Passwords do not match.');
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <TableRow>
        <TableRowColumn><input type="text" name="firstName" placeholder="First Name" value={this.state.firstName} onChange={this.handleChange} required/></TableRowColumn>
        <TableRowColumn><input type="text" name="lastName" placeholder="Last Name" value={this.state.lastName} onChange={this.handleChange} required/></TableRowColumn>
        <TableRowColumn><input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange} required/></TableRowColumn>
        <TableRowColumn>
        {!this.props.dashboard ? (
            <ul className="room-list">
            {this.state.rooms.map((room, i) => (
              <li key={i}>
                <input type="checkbox" name={room._id} checked={this.state.permissions.indexOf(room._id) !== -1} onChange={this.updatePermissions}/> {room.name}
              </li>
            ))}
            </ul>
          ) : (
            <p>{this.props.obj.permissions.length ? this.props.obj.permissions.join(', ') : 'None'}</p>
          )}
        </TableRowColumn>
        <TableRowColumn>{this.button1()}<br />{this.button2()}</TableRowColumn>
      </TableRow>
    )
  }
}

export default UserForm;
