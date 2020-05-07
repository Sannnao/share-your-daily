import React, { Component } from 'react';
import cloneDeep from 'lodash.clonedeep';
import './app.scss';

import Section from './components/Section/Section';

class App extends Component {
  state = {
    dailyStatus: [
      { sectionTitle: 'Planned', tasks: [] },
      { sectionTitle: 'Achieved', tasks: [] },
      { sectionTitle: 'Plans', tasks: [] },
    ],
    getDaily: false,
    hadPlans: false,
  };

  containerRef = React.createRef();
	resultRef = React.createRef();

  componentDidMount() {
    const plans = window.localStorage.getItem('plans');

    if (plans) {
      this.setState({ hadPlans: JSON.parse(plans) });
    }
	}

	componentDidUpdate(prevProps, prevState) {
		for (let i = 0; i < prevState.dailyStatus.length; i++) {
			if (prevState.dailyStatus[i].tasks.length < this.state.dailyStatus[i].tasks.length) {
				this.scrollToBottom();
			}
		}
	}

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
    this.setState(({ dailyStatus, hadPlans })=> {
			const newDaily = cloneDeep(dailyStatus);
			newDaily[0].tasks = hadPlans;

			return { dailyStatus: newDaily, hadPlans: false };
		});
  };

  scrollToBottom = () => {
		this.containerRef.current.scrollTop = this.containerRef.current.scrollHeight;
  };

  toggleGetDaily = () => {
		const { dailyStatus } = this.state;
		const plans = dailyStatus[2].tasks;

    if (plans.length) {
      window.localStorage.setItem('plans', JSON.stringify(plans));
    }

    this.setState(({ getDaily }) => ({ getDaily: !getDaily }));
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

  render() {
    const {
      getDaily,
      hadPlans,
      dailyStatus,
		} = this.state;

    const dailyValue = dailyStatus.map(({ sectionTitle, tasks }) => {
			return `${sectionTitle}:\n\n- ${tasks.map(({value}) => value).join('\n- ')}`;
		}).join('\n\n');

    return (
      <div className='App'>
        <div className='sections-container' ref={this.containerRef}>
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
              {dailyStatus.map(({ sectionTitle, tasks }, i) => {
								const sectionProps = {
									sectionIndex: i,
									sectionTitle,
									tasks,
									applyValue: this.applyValue,
									handleDelete: this.handleDelete,
									handleEdit: this.handleEdit,
								};

								if (sectionTitle === 'Planned') {
									Object.assign(sectionProps, { hadPlans, recallPlans: this.recallPlans });
								}

								return <Section key={i} {...sectionProps}/>
							})}
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
