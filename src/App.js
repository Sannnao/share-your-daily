import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
} from 'react-router-dom';
import cloneDeep from 'lodash.clonedeep';
import './app.scss';

import DatePanel from './components/DatePanel/DatePanel';
import DailyList from './components/DailyList/DailyList';
import Result from './components/Result/Result';

class App extends Component {
  state = {
    containerScrollCords: null,
    currentDate: new Date().toISOString().split('T')[0],
  };

  setNewDate = e => {
    this.setState({ currentDate: e.target.value });
  };

  setContainerCords = containerScrollCords => {
    this.setState({ containerScrollCords });
  };

  unsetContainerCords = () => {
    this.setState({ containerScrollCords: null });
  };

  render() {
    const {
      containerScrollCords,
      currentDate,
    } = this.state;

    return (
      <Router>
        <div className='App'>
          <div className='sections-container'>
            <Route path='/result'>
              <Result
                currentDate={currentDate}
              />
            </Route>
            <Route exact path='/'>
              <>
                <DatePanel
                  currentDate={currentDate}
                  setNewDate={this.setNewDate}
                />
                <DailyList
                  setContainerCords={this.setContainerCords}
                  unsetContainerCords={this.unsetContainerCords}
                  containerScrollCords={containerScrollCords}
                />
                <Link to='/result' className='get-daily-button'>
                  Get daily status!'
                </Link>
              </>
            </Route>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
