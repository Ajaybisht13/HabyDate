import {
  CONVERSATIONS,
  GET_LOCATION,
  HIDE_LOADER,
  LOGIN,
  LOGOUT,
  MATCHES,
  MY_SEND_SEEKER_REQUESTS,
  NOTIFICATION_UNREAD_COUNT,
  NOTIFICATIONS,
  PEOPLE_WHO_LIKED,
  PEOPLE_WHO_LIKED_COUNT,
  SEEKER_REQUESTS,
  SEEKER_REQUESTS_COUNT,
  SET_USER_DATA,
  SHOW_LOADER,
  SWIPECARDLIMIT,
} from './types';
import {getNotificationLists} from '../services/notificationsAction';
import {getAllConversationLists} from '../services/conversationsAction';
import {getWhoLikedMeLists} from '../services/swipeCardAction';
import {
  getMySeekerRequestLists,
  getSeekerRequestLists,
} from '../services/seekerAction';
import {getAllMatchesLists} from '../services/matchesAction';
import {updateUserAction} from '../services/userAction';

export const loginAction = (data) => (dispatch) => {
  dispatch({type: LOGIN, payload: data});
};

export const logoutAction = () => (dispatch) => {
  dispatch({type: LOGOUT});
};

export const showLoaderAction = () => (dispatch) => {
  dispatch({type: SHOW_LOADER});
};

export const hideLoaderAction = () => (dispatch) => {
  dispatch({type: HIDE_LOADER});
};

export const swipeCardLimitAction = (value) => (dispatch) => {
  dispatch({
    type: SWIPECARDLIMIT,
    payload: value,
  });
};

export const updateLocationAction = (coords) => (dispatch) => {
  dispatch({type: GET_LOCATION, payload: coords});
};

export const notificationCountAction = () => (dispatch) => {
  dispatch({
    type: NOTIFICATION_UNREAD_COUNT,
    payload: 0,
  });
};

export const notificationAction = (parameter) => (dispatch) => {
  return new Promise((resolve, reject) => {
    getNotificationLists(parameter).then((response) => {
      dispatch({
        type: NOTIFICATIONS,
        payload: response,
      });
      resolve(response.data);
    });
  });
};

export const getAllConversationListAction = (uid) => (dispatch) => {
  return new Promise((resolve, reject) => {
    getAllConversationLists(uid).then((response) => {
      dispatch({
        type: CONVERSATIONS,
        payload: response,
      });
      resolve(response.data);
    });
  });
};

export const peopleWhoLikedAction = (parameter) => (dispatch) => {
  return new Promise((resolve, reject) => {
    getWhoLikedMeLists(parameter).then((response) => {
      dispatch({
        type: PEOPLE_WHO_LIKED,
        payload: response,
      });
      resolve(response.data);
    });
  });
};

export const peopleWhoLikedCountCountAction = () => (dispatch) => {
  dispatch({
    type: PEOPLE_WHO_LIKED_COUNT,
    payload: 0,
  });
};

export const seekerRequestListAction = (parameter) => (dispatch) => {
  return new Promise((resolve, reject) => {
    getSeekerRequestLists(parameter).then((response) => {
      dispatch({
        type: SEEKER_REQUESTS,
        payload: response,
      });
      resolve(response.data);
    });
  });
};

export const mySeekerRequestListAction = (uid) => (dispatch) => {
  return new Promise((resolve, reject) => {
    getMySeekerRequestLists(uid).then((response) => {
      dispatch({
        type: MY_SEND_SEEKER_REQUESTS,
        payload: response,
      });
      resolve(response);
    });
  });
};

export const seekerRequestCountAction = () => (dispatch) => {
  dispatch({
    type: SEEKER_REQUESTS_COUNT,
    payload: 0,
  });
};

export const matchesAction = (uid, isGetConversation) => (dispatch) => {
  return new Promise((resolve, reject) => {
    getAllMatchesLists(uid, isGetConversation).then((response) => {
      dispatch({
        type: MATCHES,
        payload: response,
      });
      resolve(response);
    });
  });
};

export const updateUserDataAction = (uid, parameter, callFrom) => (
  dispatch,
) => {
  console.log(parameter);
  return new Promise((resolve, reject) => {
    updateUserAction(uid, parameter, callFrom).then((response) => {
      if (callFrom !== 'register') {
        dispatch({
          type: SET_USER_DATA,
          payload: response,
        });
      }
      resolve(response);
    });
  });
};
