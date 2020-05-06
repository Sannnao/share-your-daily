import React, { Component } from 'react';
import './section.scss';
import Item from '../Item/Item';

class Section extends Component {
	state = {
		inputValue: '',
	}

	applyValue = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			const { sectionTitle, applyValue } = this.props;
			const { inputValue } = this.state;

			applyValue(inputValue, sectionTitle.toLowerCase());
			this.setState({ inputValue: '' });
		}
	}

	handleInput = (e) => {
		this.setState({inputValue: e.target.value});
	}

	render() {
		const { sectionTitle, items, hadPlans, recallPlans } = this.props;
		const { inputValue } = this.state;

		return (
			<section className='section'>
				<h2 className='section__title'>{ sectionTitle }:</h2>
				<ul className='section__items-list'>
					{
						items.map((item, i) => <Item key={i} itemContent={item} />)
					}
				</ul>
				<textarea
				  className="section__input-field"
					onChange={this.handleInput}
					value={inputValue}
					onKeyPress={this.applyValue}
				></textarea>
				{hadPlans
				  && <button className='section__recall-btn' onClick={ recallPlans }>Recall plans...</button>
				}
			</section>
		)
	}
}

export default Section;
