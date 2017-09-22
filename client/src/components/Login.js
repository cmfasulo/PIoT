import React, { Component } from 'react';
import axios from '../axios';
import { Grid, Row, Col } from 'react-bootstrap';
import pi from '../drawables/pi.svg';
import '../styles/index.css';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }

    this.handleChange = this.handleChange.bind(this);
   }

  handleSubmit(event) {
    event.preventDefault();
    axios.post('/login', this.state)
      .then(function(response) {
        if (response.status === 200) {
          localStorage.setItem('jwtPIoT', 'bearer ' + response.data.token);
          axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtPIoT');
          this.props.history.push('/');
        } else {
          this.props.history.push('/login');
        }
      }.bind(this))
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
        <div className="App-header">
          <img src={pi} className="App-logo" alt="pi" />
          <h2>Welcome to PIoT!</h2>
        </div>
        <Grid fluid>
          <Row>
            <Col xs={1}></Col>
            <Col xs={10} className="App">
              <h2>Login</h2>
              <form className="login" onSubmit={(event) => this.handleSubmit(event)}>
                <label>Username:</label>
                <input name="username" placeholder="Enter your Username" value={this.state.username} onChange={this.handleChange} />
                <label>Password:</label>
                <input name="password" type="password" placeholder="Enter your Password" value={this.state.password} onChange={this.handleChange} />
                <input type="submit" value="Login" className="btn btn-default"/>
              </form>
            </Col>
            <Col xs={1}></Col>
          </Row>
          <div className="App-footer"></div>
        </Grid>
      </div>
    );
  }
}

export default Login;
