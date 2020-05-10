import React, { Component } from 'react';
import Section from '../Section/Section';
import './daily-list.scss';

class DailyList extends Component {
	containerRef = React.createRef();

	componentDidMount() {
		const { containerScrollCords, unsetContainerCords } = this.props;

		if (containerScrollCords) {
			this.containerRef.current.scrollTop = containerScrollCords;

			unsetContainerCords();
    }
	}

	getSnapshotBeforeUpdate(prevProps) {
		const prevDailyStatus = prevProps.dailyStatus;
		const { dailyStatus } = this.props;

    for (let i = 0; i < prevDailyStatus.length; i++) {
      if (prevDailyStatus[i].tasks.length < dailyStatus[i].tasks.length) {
				const container = this.containerRef.current;

        return container.scrollHeight - container.scrollTop;
      }
		}

		return null;
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (snapshot !== null) {
			const container = this.containerRef.current;

			container.scrollTop = container.scrollHeight - snapshot;
		}
	}

	componentWillUnmount() {
		const { setContainerCords } = this.props;

		setContainerCords(this.containerRef.current.scrollTop);
	}

  render() {
		const { dailyStatus, hadPlans, recallPlans, applyValue, handleDelete, handleEdit } = this.props;

    return (
      <div className='daily-list' ref={this.containerRef}>
        {dailyStatus.map(({ sectionTitle, tasks }, i) => {
          const sectionProps = {
            sectionIndex: i,
            sectionTitle,
            tasks,
            applyValue: applyValue,
            handleDelete: handleDelete,
            handleEdit: handleEdit,
          };

          if (sectionTitle === 'Planned') {
            Object.assign(sectionProps, {
              hadPlans,
              recallPlans: recallPlans,
            });
          }

          return <Section key={i} {...sectionProps} />;
        })}
      </div>
    );
  }
}

export default DailyList;
