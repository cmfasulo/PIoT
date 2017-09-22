import React, { Component } from 'react';
import axios from '../../axios';

class UserForm extends Component {

  constructor(props) {
    super(props);
    this.state = props.obj || {};
    this.rooms = [];

    this.updatePermissions = this.updatePermissions.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    axios.get('/rooms/', { headers: { Authorization: localStorage.getItem('jwtPIoT') } })
      .then(response => {
        this.rooms = response.data;
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  updatePermissions(event) {
    console.log('permissions event: ', event);
  }

  button1() {
    if (this.state.isNew) {
      return '';
    } else {
      return (
        <form onSubmit={this.props.toggleEditing}>
          <input type="submit" value="Cancel" className="btn btn-warning"/>
        </form>
      )
    }
  }

  button2() {
    if (this.state.isNew) {
      return (
        <form onSubmit={this.handleAdd}>
          <input type="submit" value="Add" className="btn btn-success"/>
        </form>
      )
    } else {
      return (
        <form onSubmit={(event) => this.props.handleUpdate(event, this.state)}>
          <input type="submit" value="Update" className="btn btn-success"/>
        </form>
      )
    }
  }

  handleAdd(event) {
    let newItem = this.state;
    newItem.permissions = newItem.permissions || [];

    this.props.handleAdd(event, newItem)
      .then(function() {
        this.setState(this.props.obj);
      }.bind(this));
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log('handleChange event: ', event);

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <tr>
        <td><input type="text" name="firstName" placeholder="First Name" value={this.state.firstName} onChange={this.handleChange} required/></td>
        <td><input type="text" name="lastName" placeholder="Last Name" value={this.state.lastName} onChange={this.handleChange} required/></td>
        <td><input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange} required/></td>
        <td>
        { this.rooms.length ? (
          <ul>
          {this.rooms.map((room, i) => (
            <li key={i}>
            <input type="checkbox" value={room.id} onChange={this.updatePermissions}/>{room.name}
            </li>
          )).bind(this)}
          </ul>
        ) : (
          <p>No rooms founds.</p>
        )}
        </td>
        <td><input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required/></td>
        <td><input type="password" name="passwordConfirm" placeholder="Confirm Password" value={this.state.passwordConfirm} onChange={this.handleChange} required/></td>
        <td>{this.button1()}</td>
        <td>{this.button2()}</td>
      </tr>
    )
  }
}

export default UserForm;
