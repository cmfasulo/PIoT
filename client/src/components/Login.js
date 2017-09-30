import React, { Component } from 'react';
import { GridList } from 'material-ui/GridList';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import LoginIcon from 'material-ui/svg-icons/action/exit-to-app';
import axios from '../axios';
import pi from '../drawables/pi.svg';
import '../styles/index.css';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  gridList: {
    textAlign: 'center',
    overflowY: 'auto',
    paddingBottom: '25px'
  },
  color: {
    primary: "#2196f4",
    white: "#ffffff"
  }
};

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: false,
      errorMessage: ''
    }

    this.handleChange = this.handleChange.bind(this);
   }

  handleSubmit(event) {
    event.preventDefault();

    let reqOptions = {
      validateStatus: (status) => {
        return (status >= 200 && status < 300) || status === 400;
      }
    }

    axios.post('/login', this.state, reqOptions)
      .then(function(response) {
        if (response.status === 200) {
          localStorage.setItem('jwtPIoT', 'bearer ' + response.data.token);
          axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtPIoT');
          this.setState({ error: false, errorMessage: '' });
          this.props.history.push('/');
        } else if (response.status === 400 && response.data.message) {
          this.setState({ error: true, errorMessage: response.data.message });
        } else {
          this.setState({ error: true, errorMessage: 'Error: Unable to login, please try again.' });
          this.props.history.push('/login');
        }
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div>
        <div className="App-header">
          <img src={pi} className="App-logo" alt="pi" />
          <h2>Welcome to PIoT!</h2>
        </div>
        <div style={styles.root}>
          <GridList
            cols={1}
            cellHeight={'auto'}
            style={styles.gridList}
          >
            <h2>Login</h2>
            <form onSubmit={(event) => this.handleSubmit(event)}>
              <TextField
                hintText="Enter Username"
                floatingLabelText="Username"
                floatingLabelShrinkStyle={{ color: styles.color.primary }}
                underlineFocusStyle={{ borderColor: styles.color.primary }}
                name="username"
                value={this.state.username}
                errorText={this.state.errorMessage}
                onChange={this.handleChange}
              />
              <br/>

              <TextField
                hintText="Enter Password"
                floatingLabelText="Password"
                floatingLabelShrinkStyle={{ color: styles.color.primary }}
                underlineFocusStyle={{ borderColor: styles.color.primary }}
                name="password"
                type="password"
                value={this.state.password}
                errorText={this.state.errorMessage}
                onChange={this.handleChange}
              />
              <br/><br/>

              <RaisedButton
                type="submit"
                label="Login"
                icon={<LoginIcon />}
                backgroundColor={styles.color.primary}
                labelColor={styles.color.white}
              />
            </form>
          </GridList>
          <div className="App-footer"></div>
        </div>
      </div>
    );
  }
}

export default Login;
