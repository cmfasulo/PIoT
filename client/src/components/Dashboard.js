import React from 'react';
import CollectionTable from './util/CollectionTable';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import RefreshIcon from 'material-ui/svg-icons/action/cached';
import decode from 'jwt-decode';
import axios from '../axios';

class Dashboard extends CollectionTable {

  constructor(props) {
    super(props);
    this.title = 'Dashboard';
    this.endpoint = '/devices/';
    this.headerLabels = ['Name', 'Location', 'Status', 'State'];
    this.dialog = false;
    this.addIcon = false;
    this.state = { items: '' };

    this.toggleState = this.toggleState.bind(this);
    this.pingDevice = this.pingDevice.bind(this);
    this.checkAuth = this.checkAuth.bind(this);
    this.dataRow = this.dataRow.bind(this);
  }

  toggleState(event, deviceId) {
    event.preventDefault();
    this.props.toggleLoading(true);

    let index = this.state.items.findIndex(x => x._id === deviceId);
    let device = this.state.items[index];
    device.state = device.state === 'on' ? 'off' : 'on';

    axios.put('/devices/' + deviceId, device, { headers: { Authorization: localStorage.getItem('jwtPIoT') } })
      .then(function(response) {
        let items = this.state.items;
        items[index] = response.data;
        this.setState({ items: items });
        this.props.toggleLoading(false);
      }.bind(this))
      .catch(function(error) {
        console.log(error);
        this.props.toggleLoading(false);
      }.bind(this));
  }

  pingDevice(event, deviceId) {
    event.preventDefault();
    this.props.toggleLoading(true);

    axios.get('/devices/ping/' + deviceId, { headers: { Authorization: localStorage.getItem('jwtPIoT') } })
      .then(function(response) {
        let items = this.state.items;
        let index = items.findIndex(x => x._id === response.data._id);
        items[index] = response.data;
        this.setState({ items: items });
        this.props.toggleLoading(false);
      }.bind(this))
      .catch(function (error) {
        console.log(error);
        this.props.toggleLoading(false);
      }.bind(this))
  }

  checkAuth(deviceLocation) {
    let token = localStorage.getItem('jwtPIoT') || null;
    let decoded = token && decode(token);
    var admin = decoded && decoded.admin;
    var devicePermission = decoded && decoded.permissions.indexOf(deviceLocation) !== -1;

    return (admin || devicePermission);
  }

  dataRow() {
    if (this.state.items instanceof Array) {
      return this.state.items.map((object, i) => {
        return this.checkAuth(object.location._id) ? (
          <TableRow key={i}>
            <TableRowColumn>{object.name}</TableRowColumn>
            <TableRowColumn>{object.location.name}</TableRowColumn>
            <TableRowColumn className={object.status}>{object.status.toUpperCase()}</TableRowColumn>
            <TableRowColumn>
              {object.status === 'online' ? (
                <Toggle
                  toggled={object.state === 'on' ? true : false}
                  onToggle={(event) => this.toggleState(event, object._id)}
                  thumbStyle={{ backgroundColor: "#87acc9" }}
                  thumbSwitchedStyle={{ backgroundColor: "#2196f4" }}
                  trackStyle={{ backgroundColor: "#c8c8c8" }}
                  trackSwitchedStyle={{ backgroundColor: "#c8c8c8" }}
                  iconStyle={{ margin: "auto" }}
                />
              ) : (
                <RaisedButton
                  icon={<RefreshIcon/>}
                  className="submit"
                  style={{ minWidth: "35px" }}
                  onClick={(event) => this.pingDevice(event, object._id)}
                />
              )}
            </TableRowColumn>
          </TableRow>
        ) : null;
      });
    }
  }
}

export default Dashboard;
