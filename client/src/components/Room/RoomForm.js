import React, { Component } from 'react';

class RoomForm extends Component {

  constructor(props) {
    super(props);
    this.state = props.obj || {};

    this.handleAdd = this.handleAdd.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

    this.props.handleAdd(event, newItem)
      .then(function() {
        this.setState(this.props.obj);
      }.bind(this));
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
      <tr>
        <td>{this.props.obj._id}</td>
        <td><input type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.handleChange} required/></td>
        <td>{this.button1()}</td>
        <td>{this.button2()}</td>
      </tr>
    )
  }
}

export default RoomForm;
