import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { GridList } from 'material-ui/GridList';

import { BeatLoader } from 'react-spinners';
import AppNav from './components/util/AppNav';
import Dashboard from './components/Dashboard';
import Admin from './components/Admin';
import Profile from './components/Profile';

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
          <BeatLoader color={'#2196f4'} loading={this.state.loading} />
        </div>
        <AppNav/>
        <div className="root">
          <GridList
            cols={1}
            cellHeight={'auto'}
            padding={0}
            className="gridList"
          >
            <Route exact path='/' render={() => (<Dashboard toggleLoading={this.toggleLoading} />)}/>
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
