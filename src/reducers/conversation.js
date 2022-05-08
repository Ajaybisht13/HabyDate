import {CONVERSATIONS, LOGOUT} from '../actions/types';

const initialState = {
  conversations: [],
  conversationCount: 0,
};

function conversation(state = initialState, action) {
  switch (action.type) {
    case CONVERSATIONS:
      return {
        ...state,
        conversations: action.payload.data,
        conversationCount: action.payload.count,
      };

    case LOGOUT:
      return {
        ...state,
        conversations: [],
        conversationCount: 0,
      };

    default:
      return state;
  }
}

export default conversation;
