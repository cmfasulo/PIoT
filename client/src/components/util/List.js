import React, { Component } from 'react';
import axios from '../../axios';
import { Table } from 'react-bootstrap';
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
      this.setState({ items: response.data });
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  addItem(item) {
    let self = this;
    return axios.post(this.endpoint, item, { headers: { Authorization: localStorage.getItem('jwtPIoT') } })
      .then(function(response) {
        self.setState({
          items: self.state.items.concat([response.data])
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  updateItem(item) {
    let self = this;
    return axios.put(this.endpoint+ item._id, item, { headers: { Authorization: localStorage.getItem('jwtPIoT') } })
      .then(function(response) {
        let items = self.state.items;
        let index = items.findIndex(x => x._id === response.data._id);
        items[index] = response.data;
        self.setState({ items: items });
        return response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  deleteItem(id) {
    let self = this;
    return axios.delete(this.endpoint + id, { headers: { Authorization: localStorage.getItem('jwtPIoT') } })
      .then(function(response) {
        let items = self.state.items.filter(function(item) {
          return item._id !== response.data._id;
        });

        self.setState({ items: items });
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  headerRow() {
    if(this.headerLabels instanceof Array){
      return this.headerLabels.map(function(object, i){
        return <td key={i}>{object}</td>;
      });
    }
  }

  dataRow() {
    let self = this;
    if(this.state.items instanceof Array){
      return this.state.items.map(function(object, i){
        object.isForm = false;
        return <Row listName={self.listName} dashboard={self.dashboard} obj={object} key={i} deleteItem={self.deleteItem.bind(self)} updateItem={self.updateItem.bind(self)} />;
      });
    }
  }

  newRow() {
    let formState = this.fields;
    formState.isNew = true;
    formState.isForm = true;
    return <Row listName={this.listName} obj={formState} addItem={this.addItem.bind(this)} />;
  }

  render() {
    return (
      <div className="container">
        <h3>{this.listName}</h3>
        <Table striped condensed hover className={this.listName}>
          <thead>
            <tr>
              {this.headerRow()}
            </tr>
          </thead>
          <tbody>
            {this.dataRow()}
            {!this.dashboard && this.newRow()}
          </tbody>
        </Table>
        <hr/>
      </div>
    );
  }
}

export default List;
