import { DATA_ACTION_TYPES } from './actionTypes';

export const dataReducer = (state, action) => {
  switch (action.type) {
    case DATA_ACTION_TYPES.SET_LOCATION:
      return { ...state, location: action.payload };
    case DATA_ACTION_TYPES.SET_CHECK_IN:
      return { ...state, checkIn: action.payload };
    case DATA_ACTION_TYPES.SET_CHECK_OUT:
      return { ...state, checkOut: action.payload };
    case DATA_ACTION_TYPES.SET_GUESTS:
      return { ...state, guests: action.payload };
  }
};
