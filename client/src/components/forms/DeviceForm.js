import React from 'react';
import Form from '../util/Form';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class DeviceForm extends Form {

  constructor(props) {
    super(props);

    Object.assign(this.state, {
      _id: props.obj && props.obj._id ? props.obj._id : '',
      name: props.obj && props.obj.name ? props.obj.name : '',
      type: props.obj && props.obj.type ? props.obj.type : 'switch',
      location: props.obj && props.obj.location ? props.obj.location._id : 'living-room',
      localIp: props.obj && props.obj.localIp ? props.obj.localIp : ''
    });
  }

  handleSelect(event, payload, field) {
    this.setState({ [field]: payload });
  }

  validations(err) {
    let required = ['name', 'type', 'localIp', 'location'];

    required.forEach((field) => {
      if (!this.state[field]) {
        err.error = true;
        err.errorMessage[field] = 'This field is required.';
      }
    });

    return err;
  }

  formFields() {
    return (
      <div className="form-fields">
        <TextField
          floatingLabelText="Name"
          name="name"
          type="text"
          value={this.state.name}
          onChange={this.handleChange}
          errorText={this.state.errorMessage.name || ''}
        />

        <SelectField
          floatingLabelText="Type"
          name="type"
          value={this.state.type}
          selectedMenuItemStyle={{ color: "#2196f4" }}
          onChange={(event, key, payload) => {this.handleSelect(event, payload, 'type')}}
          errorText={this.state.errorMessage.type || ''}
        >
          <MenuItem value={"switch"} primaryText="Switch" />
          <MenuItem value={"sensor"} primaryText="Sensor" />
        </SelectField>

        <SelectField
          floatingLabelText="Location"
          name="location"
          value={this.state.location}
          selectedMenuItemStyle={{ color: "#2196f4" }}
          onChange={(event, key, payload) => {this.handleSelect(event, payload, 'location')}}
          errorText={this.state.errorMessage.location || ''}
        >
          {this.props.dialogExtras.rooms.map((room, i) => (
            <MenuItem key={i} value={room._id} primaryText={room.name} />
          ))}
        </SelectField>

        <TextField
          floatingLabelText="Local IP"
          name="localIp"
          type="text"
          value={this.state.localIp}
          onChange={this.handleChange}
          errorText={this.state.errorMessage.localIp || ''}
        />
      </div>
    );
  }
}

export default DeviceForm;
