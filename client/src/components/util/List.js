import React, { Component } from 'react';
import axios from '../../axios';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';
import Row from './Row';

class List extends Component {

  constructor(props) {
    super(props);
    this.listName = props.listName || '';
    this.endpoint = props.endpoint || '';
    this.headerLabels = props.headerLabels || [];
    this.fields = props.fields || {};
    this.dashboard = props.dashboard || false;
    this.state = { items: '' };
  }

  componentWillMount() {
    axios.get(this.endpoint, { headers: { Authorization: localStorage.getItem('jwtPIoT') } })
    .then(response => {
      let items = response.data && Array.isArray(response.data) ? response.data : [response.data];
      this.setState({ items: items });
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  addItem(item) {
    this.props.toggleLoading(true);
    return axios.post(this.endpoint, item, { headers: { Authorization: localStorage.getItem('jwtPIoT') } })
      .then(function(response) {
        this.setState({
          items: this.state.items.concat([response.data && response.data])
        });
        this.props.toggleLoading(false);
      }.bind(this))
      .catch(function(error) {
        this.props.toggleLoading(false);
        console.log(error);
      }.bind(this));
  }

  updateItem(item) {
    this.props.toggleLoading(true);
    return axios.put(this.endpoint+ item._id, item, { headers: { Authorization: localStorage.getItem('jwtPIoT') } })
      .then(function(response) {
        let items = this.state.items;
        let index = items.findIndex(x => x._id === response.data._id);
        items[index] = response.data;
        this.setState({ items: items });
        this.props.toggleLoading(false);
        return response.data;
      }.bind(this))
      .catch(function(error) {
        console.log(error);
        this.props.toggleLoading(false);
      }.bind(this));
  }

  deleteItem(id) {
    this.props.toggleLoading(true);
    return axios.delete(this.endpoint + id, { headers: { Authorization: localStorage.getItem('jwtPIoT') } })
      .then(function(response) {
        console.log('deleteItem response: ', response);
        if (response && response.data) {
          let items = this.state.items.filter(function(item) {
            return item._id !== response.data._id;
          });

          this.setState({ items: items });
          this.props.toggleLoading(false);
        }
      }.bind(this))
      .catch(function(err) {
        console.log(err);
        this.props.toggleLoading(false);
      }.bind(this));
  }

  pingDevice(event, deviceId) {
    event.preventDefault();
    this.props.toggleLoading(true);

    return axios.get('/devices/ping/' + deviceId, { headers: { Authorization: localStorage.getItem('jwtPIoT') } })
      .then(function(response) {
        let items = this.state.items;
        let index = items.findIndex(x => x._id === response.data._id);
        items[index] = response.data;
        this.setState({ items: items });
        this.props.toggleLoading(false);
        return response.data;
      }.bind(this))
      .catch(function (error) {
        console.log(error);
        this.props.toggleLoading(false);
      }.bind(this))
  }

  headerRow() {
    if (this.headerLabels instanceof Array) {
      return this.headerLabels.map(function(object, i) {
        return <TableHeaderColumn key={i}>{object}</TableHeaderColumn>;
      });
    }
  }

  dataRow() {
    if (this.state.items instanceof Array) {
      return this.state.items.map(function(object, i) {
        object.isForm = false;
        return <Row listName={this.listName} dashboard={this.dashboard} obj={object} key={i} deleteItem={this.deleteItem.bind(this)} updateItem={this.updateItem.bind(this)} pingDevice={this.pingDevice.bind(this)} />;
      }.bind(this));
    }
  }

  newRow() {
    let formState = this.fields;
    formState.isNew = true;
    formState.isForm = true;
    return <Row listName={this.listName} obj={formState} dashboard={this.dashboard} addItem={this.addItem.bind(this)} />;
  }

  render() {
    return (
      <Table style={{ width: "100%", overflow: "auto" }}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
          <TableRow>
            {this.headerRow()}
          </TableRow>
        </TableHeader>
        <TableBody showRowHover={true} stripedRows={true} >
          {this.dataRow()}
        </TableBody>
      </Table>
    );
  }
}

export default List;
