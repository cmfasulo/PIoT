import React, { Component } from 'react';
import UserShow from '../User/UserShow';
import UserForm from '../User/UserForm';
import DeviceShow from '../Device/DeviceShow';
import DeviceForm from '../Device/DeviceForm';
import RoomShow from '../Room/RoomShow';
import RoomForm from '../Room/RoomForm';

class Row extends Component {

  constructor(props) {
    super(props);
    this.dashboard = props.dashboard || false;
    this.state = props.obj || {};
    this.components = {
      show: {
        User: UserShow,
        Device: DeviceShow,
        Room: RoomShow
      },
      form: {
        User: UserForm,
        Device: DeviceForm,
        Room: RoomForm
      }
    };

    this.toggleEditing = this.toggleEditing.bind(this);
    this.toggleState = this.toggleState.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  toggleState(event) {
    let item = this.state;
    item.state = item.state === 'on' ? 'off' : 'on';
    this.setState(item);
    this.handleUpdate(event);
  }

  toggleEditing(event) {
    event.preventDefault();
    this.setState({ isForm: !this.state.isForm });
  }

  handleAdd(event, newItem) {
    event.preventDefault();

    Object.keys(newItem).forEach(function(key) {
      if (!newItem[key] || key === 'isForm' || key === 'isNew') {
        delete newItem[key];
      }
    });

    return this.props.addItem(newItem);
  }

  handleDelete(event) {
    event.preventDefault();
    this.props.deleteItem(this.state._id, this.state.name);
  }

  handleUpdate(event, updatedState) {
    event.preventDefault();
    let self = this;
    let item = updatedState || this.state;
    delete item.isForm;

    this.props.updateItem(item)
      .then(function(updatedItem) {
        self.setState(updatedItem);
      });
  }

  formRow() {
    let FormComponent = this.components.form[this.props.listName.slice(0, -1)];

    if (this.state.isNew) {
      return <FormComponent obj={this.state} handleAdd={this.handleAdd.bind(this)} />;
    } else {
      return <FormComponent obj={this.state} toggleEditing={this.toggleEditing.bind(this)} handleUpdate={this.handleUpdate.bind(this)} />;
    }
  }

  showRow() {
    let ShowComponent = this.components.show[this.props.listName.slice(0, -1)];

    return <ShowComponent obj={this.state} dashboard={this.dashboard} toggleState={this.toggleState.bind(this)} toggleEditing={this.toggleEditing.bind(this)} handleDelete={this.handleDelete.bind(this)} />;
  }

  render() {
    let component;
    if (this.state.isForm) {
      component = this.formRow();
    } else {
      component = this.showRow();
    }
    return component;
  }

}

export default Row;
