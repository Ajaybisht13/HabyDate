import {LOGIN, LOGOUT, SET_USER_DATA} from '../actions/types';

const initialAuthState = {
  loading: true,
  user: null,
};

function auth(state = initialAuthState, action) {
  switch (action.type) {
    case LOGIN:
      return {...state, user: action.payload, loading: false};

    case SET_USER_DATA:
      return {...state, user: action.payload};

    case LOGOUT:
      return {
        ...state,
        user: null,
        loading: false,
      };

    default:
      return state;
  }
}

export default auth;
