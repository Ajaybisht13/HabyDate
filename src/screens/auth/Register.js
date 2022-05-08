import React, {Component} from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
  Linking,
  TouchableWithoutFeedback,
} from 'react-native';
import {connect} from 'react-redux';
import NHHeader from '../../components/general/NHHeader';
import {BORDER} from '../../themes/constantColors';
import {Icon} from 'native-base';
import CountryPicker from 'react-native-country-picker-modal';
import regex from '../../utils/regex';
import CommonButton from '../../components/general/CommonButton';
import * as messages from '../../utils/messages';
import {signInPhone} from '../../services/socialLogin';
import {hideLoaderAction, showLoaderAction} from '../../actions';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryCode: 'US',
      callingCode: ['1'],
      phone_number: '',
      visibleCountryCode: false,
    };
  }

  onBackPress = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  nextPress = () => {
    const {phone_number, callingCode} = this.state;
    const {navigation} = this.props;

    if (regex.isEmpty(phone_number)) alert(messages.enterPhoneNumber);
    else {
      let phone = `+${callingCode}${phone_number}`;

      // Request to send OTP
      if (regex.validatePhoneNumber(phone)) {
        this.props.showLoaderAction();
        signInPhone(phone)
          .then((confirmResult) => {
            this.props.hideLoaderAction();
            navigation.navigate('Verification', {
              callingCode,
              phone_number,
              confirmResult,
            });
          })
          .catch((error) => {
            this.props.hideLoaderAction();
            alert(error.message);
          });
      } else alert('Invalid Phone Number');
    }
  };

  termsAndCondition = () => {
    Linking.openURL('http://habydate.com/term-condition/')
  }

  privacyPolicy = () => {
    Linking.openURL('http://habydate.com/privacy-policy/')
  }

  joinNowPress = () => {
    const {navigation} = this.props;

    Keyboard.dismiss();
    this.setState({
      countryCode: 'US',
      callingCode: ['1'],
      phone_number: '',
    });
    navigation.navigate('Login');
  };

  render() {
    const {phone_number, countryCode, visibleCountryCode} = this.state;
    const {theme} = this.props;

    let title = 'Create new account';
    let subTitle = 'Enter your phone number to Sign Up';
    let infoText = `Already have an account? `;
    let actionText = 'Log In';

    return (
      <View
        style={[
          styles.container,
          {backgroundColor: theme.container.backgroundColor},
        ]}>
        <NHHeader theme onLeftPress={this.onBackPress} />
        <KeyboardAwareScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={{flex: 1}}>
              <Text style={[styles.titleText, {color: theme.primaryColor}]}>
                {title}
              </Text>
              <Text
                style={[styles.subTitleText, {color: theme.subPrimaryColor}]}>
                {subTitle}
              </Text>
              <View style={styles.textView}>
                <TouchableWithoutFeedback
                  onPress={() => this.setState({visibleCountryCode: true})}>
                  <View
                    style={{
                      paddingHorizontal: 15,
                      height: 55,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <CountryPicker
                        onSelect={(value) => {
                          this.setState({
                            countryCode: value.cca2,
                            callingCode: value.callingCode,
                          });
                        }}
                        styles={{itemCountryName: {borderBottomWidth: 0}}}
                        countryCode={countryCode}
                        withCallingCodeButton={true}
                        withFlag={true}
                        withEmoji={true}
                        withFilter={true}
                        withCallingCode={true}
                        withFlagButton={false}
                        withAlphaFilter={true}
                        visible={visibleCountryCode}
                        onClose={() =>
                          this.setState({visibleCountryCode: false})
                        }
                        translation="eng">
                        <Text>{`+${countryCode}`}</Text>
                      </CountryPicker>
                      <Icon
                        type={'Feather'}
                        name={'chevron-down'}
                        style={{fontSize: 20, color: theme.primaryColor}}
                      />
                    </View>
                  </View>
                </TouchableWithoutFeedback>
                <View
                  style={[
                    styles.textInput,
                    {backgroundColor: theme.backgroundColor},
                  ]}>
                  <TextInput
                    style={{flex: 1, color: theme.primaryColor}}
                    value={phone_number}
                    placeholder="Phone Number"
                    placeholderTextColor={theme.primaryColor}
                    keyboardType={'phone-pad'}
                    maxLength={15}
                    onChangeText={(phone_number) =>
                      this.setState({phone_number})
                    }
                  />
                </View>
              </View>
              <CommonButton
                theme={theme}
                container={{marginTop: 30}}
                backgroundColor={theme.pinkColor}
                borderColor={theme.pinkColor}
                textColor={theme.backgroundColor}
                title={'Next'}
                onPress={this.nextPress}
              />
              <View
                style={{
                  marginHorizontal: 20,
                  marginTop: regex.aspectRatio(45),
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <Text
                  style={[styles.againText, {color: theme.subPrimaryColor}]}>
                  {infoText}
                </Text>
                <Text
                  style={[
                    styles.againText,
                    {color: theme.pinkColor, fontWeight: '600'},
                  ]}
                  onPress={this.joinNowPress}>
                  {actionText}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  marginHorizontal: 20,
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  paddingBottom: 25,
                }}>
                <Text style={[styles.infoText, {color: theme.subPrimaryColor}]}>
                  By creating an account, you agree to our
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Text onPress={() => {this.termsAndCondition()}} style={[styles.infoText, {color: theme.primaryColor}]}>
                    Terms & Conditions
                  </Text>
                  <Text
                    style={[styles.infoText, {color: theme.subPrimaryColor}]}>
                    {' '}
                    and{' '}
                  </Text>
                  <Text onPress={() => {this.privacyPolicy()}} style={[styles.infoText, {color: theme.primaryColor}]}>
                    Privacy policy
                  </Text>
                  <Text
                    style={[styles.infoText, {color: theme.subPrimaryColor}]}>
                    {' '}
                    of HabyDate
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  theme: state.theme.theme,
});

export default connect(mapStateToProps, {showLoaderAction, hideLoaderAction})(
  Register,
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    marginHorizontal: 20,
    marginTop: 15,
    fontSize: 26,
    fontWeight: '800',
  },
  subTitleText: {
    marginHorizontal: 20,
    marginVertical: 15,
    fontSize: 16,
    fontWeight: '400',
  },
  textView: {
    marginHorizontal: 20,
    marginTop: regex.aspectRatio(50),
    flexDirection: 'row',
    borderWidth: 1.5,
    borderColor: BORDER,
    backgroundColor: BORDER,
    height: 55,
    borderRadius: 28,
    overflow: 'hidden',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    paddingRight: 10,
    paddingLeft: 10,
  },
  againText: {
    fontSize: 16,
    fontWeight: '400',
  },
  infoText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
