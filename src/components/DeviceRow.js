import React, { Component } from 'react';
// import {Link} from 'react-router-dom';

// TODO: make this a generic component class for any list
class DeviceRow extends Component {

  constructor(props) {
      super(props);
      this.state = {
        isEditing: false,
        _id: this.props.obj._id,
        name: this.props.obj.name,
        type: this.props.obj.type,
        location: this.props.obj.location,
        localIp: this.props.obj.localIp
      }
      this.toggleEditing = this.toggleEditing.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
      this.handleUpdate = this.handleUpdate.bind(this);
      this.handleChange = this.handleChange.bind(this);
  }

  toggleEditing(event) {
    event.preventDefault();
    this.setState({ isEditing: !this.state.isEditing })
    this.render()
  }
  handleDelete(event) {
    event.preventDefault();
    this.props.deleteDevice(this.props.obj._id, this.props.obj.name);
  }
  handleUpdate(event) {
    event.preventDefault();
    let device = this.state;
    delete device.isEditing;
    this.props.updateDevice(device);
  }
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  // TODO: make each tr render options own sub-components
  render() {
    if (this.state.isEditing) {
      return (
        <tr>
          <td>{this.props.obj._id}</td>
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
          <td>{this.props.obj.status}</td>
          <td>{this.props.obj.state}</td>
          <td>{this.props.obj.lastStatusUpdate}</td>
          <td>{this.props.obj.lastStateChange}</td>
          <td>
            <form onSubmit={this.handleUpdate}>
              <input type="submit" value="Update" className="btn btn-success"/>
            </form>
          </td>
          <td>
            <form onSubmit={this.toggleEditing}>
              <input type="submit" value="Cancel" className="btn btn-warning"/>
            </form>
          </td>
        </tr>
      )
    } else {
      return (
        <tr>
          <td>{this.props.obj._id}</td>
          <td>{this.props.obj.name}</td>
          <td>{this.props.obj.type}</td>
          <td>{this.props.obj.location}</td>
          <td>{this.props.obj.localIp}</td>
          <td>{this.props.obj.status}</td>
          <td>{this.props.obj.state}</td>
          <td>{this.props.obj.lastStatusUpdate}</td>
          <td>{this.props.obj.lastStateChange}</td>
          <td>
            <form onSubmit={this.toggleEditing}>
              <input type="submit" value="Edit" className="btn btn-primary"/>
            </form>
          </td>
          <td>
            <form onSubmit={this.handleDelete}>
              <input type="submit" value="Delete" className="btn btn-danger"/>
            </form>
          </td>
        </tr>
      )
    }
  }
}

export default DeviceRow;
