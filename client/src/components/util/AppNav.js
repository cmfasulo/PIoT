import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import decode from 'jwt-decode';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

import pi from '../../drawables/pi.svg';
import '../../styles/App.css';

class AppNav extends Component {

  constructor(props) {
    super(props);
    this.state = {};

    this.handleClick = this.handleClick.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentWillMount() {
    let token = localStorage.getItem('jwtPIoT') || null;
    let decoded = token && decode(token);

    this.setState(decoded);
  }

  handleClick(event) {
    event.preventDefault();
    this.props.history.push(event.target.name);
  }

  logout(event) {
    event.preventDefault();
    localStorage.removeItem('jwtPIoT');
    this.props.history.push('/login');
  }

  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <img src={pi} className="d-inline-block align-top nav-logo" alt="PIoT" />
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} name="/" onClick={this.handleClick}>PIoT</NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} name="/" onClick={this.handleClick}>Dashboard</NavItem>
            <NavItem eventKey={2} name="/admin" onClick={this.handleClick}>Admin</NavItem>
            <NavItem eventKey={3} name="/profile" onClick={this.handleClick}>Profile</NavItem>
            <NavItem eventKey={4} onClick={this.logout}>Logout</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default withRouter(AppNav);
