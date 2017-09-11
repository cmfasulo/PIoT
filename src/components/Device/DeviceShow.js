import React, { Component } from 'react';

class DeviceShow extends Component {

  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <tr>
        <td>{this.props.obj.name}</td>
        <td>{this.props.obj.type}</td>
        <td>{this.props.obj.location}</td>
        <td>{this.props.obj.localIp}</td>
        <td className={this.props.obj.status}>{this.props.obj.status.toUpperCase()}</td>
        <td>
          <label className="switch">
            <input type="checkbox" checked={this.props.state === 'on' ? true : false} onClick={this.props.toggleState}/>
            <span className="slider round"></span>
          </label>
        </td>
        <td>{this.props.obj.lastStatusUpdate}</td>
        <td>{this.props.obj.lastStateChange}</td>
        <td>
          <form onSubmit={this.props.toggleEditing}>
            <input type="submit" value="Edit" className="btn btn-primary"/>
          </form>
        </td>
        <td>
          <form onSubmit={this.props.handleDelete}>
            <input type="submit" value="Delete" className="btn btn-danger"/>
          </form>
        </td>
      </tr>
    )
  }
}

export default DeviceShow;
