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
		addedToPlans: false,
		isDismissed: false,
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

  markAchieved = taskId => {
    this.setState(({ dailyStatus }) => {
      const copyDaily = cloneDeep(dailyStatus);
			const plannedTasks = copyDaily[0].tasks;
			const plansTasks = copyDaily[2].tasks;
      const achievedTaskIndex = plannedTasks.findIndex(
        task => task.id === taskId
      );
			const copyAchievedTask = { ...plannedTasks[achievedTaskIndex] };
			const plansTaskIndex = plansTasks.findIndex(task => task.id === taskId);
			if (plansTaskIndex !== -1) {
				plansTasks.splice(plansTaskIndex, 1);
				copyDaily[0].tasks[achievedTaskIndex].fromPlans = true;
			}

      copyDaily[1].tasks.push(copyAchievedTask);
      copyDaily[0].tasks[achievedTaskIndex].isFinished = true;

      return { dailyStatus: copyDaily };
    });
  };

  unmarkAchieved = taskId => {
    this.setState(({ dailyStatus }) => {
      const copyDaily = cloneDeep(dailyStatus);
      const plannedTasks = copyDaily[0].tasks;
      const achievedTasks = copyDaily[1].tasks;
      const achievedTaskIndex = achievedTasks.findIndex(
        task => task.id === taskId
      );
      const plannedTaskIndex = plannedTasks.findIndex(
        task => task.id === taskId
      );

			plannedTasks[plannedTaskIndex].isFinished = false;
			if (plannedTasks[plannedTaskIndex].fromPlans) {
				copyDaily[2].tasks.push(plannedTasks[plannedTaskIndex]);
			}
      achievedTasks.splice(achievedTaskIndex, 1);

      return { dailyStatus: copyDaily };
    });
  };

  addUnfinishedTasks = () => {
    this.setState(({ dailyStatus }) => {
      const copyDaily = cloneDeep(dailyStatus);
			const plannedTasks = copyDaily[0].tasks;
			const plansTasks = copyDaily[2].tasks;
			const unfinishedTasks = plannedTasks.filter(task => !task.isFinished && !task.isAddedToPlans);
			const tasksToMove = unfinishedTasks.map(task => ({ ...task, isFinished: false }));
			plannedTasks.forEach(task => {
				if (!task.isFinished) {
					task.isAddedToPlans = true;
				}
			});

			copyDaily[2].tasks = [ ...plansTasks, ...tasksToMove];

      return { dailyStatus: copyDaily, addedToPlans: true };
    });
	};

	cancelAddToPlans = () => {
    this.setState(({ dailyStatus }) => {
			const copyDaily = cloneDeep(dailyStatus);
			const plannedTasks = copyDaily[0].tasks;
			const plansTasks = copyDaily[2].tasks;
			plansTasks.forEach(task => {
				if (task.hasOwnProperty('isFinished')) {
					const unfinishedTaskIndex = plannedTasks.findIndex(e => e.id === task.id);
					plannedTasks[unfinishedTaskIndex].isAddedToPlans = false;
				}
			})
      const tasksToKeep = plansTasks.filter(task => !task.hasOwnProperty('isFinished'));
      copyDaily[2].tasks = tasksToKeep;

      return { dailyStatus: copyDaily, addedToPlans: false };
    });
	}

	hideAddedToPlans = () => {
		this.setState(({ dailyStatus }) => {
      const copyDaily = cloneDeep(dailyStatus);
			const plansTasks = copyDaily[2].tasks;

			copyDaily[2].tasks = plansTasks.map(task => {
				delete task.isFinished;
				delete task.isAddedToPlans;
				return task;
			});

      return { dailyStatus: copyDaily, addedToPlans: false };
    });
	}

  handleDelete = (sectionIndex, taskId) => {
    this.setState(({ dailyStatus }) => {
      const copyDaily = cloneDeep(dailyStatus);
      const tasks = copyDaily[sectionIndex].tasks;
      const taskIndex = tasks.findIndex(task => task.id === taskId);
      tasks.splice(taskIndex, 1);

      return { dailyStatus: copyDaily };
    });
	};

	handleDismiss = () => {
		this.setState({ isDismissed: true });
	}

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
    window.getSelection().empty();

    this.setState({ isCopied: true });
  };

  setContainerCords = containerScrollCords => {
    this.setState({ containerScrollCords });
  };

  unsetContainerCords = () => {
    this.setState({ containerScrollCords: null });
  };

  chechIsUnfinishedTasks = tasks => {
		const { isDismissed } = this.state;

		console.log(tasks.filter(task => !task.isFinished).filter(task => !task.addedToPlans));

		return !isDismissed && tasks
			.filter(task => !task.isFinished)
			.filter(task => !task.isAddedToPlans).length > 0;
	};

  render() {
    const {
      getDaily,
      hadPlans,
      dailyStatus,
      containerScrollCords,
      currentDate,
      dailyValue,
      isCopied,
      addedToPlans,
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
                {isCopied ? 'Copied' : 'Copy'}
              </button>
            </div>
          ) : (
            <>
              <DatePanel
                currentDate={currentDate}
                setNewDate={this.setNewDate}
              />
              <DailyList
                dailyStatus={dailyStatus}
                hadPlans={hadPlans}
                recallPlans={this.recallPlans}
                applyValue={this.applyValue}
                handleDelete={this.handleDelete}
                handleEdit={this.handleEdit}
                markAchieved={this.markAchieved}
                unmarkAchieved={this.unmarkAchieved}
                setContainerCords={this.setContainerCords}
                unsetContainerCords={this.unsetContainerCords}
                containerScrollCords={containerScrollCords}
                isUnfinishedTasks={this.chechIsUnfinishedTasks(
                  dailyStatus[0].tasks
                )}
                addUnfinishedTasks={this.addUnfinishedTasks}
                addedToPlans={addedToPlans}
                cancelAddToPlans={this.cancelAddToPlans}
                hideAddedToPlans={this.hideAddedToPlans}
								handleDismiss={this.handleDismiss}
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
