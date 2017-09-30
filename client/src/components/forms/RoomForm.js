import React from 'react';
import Form from '../util/Form';
import TextField from 'material-ui/TextField';

class RoomForm extends Form {

  constructor(props) {
    super(props);

    Object.assign(this.state, {
      _id: props.obj && props.obj._id ? props.obj._id : '',
      name: props.obj && props.obj.name ? props.obj.name : ''
    });
  }

  formFields() {
    return (
      <div className="form-fields">
        <TextField
          floatingLabelShrinkStyle={{ color: this.styles.color.primary }}
          underlineFocusStyle={{ borderColor: this.styles.color.primary }}
          floatingLabelText="ID"
          name="_id"
          type="text"
          value={this.state._id}
          style={{ width: "100%" }}
          disabled={!this.props.isNew}
          onChange={this.handleChange}
        />

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
      </div>
    );
  }
}

export default RoomForm;
