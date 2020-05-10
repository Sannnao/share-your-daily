import React, { Component } from 'react';
import cloneDeep from 'lodash.clonedeep';
import './app.scss';

import DatePanel from './components/DatePanel/DatePanel';
import DailyList from './components/DailyList/DailyList';

class App extends Component {
  state = {
    dailyStatus: [
      { sectionTitle: 'Planned', tasks: [] },
      { sectionTitle: 'Achieved', tasks: [] },
      { sectionTitle: 'Plans', tasks: [] },
    ],
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

  handleEdit = (sectionIndex, taskId, newValue) => {
    this.setState(({ dailyStatus }) => {
      const copyDaily = cloneDeep(dailyStatus);
      const tasks = copyDaily[sectionIndex].tasks;
      const taskIndex = tasks.findIndex(task => task.id === taskId);
      tasks[taskIndex].value = newValue;

      return { dailyStatus: copyDaily };
    });
  };

  handleDelete = (sectionIndex, taskId) => {
    this.setState(({ dailyStatus }) => {
      const copyDaily = cloneDeep(dailyStatus);
      const tasks = copyDaily[sectionIndex].tasks;
      const taskIndex = tasks.findIndex(task => task.id === taskId);
      tasks.splice(taskIndex, 1);

      return { dailyStatus: copyDaily };
    });
  };

  recallPlans = () => {
    this.setState(({ dailyStatus, hadPlans }) => {
      const newDaily = cloneDeep(dailyStatus);
      newDaily[0].tasks = hadPlans;

      return { dailyStatus: newDaily, hadPlans: false };
    });
  };

  toggleGetDaily = () => {
    const { dailyStatus } = this.state;
    const plans = dailyStatus[2].tasks;

    if (plans.length) {
      window.localStorage.setItem('plans', JSON.stringify(plans));
    }

    this.setState(({ getDaily, currentDate, dailyStatus }) => {
			if (!getDaily) {
				const dateArr = currentDate.split('-');
				dateArr.shift();

				const dailyValue = `${dateArr.reverse().join('.')}\n\n${dailyStatus
					.map(({ sectionTitle, tasks }) => {
						return `${sectionTitle}:\n\n- ${tasks
							.map(({ value }) => value)
							.join('\n- ')}`;
					})
					.join('\n\n')}`;
				return { getDaily: true, dailyValue };
			}

			return { getDaily: false };
	  });
  };

  applyValue = (value, sectionIndex) => {
    this.setState(({ dailyStatus }) => {
      const copyDaily = cloneDeep(dailyStatus);
      const id = Math.floor(Math.random() * 1e6);
      copyDaily[sectionIndex].tasks.push({ id: id, value });

      return { dailyStatus: copyDaily };
    });
  };

  copyResultText = () => {
    this.resultRef.current.select();
    this.resultRef.current.setSelectionRange(0, 99999);

    document.execCommand('copy');
  };

  setContainerCords = containerScrollCords => {
    this.setState({ containerScrollCords });
  };

  unsetContainerCords = () => {
    this.setState({ containerScrollCords: null });
  };

  render() {
    const {
      getDaily,
      hadPlans,
      dailyStatus,
			containerScrollCords,
			currentDate,
			dailyValue,
		} = this.state;

    return (
      <div className='App'>
        <div className='sections-container'>
          {getDaily ? (
            <div className='result-container'>
              <textarea
                className='result-field'
                value={dailyValue}
                readOnly
                ref={this.resultRef}
              ></textarea>
              <button
                className='result-container__copy-btn'
                onClick={this.copyResultText}
              >
                Copy
              </button>
            </div>
          ) : (
            <>
              <DatePanel currentDate={currentDate} setNewDate={this.setNewDate}/>
              <DailyList
                dailyStatus={dailyStatus}
                hadPlans={hadPlans}
                recallPlans={this.recallPlans}
                applyValue={this.applyValue}
                handleDelete={this.handleDelete}
                handleEdit={this.handleEdit}
                setContainerCords={this.setContainerCords}
                unsetContainerCords={this.unsetContainerCords}
                containerScrollCords={containerScrollCords}
              />
            </>
          )}
        </div>
        <button className='get-daily-button' onClick={this.toggleGetDaily}>
          {getDaily ? 'Go back' : 'Get daily status!'}
        </button>
      </div>
    );
  }
}

export default App;
