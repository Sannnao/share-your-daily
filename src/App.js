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
    getDaily: false,
    hadPlans: false,
    containerScrollCords: null,
    currentDate: new Date().toISOString().split('T')[0],
  };

  resultRef = React.createRef();

  componentDidMount() {
    const plans = window.localStorage.getItem('plans');

    if (plans) {
      this.setState({ hadPlans: JSON.parse(plans) });
    }
  }

  setNewDate = e => {
    this.setState({ currentDate: e.target.value });
  };

  recallPlans = () => {
    this.setState(({ dailyStatus, hadPlans }) => {
      const newDaily = cloneDeep(dailyStatus);
      newDaily[0].tasks = hadPlans;

      return { dailyStatus: newDaily, hadPlans: false };
    });
  };

  setContainerCords = containerScrollCords => {
    this.setState({ containerScrollCords });
  };

  unsetContainerCords = () => {
    this.setState({ containerScrollCords: null });
  };

  render() {
    const {
      hadPlans,
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
                  hadPlans={hadPlans}
                  recallPlans={this.recallPlans}
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
