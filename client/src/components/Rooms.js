import React from 'react';
import CollectionTable from './util/CollectionTable';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import RoomForm from './forms/RoomForm';

class Rooms extends CollectionTable {

  constructor(props) {
    super(props);
    this.endpoint = '/rooms/';
    this.headerLabels = ['_id', 'Name'];
    this.form = RoomForm;
    this.dialogTitleField = 'name';

    this.dataRow = this.dataRow.bind(this);
  }

  dataRow() {
    if (this.state.items instanceof Array) {
      return this.state.items.map((object, i) => {
        return (
          <TableRow key={i}>
            <TableRowColumn>{object._id}</TableRowColumn>
            <TableRowColumn>{object.name}</TableRowColumn>
          </TableRow>
        );
      });
    }
  }
}

export default Rooms;
