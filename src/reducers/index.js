import {
  ADD_PLANNED,
  ADD_ACHIEVED,
  ADD_PLANS,
  EDIT_PLANNED,
  EDIT_ACHIEVED,
  EDIT_PLANS,
} from '../actions';
import { PLANNED, ACHIEVED, PLANS } from '../constants/sectionNames';

const listEditor = (state = [], action) => {
  switch (action.type) {
    case 'TOGGLE': {
      const newState = [...state];

      newState[action.index].achieved = !newState[action.index].achieved;

      return newState;
    }
    case 'DELETE':
      return [...state].splice(action.index, 1);
    default:
      return state;
  }
};

const addTask = (state, id, text) => ([
  ...state,
  {
    id,
    text,
  },
])

const editTask = (state, id, text) => {
  return state.map((task) => {
    return task.id === id
      ? {
        ...task,
        text,
      }
      : task;
  });
}

const plannedTasks = (state = [], action) => {
  switch (action.type) {
    case ADD_PLANNED:
      return addTask(state, action.id, action.text);
    case EDIT_PLANNED:
      return editTask(state, action.id, action.text);
    default:
      return state;
  }
}

const achievedTasks = (state = [], action) => {
  switch (action.type) {
    case ADD_ACHIEVED:
      return addTask(state, action.id, action.text);
    case EDIT_ACHIEVED:
      return editTask(state, action.id, action.text);
    default:
      return state;
  }
}

const plansTasks = (state = [], action) => {
  switch (action.type) {
    case ADD_PLANS:
      return addTask(state, action.id, action.text);
    case EDIT_PLANS:
      return editTask(state, action.id, action.text);
    default:
      return state;
  }
}

const rootReducer = (state = {}, action) => {
  return {
    ...state,
    plannedTasks: plannedTasks(state.plannedTasks, action),
    achievedTasks: achievedTasks(state.achievedTasks, action),
    plansTasks: plansTasks(state.plansTasks, action),
  }
}

export default rootReducer;
