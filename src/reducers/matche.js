import {LOGOUT, MATCHES, SWIPECARDLIMIT} from '../actions/types';

const initialAuthState = {
  swipeCardLimit: 0,
  matches: [],
};

function matche(state = initialAuthState, action) {
  switch (action.type) {
    case SWIPECARDLIMIT:
      return {...state, swipeCardLimit: action.payload};

    case MATCHES:
      return {...state, matches: action.payload};

    case LOGOUT:
      return {
        ...state,
        swipeCardLimit: 0,
        matches: [],
      };

    default:
      return state;
  }
}

export default matche;
