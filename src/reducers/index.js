import { ADD_PLANNED, ADD_ACHIEVED, ADD_PLANS } from '../actions';
import { PLANNED, ACHIEVED, PLANS } from '../constants/sectionNames';

const listEditor = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [
        ...state,
        {
          text: action.text,
        },
      ];
    case 'EDIT': {
      const newState = [...state];

      newState[action.index].text = action.text;

      return newState;
    }
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

const addTask = (where, value) => ([
  ...where,
  {
    text: value,
  },
])

const plannedTasks = (state = [], action) => {
  switch (action.type) {
    case ADD_PLANNED:
      return addTask(state, action.text);
    default:
      return state;
  }
}

const achievedTasks = (state = [], action) => {
  switch (action.type) {
    case ADD_ACHIEVED:
      return addTask(state, action.text);
    default:
      return state;
  }
}

const plansTasks = (state = [], action) => {
  switch (action.type) {
    case ADD_PLANS:
      return addTask(state, action.text);
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
