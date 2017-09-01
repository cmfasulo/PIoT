import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './DeviceRow';
import AddDevice from './AddDevice';

class DeviceList extends Component {

  constructor(props) {
      super(props);
      this.state = {
        name: '',
        type: '',
        location: '',
        localIp: '',
        status: '',
        state: '',
        lastStatusUpdate: '',
        lastStateChange: '',
        items: ''
      };
    }
    componentWillMount() {
      axios.get('http://localhost:4242/devices')
      .then(response => {
        this.setState({ items: response.data });
      })
      .catch(function (error) {
        console.log(error);
      })
    }
    addDevice(device) {
      let me = this;
      axios.post('http://localhost:4242/devices', device)
      .then(function(response) {
        me.setState({
          items: me.state.items.concat([{
            _id: response.data._id,
            name: response.data.name,
            type: response.data.type,
            location: response.data.location,
            localIp: response.data.localIp,
            status: response.data.status,
            state: response.data.state,
            lastStatusUpdate: response.data.lastStatusUpdate,
            lastStateChange: response.data.lastStateChange
          }])
        });
      })
      .catch(function(error) {
        console.log(error);
      });
    }
    updateDevice(device) {
      let me = this;
      axios.put('http://localhost:4242/devices/'+device._id, device)
      .then(function(response) {
        let items = me.state.items;
        let index = items.findIndex(x => x._id === response.data._id);
        items[index] = response.data;
        me.setState({ items: items });
      })
      .catch(function(error) {
        console.log(error);
      });
    }
    deleteDevice(id) {
      let me = this;
      axios.delete('http://localhost:4242/devices/'+id)
      .then(function(response) {
        let items = me.state.items.filter(function(item) {
          return item._id !== response.data._id;
        });

        me.setState({
          items: items
        })
      })
      .catch(function(err) {
        console.log(err);
      });
    }
    tabRow() {
      let me = this;
      if(this.state.items instanceof Array){
        return this.state.items.map(function(object, i){
          return <TableRow obj={object} key={i} deleteDevice={me.deleteDevice.bind(me)} updateDevice={me.updateDevice.bind(me)} />;
        })
      }
    }

    render() {
      return (
        <div className="container">
            <h3>Devices</h3>
            <table className="table table-striped">
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Type</td>
                  <td>Location</td>
                  <td>Local IP Address</td>
                  <td>Status</td>
                  <td>State</td>
                  <td>Last Status Update</td>
                  <td>Last State Change</td>
                </tr>
              </thead>
              <tbody>
                {this.tabRow()}
              </tbody>
            </table>
            <hr/>
            <AddDevice addDevice={this.addDevice.bind(this)}></AddDevice>
        </div>
      );
    }
  }

export default DeviceList;
