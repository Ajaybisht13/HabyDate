'use strict';

import {Dimensions, Platform, StatusBar} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Black, TIMETEXTCOLOR} from '../themes/constantColors';
import moment from 'moment';
import auth from '@react-native-firebase/auth';

const helper = {
  getOS: () => Platform.OS,

  getWindowHeight: () => Dimensions.get('window').height,

  getWindowWidth: () => Dimensions.get('window').width,

  aspectRatio: (value) => (value * helper.getWindowHeight()) / 568,

  heightRatio: (value) => value * helper.getWindowHeight(),

  shadow: (elevation = 4, spread = 5, offsetX = 0, offsetY = 0) => {
    return Platform.select({
      ios: {
        shadowOffset: {
          width: offsetX,
          height: offsetY,
        },
        shadowOpacity: 0.5,
        shadowRadius: spread,
        shadowColor: TIMETEXTCOLOR,
      },
      android: {
        elevation: elevation,
      },
    });
  },

  getSwipeCardLimit: () => 5,

  isEmpty: (val) => {
    switch (val) {
      case '':
      case 0:
      case '0':
      case null:
      case false:
      case undefined:
      case typeof this === 'undefined':
        return true;
      default:
        return false;
    }
  },

  validateEmail: (val) => {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      val,
    );
  },

  validatePhoneNumber: (val) => {
    return /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/.test(val);
  },

  validateUsername: (val) => {
    return /^[A-Za-z0-9_]{3,20}$/.test(val);
  },

  isInt: (n) => {
    return Number(n) === n && n % 1 === 0;
  },

  changeStatusStyle: (type) => {
    StatusBar.setBarStyle(type, true);
    if (helper.getOS() === 'android')
      StatusBar.setBackgroundColor(Black, false);
  },

  getProfilePic: (photos) => {
    if (photos !== undefined) {
      if (photos.length > 0) return photos[0].photoUrl;
      else
        return 'https://i7.uihere.com/icons/263/936/60/user-avatar-dad7b8c4dcef5018355540aed51e83ea.png';
    } else
      return 'https://i7.uihere.com/icons/263/936/60/user-avatar-dad7b8c4dcef5018355540aed51e83ea.png';
  },

  getAge: (dob) => {
    if (Boolean(dob)) {
      let birthday = moment(dob, 'MM / DD / YYYY');
      let age = moment().diff(birthday, 'years');
      if (age > 0) return `, ${age}`;
      else return '';
    } else {
      return '';
    }
  },

  setDashboard: (data) => {
    return new Promise(async (resolve, reject) => {
      await AsyncStorage.setItem('userToken', JSON.stringify(data.token));
      helper.changeStatusStyle('light-content');
      resolve(true);
    });
  },

  checkPremiumUser: (packageEndDate) => {
    return Boolean(packageEndDate);
  },

  getDayLeft: (packageEndDate) => {
    if (helper.checkPremiumUser(packageEndDate)) {
      let endDate = moment.unix(packageEndDate).local();
      let startData = moment();
      return endDate.diff(startData, 'days');
    } else return 0;
  },

  getDaysLeft: (packageEndDate) => {
    if (helper.checkPremiumUser(packageEndDate)) {
      return ('Premium Plan Activated');
    } else return ('Upgrade Premium');
  },

  isPremiumUser: (packageEndDate) => {
    return helper.getDayLeft(packageEndDate) !== 0;
  },

  authSignOut: (context) => {
    let user = auth().currentUser;
    if (Boolean(user)) {
      let getUser = user._user;
      let uid = getUser.uid;
      context.props.updateUserDataAction(uid, {online: false}, 'register');
      auth()
        .signOut()
        .then(() => console.log('User signed out!'));
    }
  },

  clearData: async (context) => {
    helper.authSignOut(context);
    helper.changeStatusStyle('default');
    await AsyncStorage.clear();
  },
};

export default helper;
