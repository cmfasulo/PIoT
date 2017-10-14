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

  validations(err) {
    let required = ['_id', 'name'];

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
          floatingLabelShrinkStyle={{ color: this.styles.color.primary }}
          underlineFocusStyle={{ borderColor: this.styles.color.primary }}
          floatingLabelText="ID"
          name="_id"
          type="text"
          value={this.state._id}
          style={{ width: "100%" }}
          disabled={!this.props.isNew}
          onChange={this.handleChange}
          errorText={this.state.errorMessage._id || ''}
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
          errorText={this.state.errorMessage.name || ''}
        />
      </div>
    );
  }
}

export default RoomForm;
