import React from 'react';
import Form from '../util/Form';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';

class UserForm extends Form {

  constructor(props) {
    super(props);

    Object.assign(this.state, {
      _id: props.obj && props.obj._id ? props.obj._id : '',
      firstName: props.obj && props.obj.firstName ? props.obj.firstName : '',
      lastName: props.obj && props.obj.lastName ? props.obj.lastName : '',
      username: props.obj && props.obj.username ? props.obj.username : '',
      permissions: props.obj && props.obj.permissions ? props.obj.permissions.slice() : [],
      password: '',
      passwordConfirm: ''
    });

    this.updatePermissions = this.updatePermissions.bind(this);
  }

  updatePermissions(event, isChecked) {
    let name = event.target.name;
    let permissions = this.state.permissions;

    if (isChecked && permissions.indexOf(name) === -1) {
      permissions.push(name);
    } else {
      let index = permissions.indexOf(name);
      permissions.splice(index, 1);
    }

    this.setState({ permissions: permissions });
  }

  formFields() {
    return (
      <div className="form-fields">
        <TextField
          floatingLabelShrinkStyle={{ color: this.styles.color.primary }}
          underlineFocusStyle={{ borderColor: this.styles.color.primary }}
          floatingLabelText="First Name"
          name="firstName"
          type="text"
          value={this.state.firstName}
          style={{ width: "100%" }}
          onChange={this.handleChange}
        />

        <TextField
          floatingLabelShrinkStyle={{ color: this.styles.color.primary }}
          underlineFocusStyle={{ borderColor: this.styles.color.primary }}
          floatingLabelText="Last Name"
          name="lastName"
          type="text"
          value={this.state.lastName}
          style={{ width: "100%" }}
          onChange={this.handleChange}
        />

        <TextField
          floatingLabelShrinkStyle={{ color: this.styles.color.primary }}
          underlineFocusStyle={{ borderColor: this.styles.color.primary }}
          floatingLabelText="Username"
          name="username"
          type="text"
          value={this.state.username}
          style={{ width: "100%" }}
          onChange={this.handleChange}
        />

        <div>
          <p>Permissions</p>
          {this.props.dialogExtras.rooms.map((room, i) => (
            <Checkbox
              key={i}
              name={room._id}
              label={room.name}
              iconStyle={{ fill: this.styles.color.primary }}
              style={{ width: "100%" }}
              checked={this.state.permissions.indexOf(room._id) !== -1}
              onCheck={this.updatePermissions}
            />
          ))}
        </div>
        <br />

        {this.props.isNew && (
          <TextField
            floatingLabelShrinkStyle={{ color: this.styles.color.primary }}
            underlineFocusStyle={{ borderColor: this.styles.color.primary }}
            floatingLabelText="Password"
            name="password"
            type="password"
            hintText="Enter Password"
            defaultValue=""
            style={{ width: "100%" }}
            onChange={this.handleChange}
          />
        )}

        {this.props.isNew && (
          <TextField
            floatingLabelShrinkStyle={{ color: this.styles.color.primary }}
            underlineFocusStyle={{ borderColor: this.styles.color.primary }}
            floatingLabelText="Confirm Password"
            name="passwordConfirm"
            type="password"
            hintText="Confirm Password"
            defaultValue=""
            style={{ width: "100%" }}
            onChange={this.handleChange}
          />
        )}
      </div>
    );
  }
}

export default UserForm;
