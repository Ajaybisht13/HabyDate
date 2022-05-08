import {HIDE_LOADER, LOGOUT, SHOW_LOADER} from '../actions/types';

const initialState = {
  showLoader: false,
};

function loader(state = initialState, action) {
  switch (action.type) {
    case SHOW_LOADER:
      return {...state, showLoader: true};

    case HIDE_LOADER:
      return {...state, showLoader: false};

    case LOGOUT:
      return {showLoader: false};

    default:
      return state;
  }
}

export default loader;
