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

  formFields() {
    return (
      <div className="form-fields">
        <TextField
          floatingLabelShrinkStyle={{ color: this.styles.color.primary }}
          underlineFocusStyle={{ borderColor: this.styles.color.primary }}
          floatingLabelText="Name"
          name="name"
          type="text"
          value={this.state.name}
          style={{ width: "100%" }}
          onChange={this.handleChange}
        />

        <SelectField
          floatingLabelText="Type"
          floatingLabelStyle={{ color: this.styles.color.primary }}
          name="type"
          value={this.state.type}
          style={{ width: "100%" }}
          selectedMenuItemStyle={{ color: this.styles.color.primary }}
          onChange={(event, key, payload) => {this.handleSelect(event, payload, 'type')}}
        >
          <MenuItem value={"switch"} primaryText="Switch" />
          <MenuItem value={"sensor"} primaryText="Sensor" />
        </SelectField>

        <SelectField
          floatingLabelText="Location"
          floatingLabelStyle={{ color: this.styles.color.primary }}
          name="location"
          value={this.state.location}
          style={{ width: "100%" }}
          selectedMenuItemStyle={{ color: this.styles.color.primary }}
          onChange={(event, key, payload) => {this.handleSelect(event, payload, 'location')}}
        >
          {this.props.dialogExtras.rooms.map((room, i) => (
            <MenuItem key={i} value={room._id} primaryText={room.name} />
          ))}
        </SelectField>

        <TextField
          floatingLabelShrinkStyle={{ color: this.styles.color.primary }}
          underlineFocusStyle={{ borderColor: this.styles.color.primary }}
          floatingLabelText="Local IP"
          name="localIp"
          type="text"
          value={this.state.localIp}
          style={{ width: "100%" }}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default DeviceForm;
