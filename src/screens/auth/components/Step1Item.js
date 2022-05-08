import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CommonTextInput from '../../../components/general/CommonTextInput';
import CommonButton from '../../../components/general/CommonButton';
import regex from '../../../utils/regex';
import * as messages from '../../../utils/messages';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class Step1Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.data.name,
      username: props.data.username,
      email: props.data.email,
      socialType: props.data.socialType,
    };
  }

  nextPress = () => {
    const {name, username, email} = this.state;
    const {onPress} = this.props;

    if (regex.isEmpty(name)) alert(messages.enterFullName);
    else if (regex.isEmpty(username)) alert(messages.enterUserName);
    else if (!regex.validateUsername(username))
      alert(messages.enterValidUserName);
    else if (regex.isEmpty(email)) alert(messages.enterEmail);
    else if (!regex.validateEmail(email)) alert(messages.enterValidEmail);
    else onPress(1, {name, username, email});
  };

  render() {
    const {name, username, email, socialType} = this.state;
    const {theme} = this.props;

    return (
      <View
        style={[
          styles.container,
          {backgroundColor: theme.container.backgroundColor},
        ]}>
        <KeyboardAwareScrollView>
          <View>
            <Text style={[styles.titleText, {color: theme.primaryColor}]}>
              {'Basic Info'}
            </Text>
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
                editable={true}
                value={email}
                onChangeText={(email) => this.setState({email})}
              />
              <CommonButton
                theme={theme}
                container={{marginTop: regex.aspectRatio(123)}}
                backgroundColor={theme.pinkColor}
                borderColor={theme.pinkColor}
                textColor={theme.backgroundColor}
                title={'Continue'}
                onPress={this.nextPress}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default Step1Item;

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
