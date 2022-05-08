import {
  LOGOUT,
  NOTIFICATION_UNREAD_COUNT,
  NOTIFICATIONS,
} from '../actions/types';

const initialState = {
  notifications: [],
  notificationCount: 0,
};

function notification(state = initialState, action) {
  switch (action.type) {
    case NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload.data,
        notificationCount: action.payload.count,
      };

    case NOTIFICATION_UNREAD_COUNT:
      return {...state, notificationCount: action.payload};

    case LOGOUT:
      return {
        ...state,
        conversations: [],
        notificationCount: 0,
      };

    default:
      return state;
  }
}

export default notification;
