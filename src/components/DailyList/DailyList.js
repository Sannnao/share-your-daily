import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PLANNED, ACHIEVED, PLANS } from '../../constants/sectionNames';
import {
  addPlanned,
  addAchieved,
  addPlans,
  editPlanned,
  editAchieved,
  editPlans,
  deletePlanned,
  deleteAchieved,
  deletePlans,
  togglePlanned,
  markPlannedAchieved,
  addUnfinishedToPlans,
  cancelAddToPlans,
} from '../../actions/';
import Section from '../Section/Section';
import './daily-list.scss';

class DailyList extends Component {
  state = {
    isDismissed: false,
    addedToPlans: false,
    hadPlans: null,
  };

  containerRef = React.createRef();

  componentDidMount() {
    const { containerScrollCords, unsetContainerCords } = this.props;

    const plans = localStorage.getItem('plans');

    if (plans) {
      this.setState({ hadPlans: JSON.parse(plans) });
    }

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

  markAchieved = (id, text) => {
    const { markPlannedAchieved, togglePlanned } = this.props;

    markPlannedAchieved(id, text);
    togglePlanned(id);
  }

  unmarkAchieved = (id) => {
    const { deleteAchieved, togglePlanned } = this.props;

    deleteAchieved(id);
    togglePlanned(id);
  }

  chechIsUnfinishedTasks = () => {
    const { isDismissed } = this.state;
    const { plannedTasks } = this.props;

    return plannedTasks.filter(task => !task.achieved).length > 0
      && !isDismissed;
  };

  addUnfinishedTasks = () => {
    const { plannedTasks, addUnfinishedToPlans } = this.props;

    plannedTasks.forEach(({id, text, achieved}) => {
      if (!achieved)
        addUnfinishedToPlans(id, text);
    })

    this.setState({ isDismissed: true, addedToPlans: true });
  }

  recallPlans = () => {
    const { hadPlans } = this.state;
    const { addPlanned } = this.props;

    hadPlans.forEach(({ text }) => {
      addPlanned(text);
    });

    this.setState({ hadPlans: null });
    localStorage.removeItem('plans');
  }

  handleDismiss = () => {
    this.setState({ isDismissed: true });
  }

  cancelAddToPlans = () => {
    const { cancelAddToPlans } = this.props;

    cancelAddToPlans();
    this.hideAddedToPlans();
  }

  hideAddedToPlans = () => {
    this.setState({ addedToPlans: false });
  }

  render() {
    const {
      addedToPlans,
      hadPlans,
    } = this.state;

    const {
      plannedTasks,
      achievedTasks,
      plansTasks,
      addPlanned,
      addAchieved,
      addPlans,
      editPlanned,
      editAchieved,
      editPlans,
      deletePlanned,
      deleteAchieved,
      deletePlans,
    } = this.props;

    return (
      <div className='daily-list' ref={this.containerRef}>
        {hadPlans && (
          <button className='daily-list__recall-btn' onClick={this.recallPlans}>
            Recall plans...
          </button>
        )}
        <Section
          sectionTitle={PLANNED}
          tasks={plannedTasks}
          addTask={addPlanned}
          handleEdit={editPlanned}
          handleDelete={deletePlanned}
          markAchieved={this.markAchieved}
          unmarkAchieved={this.unmarkAchieved}
        />
        {this.chechIsUnfinishedTasks()
          && <div>You have unfinished tasks. Add them to Plans?
            <button onClick={this.addUnfinishedTasks}>Add</button>
            <button onClick={this.handleDismiss}>Dismiss</button>
          </div>
        }
        <Section
          sectionTitle={ACHIEVED}
          tasks={achievedTasks}
          addTask={addAchieved}
          handleEdit={editAchieved}
          handleDelete={deleteAchieved}
        />
        {addedToPlans
          && <div>
            <button onClick={this.cancelAddToPlans}>Cancel</button>
            <button onClick={this.hideAddedToPlans}>Hide</button>
          </div>
        }
        <Section
          sectionTitle={PLANS}
          tasks={plansTasks}
          addTask={addPlans}
          handleEdit={editPlans}
          handleDelete={deletePlans}
        />
      </div>
    );
  }
}

const mapState = ({
  plannedTasks,
  achievedTasks,
  plansTasks,
}) => ({
  plannedTasks,
  achievedTasks,
  plansTasks,
});

const mapDispatch = {
  addPlanned,
  addAchieved,
  addPlans,
  editPlanned,
  editAchieved,
  editPlans,
  deletePlanned,
  deleteAchieved,
  deletePlans,
  togglePlanned,
  markPlannedAchieved,
  addUnfinishedToPlans,
  cancelAddToPlans,
};

export default connect(mapState, mapDispatch)(DailyList);
