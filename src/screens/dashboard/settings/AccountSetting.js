import React, {Component} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import CommonTextInput from '../../../components/general/CommonTextInput';
import CommonButton from '../../../components/general/CommonButton';
import regex from '../../../utils/regex';
import {connect} from 'react-redux';
import NHHeader from '../../../components/general/NHHeader';
import * as messages from '../../../utils/messages';
import {
  hideLoaderAction,
  showLoaderAction,
  updateUserDataAction,
} from '../../../actions';

class AccountSetting extends Component {
  constructor(props) {
    super(props);
    let user = props.user;
    this.state = {
      socialType: user.socialType,
      name: user.name,
      username: user.username,
      email: user.email,
      // phone: user.phone,
    };
  }

  onBackPress = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  nextPress = () => {
    const {name, username, email} = this.state;

    if (regex.isEmpty(name)) {
      alert(messages.enterFullName);
    } else if (regex.isEmpty(username)) {
      alert(messages.enterUserName);
    } else if (!regex.validateUsername(username)) {
      alert(messages.enterValidUserName);
    } else if (regex.isEmpty(email)) {
      alert(messages.enterEmail);
    } else if (!regex.validateEmail(email)) {
      alert(messages.enterValidEmail);
    } else {
      this.props.showLoaderAction();
      this.props
        .updateUserDataAction(
          this.props.user.uid,
          this.state,
          'account_setting',
        )
        .then(() => {
          this.props.hideLoaderAction();
          this.onBackPress();
        });
    }
  };

  render() {
    const {name, username, email, phone, socialType} = this.state;
    const {theme} = this.props;

    return (
      <View
        style={[
          styles.container,
          {backgroundColor: theme.container.backgroundColor},
        ]}>
        <NHHeader
          title={'Account Setting'}
          theme={theme}
          onLeftPress={this.onBackPress}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <View>
            <CommonTextInput
              autoCompleteType={'name'}
              placeholder={'Full Name'}
              keyboardType={'default'}
              value={name}
              onChangeText={(name) => this.setState({name})}
            />
            <CommonTextInput
              autoCompleteType={'username'}
              placeholder={'Username'}
              keyboardType={'default'}
              value={username}
              onChangeText={(username) => this.setState({username})}
            />
            <CommonTextInput
              autoCompleteType={'email'}
              placeholder={'Email'}
              keyboardType={'email-address'}
              editable={socialType === 'phone'}
              value={email}
              onChangeText={(email) => this.setState({email})}
            />
            {/*<CommonTextInput*/}
            {/*    placeholder={'Phone'}*/}
            {/*    keyboardType={'phone-pad'}*/}
            {/*    value={phone}*/}
            {/*    onChangeText={(phone)=>this.setState({phone})}*/}
            {/*    editable={false}*/}
            {/*/>*/}
            <CommonButton
              theme={theme}
              container={{marginTop: 45}}
              backgroundColor={theme.pinkColor}
              borderColor={theme.pinkColor}
              textColor={theme.backgroundColor}
              title={'Done'}
              onPress={this.nextPress}
            />
          </View>
        </ScrollView>
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
})(AccountSetting);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: regex.getWindowWidth(),
  },
  titleText: {
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: 10,
    fontSize: 26,
    fontWeight: '800',
  },
});
