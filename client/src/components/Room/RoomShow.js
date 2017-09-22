import React, { Component } from 'react';

class RoomShow extends Component {

  render() {
    return (
      <tr>
        <td>{this.props.obj._id}</td>
        <td>{this.props.obj.name}</td>
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

export default RoomShow;
