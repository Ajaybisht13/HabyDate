import {combineReducers} from 'redux';
import auth from './auth';
import theme from './theme';
import loader from './loader';
import location from './location';
import peopleLiked from './peopleLiked';
import notification from './notification';
import conversation from './conversation';
import seeker from './seeker';
import matche from './matche';

const AppReducer = combineReducers({
  auth,
  theme,
  loader,
  location,
  peopleLiked,
  notification,
  conversation,
  seeker,
  matche,
});

export default AppReducer;
