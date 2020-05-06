import React, { Component } from 'react';
import './app.scss';

import Section from './components/Section/Section';

class App extends Component {
	state = {
		planned: [],
		achieved: [],
		plans: [],
		getDaily: false,
		hadPlans: false,
	}

	containerRef = React.createRef();
	resultRef = React.createRef();

	componentDidMount() {
		const plans = window.localStorage.getItem('plans');

		if (plans) {
			this.setState({ hadPlans: JSON.parse(plans) });
		} else {
			this.setState({ hadPlans: false });
		}
	}

	componentDidUpdate() {
		this.scrollToBottom();
	}

	recallPlans = () => {
		this.setState(state => ({ planned: state.hadPlans, hadPlans: false }))
	}

	scrollToBottom = () => {
		this.containerRef.current.scrollTop = this.containerRef.current.scrollHeight;
	}

	toggleGetDaily = () => {
		const { plans } = this.state;

		if (plans.length) {
			window.localStorage.setItem('plans', JSON.stringify(plans));
		}

		this.setState(({ getDaily }) => ({ getDaily: !getDaily }))
	}

	applyValue = (value, section) => {
		this.setState(state => {
			const newSection = [...state[section]];

			newSection.push(value);

			return { [section]: newSection }
		})
	}

	copyResultText = () => {
		this.resultRef.current.select();
		this.resultRef.current.setSelectionRange(0, 99999);

		document.execCommand('copy');
	}

	render() {
		const { planned, achieved, plans, getDaily, hadPlans } = this.state;

		const dailyValue = `Planned:\n\n- ${planned.join('\n- ')}\n\nAchieved:\n\n- ${achieved.join('\n- ')}\n\nPlans:\n\n- ${plans.join('\n- ')}\n\n`

		return (
			<div className="App">
				<div className='sections-container' ref={this.containerRef}>
					{getDaily
			    ? <div className='result-container'>
					    <textarea className='result-field' value={dailyValue} readOnly ref={this.resultRef}></textarea>
							<button className='result-container__copy-btn' onClick={this.copyResultText}>Copy</button>
						</div>
					: <>
				      <Section
							  sectionTitle={'Planned'}
							  applyValue={this.applyValue}
							  items={planned}
							  hadPlans={hadPlans}
								recallPlans={this.recallPlans}
							/>
					    <Section sectionTitle={'Achieved'} applyValue={this.applyValue} items={achieved} />
					    <Section sectionTitle={'Plans'} applyValue={this.applyValue} items={plans} />
						</>
					}
				</div>
				<button className="get-daily-button" onClick={this.toggleGetDaily}>
				  {getDaily ? 'Go back' : 'Get daily status!'}
				</button>
			</div>
		);
	}
}

export default App;
