import React, {Component} from 'react';
import {View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import regex from '../utils/regex';
import {PINK} from '../themes/constantColors';
import FastImage from 'react-native-fast-image';
import {getCurrentUser} from '../services/userAction';
import {connect} from 'react-redux';
import {loginAction, logoutAction, updateUserDataAction} from '../actions';

class Splash extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(): void {
    this.bootstrapAsync();
    regex.changeStatusStyle('default');
  }

  bootstrapAsync = async () => {
    let userToken;

    try {
      userToken = await AsyncStorage.getItem('userToken');
      if (userToken !== null) {
        getCurrentUser()
          .then((user) => {
            let stepCompleted = user.user.stepCompleted;
            if (stepCompleted > 8) {
              let data = {token: user.user.uid, ...user.user};
              regex.setDashboard(data).then((response) => {
                if (response) this.props.loginAction(data);
              });
            } else this.openAuth();
          })
          .catch((error) => {
            this.openAuth();
          });
      } else this.openAuth();
    } catch (e) {
      this.openAuth();
    }
  };

  openAuth = () => {
    regex.authSignOut(this);
    this.props.logoutAction();
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: PINK,
        }}>
        <FastImage
          source={require('./../assets/splash_logo.png')}
          style={{width: 136, height: 120}}
        />
      </View>
    );
  }
}

export default connect(null, {loginAction, logoutAction, updateUserDataAction})(
  Splash,
);
