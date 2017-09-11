import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Signup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      confirmPassword: ''
    }
   }

  handleSubmit(event) {
    axios.post('http://localhost:3000/signup/', this.state)
      .then(function(response) {
        console.log(response);
        if (response.data.code === 200) {
          // redirect to index.js
        } else if (response.data.code === 204) {
          console.log('Username password do not match');
          alert('username password do not match');
        } else {
          console.log('Username does not exists');
          alert('Username does not exist');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <h2>Sign Up</h2>
        <form className="signup" onSubmit={(event) => this.handleSubmit(event)}>
          <label>First Name:</label>
          <input placeholder="Enter your First Name" onChange = {(event, newValue) => this.setState({ firstName: newValue })} />
          <label>Last Name:</label>
          <input placeholder="Enter your Last Name" onChange = {(event, newValue) => this.setState({ lastName: newValue })} />
          <label>Username:</label>
          <input placeholder="Enter your Username" onChange = {(event, newValue) => this.setState({ username: newValue })} />
          <label>Password:</label>
          <input type="password" placeholder="Enter your Password" onChange = {(event, newValue) => this.setState({ password: newValue })} />
          <label>Confirm Password:</label>
          <input type="password" placeholder="Confirm your Password" onChange = {(event, newValue) => this.setState({ confirmPassword: newValue })} />
          <input type="submit" value="Sign Up" className="btn btn-default"/>
        </form>
        <Link to='/login'>Login</Link>
      </div>
    );
  }
}

export default Signup;
