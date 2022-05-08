import {
  LOGOUT,
  PEOPLE_WHO_LIKED,
  PEOPLE_WHO_LIKED_COUNT,
} from '../actions/types';

const initialState = {
  peopleWhoLiked: [],
  whoLikedUnreadCount: 0,
};

function peopleLiked(state = initialState, action) {
  switch (action.type) {
    case PEOPLE_WHO_LIKED:
      return {
        ...state,
        peopleWhoLiked: action.payload.data,
        whoLikedUnreadCount: action.payload.count,
      };

    case PEOPLE_WHO_LIKED_COUNT:
      return {...state, whoLikedUnreadCount: action.payload};

    case LOGOUT:
      return {
        ...state,
        peopleWhoLiked: [],
        whoLikedUnreadCount: 0,
      };

    default:
      return state;
  }
}

export default peopleLiked;
