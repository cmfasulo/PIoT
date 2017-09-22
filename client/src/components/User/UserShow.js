import React, { Component } from 'react';

class UserShow extends Component {

  render() {
    return (
      <tr>
        <td>{this.props.obj.firstName}</td>
        <td>{this.props.obj.lastName}</td>
        <td>{this.props.obj.username}</td>
        <td>{this.props.obj.permissions}</td>
        <td> - </td>
        <td> - </td>
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

export default UserShow;
