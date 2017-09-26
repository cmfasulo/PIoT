import React, { Component } from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';

class DeviceForm extends Component {

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
    newItem.type = newItem.type || 'switch';
    newItem.location = newItem.location || 'living-room';
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
        <TableRowColumn><input type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.handleChange} required/></TableRowColumn>
        <TableRowColumn>
          <select name="type" value={this.state.type} onChange={this.handleChange} required>
            <option value='switch'>Switch</option>
            <option value='sensor'>Sensor</option>
          </select>
        </TableRowColumn>
        <TableRowColumn>
          <select name="location" value={this.state.location._id} onChange={this.handleChange} required>
            <option value='living-room'>Living Room</option>
            <option value='kitchen'>Kitchen</option>
            <option value='foyer'>Foyer</option>
            <option value='garage'>Garage</option>
            <option value='main-bathroom'>Main Bathroom</option>
            <option value='chris-room'>Chris&#39;s Bedroom</option>
            <option value='matt-room'>Matt&#39;s Bedroom</option>
            <option value='kevin-room'>Kevin&#39;s Bedroom</option>
            <option value='kevin-bathroom'>Kevin&#39;s Bathroom</option>
          </select>
        </TableRowColumn>
        <TableRowColumn><input type="text" name="localIp" placeholder="Local IP" value={this.state.localIp} onChange={this.handleChange} required/></TableRowColumn>
        <TableRowColumn className={this.props.obj.status}>{this.props.obj.status.toUpperCase()}</TableRowColumn>
        <TableRowColumn>{this.props.obj.state && this.props.obj.state.toUpperCase()}</TableRowColumn>
        <TableRowColumn>{this.button1()}<br />{this.button2()}</TableRowColumn>
      </TableRow>
    )
  }
}

export default DeviceForm;
