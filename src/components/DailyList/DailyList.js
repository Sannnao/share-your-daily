import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PLANNED, ACHIEVED, PLANS } from '../../constants/sectionNames';
import { addPlanned, addAchieved, addPlans } from '../../actions/';
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
    const {
      plannedTasks: prevPlannedTasks,
      achievedTasks: prevAchievedTasks,
      plansTasks: prevPlansTasks,
    } = prevProps;
    const {
      plannedTasks,
      achievedTasks,
      plansTasks,
    } = this.props;

    if (
      prevPlannedTasks.length < plannedTasks.length
      || prevAchievedTasks.length < achievedTasks.length
      || prevPlansTasks.length < plansTasks
    ) {
      const container = this.containerRef.current;

      return container.scrollHeight - container.scrollTop;
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
    const {
      plannedTasks,
      achievedTasks,
      plansTasks,
      addPlanned,
      addAchieved,
      addPlans,
      dailyStatus,
      hadPlans,
      recallPlans,
      applyValue,
      handleDelete,
      handleEdit,
      markAchieved,
			unmarkAchieved,
			isUnfinishedTasks,
			addUnfinishedTasks,
			addedToPlans,
			cancelAddToPlans,
			hideAddedToPlans,
			handleDismiss,
    } = this.props;

    console.log('renderDailyList');

    return (
      <div className='daily-list' ref={this.containerRef}>
        <Section
          sectionTitle={PLANNED}
          tasks={plannedTasks}
          addTask={addPlanned}
        />
        <Section
          sectionTitle={ACHIEVED}
          tasks={achievedTasks}
          addTask={addAchieved}
        />
        <Section
          sectionTitle={PLANS}
          tasks={plansTasks}
          addTask={addPlans}
        />
      </div>
    );
  }
}

const mapState = (state) => {
  const {
    plannedTasks,
    achievedTasks,
    plansTasks,
  } = state;

  return {
    plannedTasks,
    achievedTasks,
    plansTasks,
  }
}

const mapDispatch = { addPlanned, addAchieved, addPlans };

export default connect(mapState, mapDispatch)(DailyList);
