import React, { Component } from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import RefreshIcon from 'material-ui/svg-icons/action/cached';

const styles = {
  color: {
    primary: "#2196f4",
    white: "#ffffff"
  },
  thumbOff: {
    backgroundColor: '#87acc9',
  },
  thumbSwitched: {
    backgroundColor: "#2196f4",
  },
  track: {
    backgroundColor: "#c8c8c8",
  }
};

class DeviceShow extends Component {

  render() {
    return (
      <TableRow>
        <TableRowColumn>{this.props.obj.name}</TableRowColumn>
        {!this.props.dashboard && (<TableRowColumn>{this.props.obj.type}</TableRowColumn>)}
        <TableRowColumn>{this.props.obj.location.name}</TableRowColumn>
        {!this.props.dashboard && (<TableRowColumn>{this.props.obj.localIp}</TableRowColumn>)}
        <TableRowColumn className={this.props.obj.status}>{this.props.obj.status.toUpperCase()}</TableRowColumn>
        <TableRowColumn>
          {this.props.obj.status === 'online' ? (
            <Toggle
              toggled={this.props.obj.state === 'on' ? true : false}
              onToggle={this.props.toggleState}
              thumbStyle={styles.thumbOff}
              thumbSwitchedStyle={styles.thumbSwitched}
              trackStyle={styles.track}
              trackSwitchedStyle={styles.track}
              iconStyle={{ margin: "auto" }}
            />
        ) : (
          <RaisedButton
            icon={<RefreshIcon color={styles.color.white}/>}
            backgroundColor={styles.color.primary}
            style={{ minWidth: "40px" }}
            onClick={(event) => this.props.pingDevice(event, this.props.obj._id)}
          />
        )}
        </TableRowColumn>
        {!this.props.dashboard && (
          <TableRowColumn>
            <RaisedButton
              label="Edit"
              labelColor={"#ffffff"}
              backgroundColor={"#006eff"}
              style={{ margin: "5px auto" }}
              onClick={this.props.toggleEditing} />
            <br />
            <RaisedButton
              label="Delete"
              labelColor={"#ffffff"}
              backgroundColor={"#ff0000"}
              style={{ margin: "5px auto" }}
              onClick={this.props.handleDelete} />
          </TableRowColumn>
        )}
      </TableRow>
    )
  }
}

export default DeviceShow;
