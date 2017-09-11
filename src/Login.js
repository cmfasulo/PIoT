import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
   }

  handleSubmit(event) {
    axios.post('http://localhost:3000/login/', this.state)
      .then(function(response) {
        console.log(response);
        if (response.data.code === 200) {
          // redirect to index
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
        <h2>Login</h2>
        <form className="login" onSubmit={(event) => this.handleSubmit(event)}>
          <label>Username:</label>
          <input placeholder="Enter your Username" onChange = {(event, newValue) => this.setState({ username: newValue })} />
          <label>Password:</label>
          <input type="password" placeholder="Enter your Password" onChange = {(event, newValue) => this.setState({ password: newValue })} />
          <input type="submit" value="Login" className="btn btn-default"/>
        </form>
        <Link to='/signup'>Sign Up</Link>
      </div>
    );
  }
}

export default Login;
