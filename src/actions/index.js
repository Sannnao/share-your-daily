export const ADD_PLANNED = 'ADD_PLANNED';
export const ADD_ACHIEVED = 'ADD_ACHIEVED';
export const ADD_PLANS = 'ADD_PLANS';

export const addPlanned = (value) => {
  return {
    type: ADD_PLANNED,
    text: value,
  }
}

export const addAchieved = (value) => {
  return {
    type: ADD_ACHIEVED,
    text: value,
  }
}

export const addPlans = (value) => {
  return {
    type: ADD_PLANS,
    text: value,
  }
}
