import React from 'react';
import CollectionTable from './util/CollectionTable';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import DeviceForm from './forms/DeviceForm'
import axios from '../axios';

class Devices extends CollectionTable {

  constructor(props) {
    super(props);
    this.endpoint = '/devices/';
    this.headerLabels = ['Name', 'Type', 'Location', 'Local IP', 'Status', 'State'];
    this.form = DeviceForm;
    this.dialogTitleField = 'name';

    this.dataRow = this.dataRow.bind(this);
  }

  componentDidMount() {
    axios.get('/rooms/', { headers: { Authorization: localStorage.getItem('jwtPIoT') } })
      .then(function(response) {
        let extras = this.state.dialogExtras;
        extras.rooms = response.data;
        this.setState({ dialogExtras: extras });
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });
  }

  dataRow() {
    if (this.state.items instanceof Array) {
      return this.state.items.map((object, i) => {
        return (
          <TableRow key={i}>
            <TableRowColumn>{object.name}</TableRowColumn>
            <TableRowColumn>{object.type}</TableRowColumn>
            <TableRowColumn>{object.location.name}</TableRowColumn>
            <TableRowColumn>{object.localIp}</TableRowColumn>
            <TableRowColumn className={object.status}>{object.status.toUpperCase()}</TableRowColumn>
            <TableRowColumn>{object.state}</TableRowColumn>
          </TableRow>
        );
      });
    }
  }
}

export default Devices;
