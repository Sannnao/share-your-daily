import { combineReducers } from 'redux';
import {
  ADD_PLANNED,
  ADD_ACHIEVED,
  ADD_PLANS,
  EDIT_PLANNED,
  EDIT_ACHIEVED,
  EDIT_PLANS,
  DELETE_PLANNED,
  DELETE_ACHIEVED,
  DELETE_PLANS,
} from '../actions';
import { PLANNED, ACHIEVED, PLANS } from '../constants/sectionNames';

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

const deleteTask = (state, id) => {
  return state.filter((task) => task.id !== id);
}

const plannedTasks = (state = [], action) => {
  switch (action.type) {
    case ADD_PLANNED:
      return addTask(state, action.id, action.text);
    case EDIT_PLANNED:
      return editTask(state, action.id, action.text);
    case DELETE_PLANNED:
      return deleteTask(state, action.id);
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
    case DELETE_ACHIEVED:
      return deleteTask(state, action.id);
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
    case DELETE_PLANS:
      return deleteTask(state, action.id);
    default:
      return state;
  }
}

const rootReducer = combineReducers({
    plannedTasks: plannedTasks,
    achievedTasks: achievedTasks,
    plansTasks: plansTasks,
  })


export default rootReducer;
