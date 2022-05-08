import {
  LOGOUT,
  MY_SEND_SEEKER_REQUESTS,
  SEEKER_REQUESTS,
  SEEKER_REQUESTS_COUNT,
} from '../actions/types';

const initialAuthState = {
  mySendSeekerRequests: [],
  seekerRequests: [],
  seekerUnreadCount: 0,
};

function seeker(state = initialAuthState, action) {
  switch (action.type) {
    case MY_SEND_SEEKER_REQUESTS:
      return {...state, mySendSeekerRequests: action.payload};

    case SEEKER_REQUESTS:
      return {
        ...state,
        seekerRequests: action.payload.data,
        seekerUnreadCount: action.payload.count,
      };

    case SEEKER_REQUESTS_COUNT:
      return {...state, seekerUnreadCount: action.payload};

    case LOGOUT:
      return {
        ...state,
        seekerRequests: [],
        mySendSeekerRequests: [],
        seekerUnreadCount: 0,
      };

    default:
      return state;
  }
}

export default seeker;
