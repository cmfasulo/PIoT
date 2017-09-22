import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
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

    this.handleChange = this.handleChange.bind(this);
   }

  handleSubmit(event) {
    event.preventDefault();
    axios.post('http://127.0.0.1:4242/register', this.state)
      .then(function(response) {
        console.log(response);
        response.data.code === 200 ? (
          <Redirect to='/'/>
        ) : (
          console.log('Something went wrong: ', response)
        )
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div>
        <h2>Sign Up</h2>
        <form className="signup" onSubmit={(event) => this.handleSubmit(event)}>
          <label>First Name:</label>
          <input name="firstName" placeholder="Enter your First Name" value={this.state.firstName} onChange={this.handleChange} />
          <label>Last Name:</label>
          <input name="lastName" placeholder="Enter your Last Name" value={this.state.lastName} onChange={this.handleChange} />
          <label>Username:</label>
          <input name="username" placeholder="Enter your Username" value={this.state.username} onChange={this.handleChange} />
          <label>Password:</label>
          <input name="password" type="password" placeholder="Enter your Password" value={this.state.password} onChange={this.handleChange} />
          <label>Confirm Password:</label>
          <input name="confirmPassword" type="password" placeholder="Confirm your Password" value={this.state.confirmPassword} onChange={this.handleChange} />
          <input type="submit" value="Sign Up" className="btn btn-default"/>
        </form>
        <Link to='/login'>Login</Link>
      </div>
    );
  }
}

export default Signup;
