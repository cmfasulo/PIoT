import React, { Component } from 'react';

class AddDevice extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      type: 'switch',
      location: 'living-room',
      localIp: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addDevice(this.state);
    this.setState({
      name: '',
      type: '',
      location: '',
      localIp: ''
    });
  }

  render() {
    return (
      <div className="container">
        <h3>Add New Device</h3>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={this.state.name} placeholder='Device Name' onChange={this.handleChange} className="form-control" required/>
          </label>
          <label>
            Type:
            <select name="type" value={this.state.type} onChange={this.handleChange} className="form-control" required>
              <option value='switch'>Switch</option>
              <option value='sensor'>Sensor</option>
            </select>
          </label>
          <label>
            Location:
            <select name="location" value={this.state.location} onChange={this.handleChange} className="form-control" required>
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
          </label>
          <label>
            Local IP Address:
            <input type="text" name="localIp" value={this.state.localIp} placeholder='Local IP Address' onChange={this.handleChange} className="form-control"/>
          </label>
          <input type="submit" value="Submit" className="btn btn-primary"/>
        </form>
    </div>
    );
  }
}

export default AddDevice;
