import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';

class Form extends Component {

  constructor(props) {
    super(props);

    this.state = {
      confirmDelete: false,
      error: false,
      errorMessage: {}
    }

    this.handleAdd = this.handleAdd.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
    this.validations = this.validations.bind(this);
  }

  handleAdd(event) {
    this.props.addItem(this.state);
  }

  handleUpdate(event) {
    this.props.updateItem(this.state)
  }

  handleChange(event) {
    let state = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
    this.validate();
  }

  validate() {
    let err = {
      error: false,
      errorMessage: {}
    };

    this.setState(this.validations(err));
  }

  validations(err) {
    return err;
  }

  formFields() {
    return (
      <div className="form-fields">
        <TextField
          hintText="Hello World!"
          floatingLabelText="This is an Input"
          name="fieldName"
          type="text"
          value=""
          errorText={this.state.errorMessage}
          onChange={this.handleChange}
        />
      </div>
    );
  }

  button1() {
    return (
      <RaisedButton
        label="Cancel"
        className="cancel"
        onClick={this.props.toggleDialog} />
    );
  }

  button2() {
    return this.props.isNew ? (
      <RaisedButton
        label="Add"
        className="update"
        disabled={this.state.error}
        onClick={this.handleAdd} />
    ) : (
      <RaisedButton
        label="Update"
        className="update"
        disabled={this.state.error}
        onClick={this.handleUpdate} />
    )
  }

  render() {
    return (
      <form>
        {this.formFields()}

        <Divider /><br />

        <div className="form-buttons">
          {this.button1()}{this.button2()}
        </div>
      </form>
    );
  }
}

export default Form;
