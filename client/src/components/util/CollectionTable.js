import React, { Component } from 'react';
import { Table, TableHeader, TableHeaderColumn, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/delete-sweep';
import Divider from 'material-ui/Divider';
import axios from '../../axios';

const styles = {
  color: {
    primary: "#2196f4",
    white: "#ffffff",
    black: "#000000",
    update: "#22cb00",
    cancel: "#ff0000"
  }
};

class CollectionTable extends Component {

  constructor(props) {
    super(props);
    this.title = '';
    this.endpoint = '';
    this.headerLabels = [];
    this.dialog = true;
    this.addIcon = true;

    this.state = {
      isNew: false,
      dialog: false,
      dialogExtras: {},
      confirmDelete: false,
      items: ''
    };

    this.toggleDialog = this.toggleDialog.bind(this);
    this.new = this.new.bind(this);
    this.edit = this.edit.bind(this);
    this.del = this.del.bind(this);
    this.addItem = this.addItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.dataRow = this.dataRow.bind(this);
    this.headerRow = this.headerRow.bind(this);
    this.dialogTitle = this.dialogTitle.bind(this);
    this.confirmDeleteActions = this.confirmDeleteActions.bind(this);
    this.toggleConfirmDelete = this.toggleConfirmDelete.bind(this);
  }

  componentWillMount() {
    axios.get(this.endpoint, { headers: { Authorization: localStorage.getItem('jwtPIoT') } })
      .then(response => {
        response.data && this.setState({ items: response.data });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  toggleDialog() {
    this.setState({ dialog: !this.state.dialog });
  }

  new() {
    this.setState({ isNew: true, dialogItem: {} });
    this.toggleDialog();
  }

  edit(index) {
    let item = this.state.items[index];

    this.setState({ isNew: false, dialogItem: item });
    this.toggleDialog();
  }

  del() {
    this.deleteItem(this.state.dialogItem && this.state.dialogItem._id);
  }

  addItem(item) {
    this.props.toggleLoading(true);
    !item._id.length && delete item._id;

    axios.post(this.endpoint, item, { headers: { Authorization: localStorage.getItem('jwtPIoT') } })
      .then(function(response) {
        this.setState({ items: this.state.items.concat([response.data && response.data]) });
        this.props.toggleLoading(false);
        this.toggleDialog();
      }.bind(this))
      .catch(function(error) {
        this.props.toggleLoading(false);
        this.toggleDialog();
        console.log(error);
      }.bind(this));
  }

  updateItem(item) {
    this.props.toggleLoading(true);

    Object.keys(item).forEach((key) => {
      if (!item[key] && typeof item[key] !== 'boolean') {
        delete item[key];
      }
    });

    axios.put(this.endpoint + item._id, item, { headers: { Authorization: localStorage.getItem('jwtPIoT') } })
      .then(function(response) {
        let items = this.state.items;
        let index = items.findIndex(x => x._id === response.data._id);
        items[index] = response.data;
        this.setState({ items: items });
        this.props.toggleLoading(false);
        this.toggleDialog();
      }.bind(this))
      .catch(function(error) {
        console.log(error);
        this.props.toggleLoading(false);
        this.toggleDialog();
      }.bind(this));
  }

  deleteItem(id) {
    this.props.toggleLoading(true);

    axios.delete(this.endpoint + id, { headers: { Authorization: localStorage.getItem('jwtPIoT') } })
      .then(function(response) {
        if (response && response.data) {
          let items = this.state.items.filter(function(item) {
            return item._id !== response.data._id;
          });

          this.setState({ items: items });
          this.props.toggleLoading(false);
          this.toggleConfirmDelete();
          this.toggleDialog();
        }
      }.bind(this))
      .catch(function(err) {
        console.log(err);
        this.props.toggleLoading(false);
        this.toggleConfirmDelete();
        this.toggleDialog();
      }.bind(this));
  }

  headerRow() {
    return (
      <TableRow>
        if (this.headerLabels instanceof Array) {
          this.headerLabels.map((label, i) => {
            return <TableHeaderColumn key={i}>{label}</TableHeaderColumn>;
          })
        }
      </TableRow>
    );
  }

  dataRow() {
    if (this.state.items instanceof Array) {
      return this.state.items.map((object, i) => {
        return (
          <TableRow key={i}>
            <TableRowColumn>{object._id}</TableRowColumn>
          </TableRow>
        );
      });
    }
  }

  dialogTitle(title) {
    return (
      <h3 style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ flex: "2 0 auto", margin: "0 auto" }}>
          {title}
        </p>

        {!this.state.isNew && (
          <FloatingActionButton
            mini={true}
            backgroundColor={styles.color.cancel}
            style={{ flex: "0 0 auto" }}
            onClick={this.toggleConfirmDelete}
          >
            <ContentRemove />
          </FloatingActionButton>
        )}
      </h3>
    );
  }

  confirmDeleteActions() {
    const actions = [
      <FlatButton
        label="Cancel"
        labelStyle={{ color: styles.color.black }}
        primary={true}
        onClick={this.toggleConfirmDelete}
      />,
      <FlatButton
        label="Delete"
        labelStyle={{ color: styles.color.cancel }}
        primary={true}
        onClick={this.del}
      />,
    ];

    return actions;
  }

  toggleConfirmDelete() {
    this.setState({ confirmDelete: !this.state.confirmDelete });
  }

  render() {
    let type = this.endpoint.substring(1, this.endpoint.length - 2).toUpperCase();
    let title = this.state.dialogItem && this.state.dialogItem[this.dialogTitleField];
    let formTitle = title ? title : 'New: ' + type;

    let confirmDeleteTitle = "Are you sure you want to delete ";
    confirmDeleteTitle += title ? "'" + title + "' ?" : "this item?";

    let deleteActions = this.confirmDeleteActions();

    return (
      <div>
        {this.title && (<h2>{this.title}</h2>)}
        <Table onRowSelection={this.edit}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            {this.headerRow()}
          </TableHeader>
          <TableBody displayRowCheckbox={false} showRowHover={true}>
            {this.dataRow()}
          </TableBody>
        </Table>

        <Divider />

        {this.addIcon && (
          <div style={{ display: "flex", justifyContent: "space-evenly", marginTop: "10px" }}>
            <FloatingActionButton
              mini={true}
              backgroundColor={styles.color.primary}
              onClick={this.new}
            >
              <ContentAdd />
            </FloatingActionButton>
          </div>
        )}

        {this.dialog && (
          <Dialog
            title={this.dialogTitle(formTitle)}
            modal={true}
            open={this.state.dialog || false}
            autoScrollBodyContent={true}
          >
            <div>
            {this.form && (
              <this.form
                obj={this.state.dialogItem}
                dialogExtras={this.state.dialogExtras}
                isNew={this.state.isNew}
                toggleDialog={this.toggleDialog}
                addItem={this.addItem}
                updateItem={this.updateItem}
                deleteItem={this.deleteItem}
              />
            )}
            </div>
            <Dialog
              title={confirmDeleteTitle}
              modal={true}
              open={this.state.confirmDelete || false}
              actions={deleteActions}
              autoScrollBodyContent={true}
            />
          </Dialog>
        )}
      </div>
    );
  }
}

export default CollectionTable;
