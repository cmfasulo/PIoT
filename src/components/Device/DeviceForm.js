import React, { Component } from 'react';

class DeviceEdit extends Component {

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
        <form onSubmit={(event) => this.props.handleUpdate(event, this.state)}>
          <input type="submit" value="Update" className="btn btn-success"/>
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
        <form onSubmit={this.props.toggleEditing}>
          <input type="submit" value="Cancel" className="btn btn-warning"/>
        </form>
      )
    }
  }

  handleAdd(event) {
    let newItem = this.state;
    let self = this;
    newItem.type = newItem.type || 'switch';
    newItem.location = newItem.location || 'living-room';
    this.props.handleAdd(event, newItem)
      .then(function() {
        self.setState(self.props.obj);
      });
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
        <td><input type="text" name="name" value={this.state.name} onChange={this.handleChange} required/></td>
        <td>
          <select name="type" value={this.state.type} onChange={this.handleChange} required>
            <option value='switch'>Switch</option>
            <option value='sensor'>Sensor</option>
          </select>
        </td>
        <td>
          <select name="location" value={this.state.location} onChange={this.handleChange} required>
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
        </td>
        <td><input type="text" name="localIp" value={this.state.localIp} onChange={this.handleChange} required/></td>
        <td className={this.props.obj.status}>{this.props.obj.status.toUpperCase()}</td>
        <td>{this.props.obj.state && this.props.obj.state.toUpperCase()}</td>
        <td>{this.props.obj.stalastStatusUpdatete && this.props.obj.lastStatusUpdate}</td>
        <td>{this.props.obj.lastStateChange && this.props.obj.lastStateChange}</td>
        <td>{this.button1()}</td>
        <td>{this.button2()}</td>
      </tr>
    )
  }
}

export default DeviceEdit;
