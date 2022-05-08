import React, {Component} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import {connect} from 'react-redux';
import NHHeader from '../../../components/general/NHHeader';
import {Icon} from 'native-base';
import {White} from '../../../themes/constantColors';
import regex from '../../../utils/regex';
import {deleteUser} from '../../../services/userAction';
import * as messages from '../../../utils/messages';
import {
  hideLoaderAction,
  showLoaderAction,
  updateUserDataAction,
} from '../../../actions';

class Settings extends Component {
  constructor(props) {
    super(props);
    let user = props.user;
    this.state = {
      notificationOn: user.notificationOn,
      matchOn: user.matchOn,
      soundOn: user.soundOn,
    };
  }

  onBackPress = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  updateData = (parameter) => {
    this.props.updateUserDataAction(this.props.user.uid, parameter, 'settings');
  };

  notificationSwitch = (notificationOn) => {
    this.setState({notificationOn});
    this.updateData({notificationOn});
  };

  matchSwitch = (matchOn) => {
    this.setState({matchOn});
    this.updateData({matchOn});
  };

  soundSwitch = (soundOn) => {
    this.setState({soundOn});
    this.updateData({soundOn});
  };

  okClick = () => {
    this.props.showLoaderAction();
    deleteUser(this.props.user.uid).then(() => {
      this.props.hideLoaderAction();
      regex.clearData(this);
    });
  };

  onDeletePress = () => {
    Alert.alert(
      'Account Delete',
      messages.deleteMsg,
      [
        {text: 'Cancel', onPress: () => {}, style: 'cancel'},
        {text: 'OK', onPress: this.okClick},
      ],
      {cancelable: false},
    );
  };

  render() {
    const {notificationOn, matchOn, soundOn} = this.state;
    const {theme, navigation} = this.props;

    return (
      <View
        style={[
          styles.container,
          {backgroundColor: theme.container.backgroundColor},
        ]}>
        <NHHeader
          title={'Settings'}
          theme={theme}
          onLeftPress={this.onBackPress}
        />
        <View
          style={[
            styles.container,
            {backgroundColor: theme.primaryBackgroundColor},
          ]}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('AccountSetting')}>
              <View
                style={[styles.view, {backgroundColor: theme.backgroundColor}]}>
                <Text style={[styles.text, {color: theme.subPrimaryColor}]}>
                  Account Settings
                </Text>
                <Icon
                  type={'Feather'}
                  name={'chevron-right'}
                  style={{color: theme.subSecondaryColor}}
                />
              </View>
            </TouchableWithoutFeedback>
            <View
              style={[styles.view, {backgroundColor: theme.backgroundColor}]}>
              <Text style={[styles.text, {color: theme.subPrimaryColor}]}>
                Notifications
              </Text>
              <Switch
                trackColor={{false: theme.borderColor, true: theme.pinkColor}}
                thumbColor={White}
                ios_backgroundColor={'transparent'}
                onValueChange={this.notificationSwitch}
                value={notificationOn}
              />
            </View>
            <View
              style={[styles.view, {backgroundColor: theme.backgroundColor}]}>
              <Text style={[styles.text, {color: theme.subPrimaryColor}]}>
                Pause Matches
              </Text>
              <Switch
                trackColor={{false: theme.borderColor, true: theme.pinkColor}}
                thumbColor={White}
                ios_backgroundColor={'transparent'}
                onValueChange={this.matchSwitch}
                value={matchOn}
              />
            </View>
            <View
              style={[styles.view, {backgroundColor: theme.backgroundColor}]}>
              <Text style={[styles.text, {color: theme.subPrimaryColor}]}>
                Match Sound
              </Text>
              <Switch
                trackColor={{false: theme.borderColor, true: theme.pinkColor}}
                thumbColor={White}
                ios_backgroundColor={'transparent'}
                onValueChange={this.soundSwitch}
                value={soundOn}
              />
            </View>
            <View
              style={[styles.view, {backgroundColor: theme.backgroundColor}]}>
              <Text style={[styles.text, {color: theme.subPrimaryColor}]}>
                Rate this App
              </Text>
              <Icon
                type={'Feather'}
                name={'chevron-right'}
                style={{color: theme.backgroundColor}}
              />
            </View>
            <View
              style={[styles.view, {backgroundColor: theme.backgroundColor}]}>
              <Text style={[styles.text, {color: theme.subPrimaryColor}]}>
                Share this App
              </Text>
              <Icon
                type={'Feather'}
                name={'chevron-right'}
                style={{color: theme.backgroundColor}}
              />
            </View>
            <TouchableWithoutFeedback onPress={this.onDeletePress}>
              <View
                style={[styles.view, {backgroundColor: theme.backgroundColor}]}>
                <Text style={[styles.text, {color: theme.pinkColor}]}>
                  Delete Account
                </Text>
                <Icon
                  type={'Feather'}
                  name={'chevron-right'}
                  style={{color: theme.backgroundColor}}
                />
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  theme: state.theme.theme,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  showLoaderAction,
  hideLoaderAction,
  updateUserDataAction,
})(Settings);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    marginVertical: 3,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingVertical: 10,
  },
  text: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
  },
});
