import React, { Component } from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';

class RoomForm extends Component {

  constructor(props) {
    super(props);
    props.obj._id = props.obj._id || '';
    this.state = props.obj || {};

    this.handleAdd = this.handleAdd.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
      <TableRow>
        {this.state.isNew ? (
          <TableRowColumn>
            <input type="text" name="_id" placeholder="ID" value={this.state._id} onChange={this.handleChange} required/>
          </TableRowColumn>
        ) : (
          <TableRowColumn>{this.props.obj._id}</TableRowColumn>
        )}
        <TableRowColumn>
          <input type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.handleChange} required/>
        </TableRowColumn>
        <TableRowColumn>{this.button1()}<br />{this.button2()}</TableRowColumn>
      </TableRow>
    )
  }
}

export default RoomForm;
