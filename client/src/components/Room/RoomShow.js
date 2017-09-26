import React, { Component } from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';

class RoomShow extends Component {

  render() {
    return (
      <TableRow>
        <TableRowColumn>{this.props.obj._id}</TableRowColumn>
        <TableRowColumn>{this.props.obj.name}</TableRowColumn>
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
      </TableRow>
    )
  }
}

export default RoomShow;
