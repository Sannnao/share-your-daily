import { v4 } from 'uuid';

export const ADD_PLANNED = 'ADD_PLANNED';
export const ADD_ACHIEVED = 'ADD_ACHIEVED';
export const ADD_PLANS = 'ADD_PLANS';

export const EDIT_PLANNED = 'EDIT_PLANNED';
export const EDIT_ACHIEVED = 'EDIT_ACHIEVED';
export const EDIT_PLANS = 'EDIT_PLANS';

export const addPlanned = (text) => {
  return {
    type: ADD_PLANNED,
    id: v4(),
    text,
  }
}

export const addAchieved = (text) => {
  return {
    type: ADD_ACHIEVED,
    id: v4(),
    text,
  }
}

export const addPlans = (text) => {
  return {
    type: ADD_PLANS,
    id: v4(),
    text,
  }
}

export const editPlanned = (id, text) => {
  return {
    type: EDIT_PLANNED,
    id,
    text,
  }
};

export const editAchieved = (id, text) => {
  return {
    type: EDIT_ACHIEVED,
    id,
    text,
  }
};

export const editPlans = (id, text) => {
  return {
    type: EDIT_PLANS,
    id,
    text,
  }
};
