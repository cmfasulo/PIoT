import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { GridList } from 'material-ui/GridList';
import './styles/App.css';

import { BeatLoader } from 'react-spinners';
import AppNav from './components/util/AppNav';
import Admin from './components/Admin';
import Profile from './components/Profile';
import List from './components/util/List';
import dashboardDevices from './props/dashboardDevices';

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

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      class: ''
    }

    this.toggleLoading = this.toggleLoading.bind(this);
  }

  toggleLoading(state) {
    let className = state ? 'loading' : '';
    this.setState({ loading: state, class: className });
  }

  render() {
    return (
      <div>
        <div className={this.state.class}>
          <BeatLoader color={styles.color.primary} loading={this.state.loading} />
        </div>
        <AppNav/>
        <div style={styles.root}>
          <GridList
            cols={1}
            cellHeight={'auto'}
            padding={0}
            style={styles.gridList}
          >
            <Route exact path='/' render={() => (<List {...dashboardDevices} toggleLoading={this.toggleLoading} />)}/>
            <Route path='/admin' render={() => (<Admin toggleLoading={this.toggleLoading} />)}/>
            <Route path='/profile' render={() => (<Profile toggleLoading={this.toggleLoading} />)}/>
          </GridList>
          <div className="App-footer"></div>
        </div>
      </div>
    );
  }
}

export default App;
