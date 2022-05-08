import React, {Component} from 'react';
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import NHHeader from '../../../components/general/NHHeader';
import regex from '../../../utils/regex';
import FastImage from 'react-native-fast-image';
import {Icon} from 'native-base';
import CommonButton from '../../../components/general/CommonButton';
import moment from 'moment';
import TimePicker from 'react-native-navybits-date-time-picker';
import {Black, White} from '../../../themes/constantColors';
import * as messages from '../../../utils/messages';
import {sendSeekerRequest} from '../../../services/seekerAction';
import {distance} from '../../../utils/location';
import {hideLoaderAction, showLoaderAction} from '../../../actions';
import DateTimePicker from 'react-native-modal-datetime-picker';

class SeekerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: 'Choose a category',
      dateTime: '',
      address: '',
      note: '',
      isChat: true,
      isVisible: false
    };
  }

  onBackPress = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  
  showpicker = () => {
    this.setState({
      isVisible: true
    });
  }

  _handleDatePicked = (datetime) => {
    this.setState({
      dateTime: moment(datetime).format('ddd h:mm a, DD MMM YYYY'),
      isVisible: false
    });
  };

  _hideDateTimePicker = () => {};

  chatSwitch = (isChat) => {
    this.setState({isChat});
  };

  postPress = () => {
    const {dateTime, note, address, isChat} = this.state;
    const {navigation, route} = this.props;
    let {seeker, user} = route.params;

    if (!Boolean(dateTime)) alert(messages.seekerDate);
    else if (!Boolean(address)) alert(messages.seekerAddress);
    else {
      this.props.showLoaderAction();
      let parameter = {
        request_to: user.uid,
        request_by: this.props.user.uid,
        //date: moment(dateTime).unix(),
        dateTime,
        address,
        note,
        isChat,
        seekerKey: seeker.key,
        status: 'active',
        request_status: '',
      };
      sendSeekerRequest(parameter).then(() => {
        this.props.hideLoaderAction();
        navigation.popToTop();
      });
    }
  };

  render() {
    const {selectedCategory, dateTime, note, address, isChat, isVisible} = this.state;
    const {theme, navigation, route, location} = this.props;
    let {seeker, user} = route.params;
    const {title} = seeker;

    return (
      <View
        style={[
          styles.container,
          {backgroundColor: theme.container.backgroundColor},
        ]}>
        <NHHeader title={title} theme={theme} onLeftPress={this.onBackPress} />
        <View style={[styles.innerView]}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <View style={[styles.innerView, {padding: 20}]}>
              <View
                style={[
                  styles.userView,
                  {backgroundColor: theme.secondaryColor},
                ]}>
                <FastImage
                  source={{uri: regex.getProfilePic(user.photos)}}
                  style={{width: null, height: regex.heightRatio(0.45)}}
                />
                <FastImage
                  source={require('./../../../assets/seekerphotogradient.png')}
                  style={{
                    width: null,
                    height: regex.heightRatio(0.45),
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                  }}
                />
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    marginHorizontal: 20,
                    marginBottom: 20,
                  }}>
                  <Text
                    style={{
                      fontSize: 24,
                      color: theme.backgroundColor,
                      fontWeight: '800',
                    }}>{`${user.name}${regex.getAge(user.DoB)}`}</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 5,
                    }}>
                    <Icon
                      type={'Feather'}
                      name={'map-pin'}
                      style={{fontSize: 14, color: theme.backgroundColor}}
                    />
                    <Text
                      style={[
                        styles.timeText,
                        {color: theme.backgroundColor, marginLeft: 5},
                      ]}>
                      {`${distance(user.location, location, 'K')}`} km away
                    </Text>
                  </View>
                </View>
              </View>
              {/*<View style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>*/}
              {/*    <Icon type={'Feather'} name={'list'} style={{fontSize: 16, color: theme.subPrimaryColor}}/>*/}
              {/*    <Text style={[styles.timeText, {color: theme.subPrimaryColor}]}> Category: </Text>*/}
              {/*</View>*/}
              {/*<CommonButton*/}
              {/*    theme={theme}*/}
              {/*    container={{marginTop: 5, marginHorizontal: 0}}*/}
              {/*    backgroundColor={theme.textInputBackgroundColor}*/}
              {/*    borderColor={theme.textInputBackgroundColor}*/}
              {/*    textColor={theme.subPrimaryColor}*/}
              {/*    title={selectedCategory}*/}
              {/*    onPress={this.openCategoryPress}*/}
              {/*    dropDownArrow={true}*/}
              {/*    arrowColor={theme.subPrimaryColor}*/}
              {/*/>*/}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 15,
                }}>
                <Icon
                  type={'Feather'}
                  name={'calendar'}
                  style={{fontSize: 16, color: theme.subPrimaryColor}}
                />
                <Text style={[styles.timeText, {color: theme.subPrimaryColor}]}>
                  {' '}
                  Date & Time:{' '}
                </Text>
              </View>
              <View>
                <Text></Text>
                <TouchableOpacity onPress = {this.showpicker} style = {{backgroundColor:"#F0F0F0", height:70, borderRadius:15}}>
                   <Text style= {{fontSize:14, marginTop:"7%", alignSelf:"center", color:"gray"}}>{dateTime ? dateTime : 'Select date and time'}</Text>
                </TouchableOpacity>
                <DateTimePicker
                  isVisible={this.state.isVisible}
                  mode={'datetime'}
                  onConfirm={this._handleDatePicked}
                  onCancel={this._hideDateTimePicker}
                  is24Hour={false}
                  onDateChange={dateTime ? new Date(dateTime) : new Date()}
                 />
                {/* <TimePicker
                  accentColor={White}
                  okColor={Black}
                  cancelColor={Black}
                  style={[
                    styles.dateInputView,
                    {backgroundColor: theme.textInputBackgroundColor},
                  ]}
                  customStyles={{
                    dateInput: {borderWidth: 0},
                    dateText: {color: theme.subPrimaryColor},
                  }}
                  okText={'Done'}
                  cancelText={'Cancel'}
                  mode={'datetime'}
                  placeholder={'Select date & time'}
                  is24Hour={false}
                  onConfirm={this._handleDatePicked}
                  onCancel={this._hideDateTimePicker}
                  format={'ddd h:mm a, DD MMM YYYY'}
                  minDate={new Date()}
                  date={dateTime}
                  ref="TimePicker"
                /> */}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 15,
                }}>
                <Icon
                  type={'Feather'}
                  name={'map-pin'}
                  style={{fontSize: 16, color: theme.subPrimaryColor}}
                />
                <Text style={[styles.timeText, {color: theme.subPrimaryColor}]}>
                  {' '}
                  Location:{' '}
                </Text>
              </View>
              <TextInput
                style={[
                  styles.addressTextInput,
                  {
                    color: theme.subPrimaryColor,
                    backgroundColor: theme.textInputBackgroundColor,
                  },
                ]}
                value={address}
                placeholder="Enter full address"
                placeholderTextColor={theme.subPrimaryColor}
                multiline={true}
                numberOfLines={3}
                onChangeText={(address) => this.setState({address})}
              />
              <View style={{marginVertical: 15}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 15,
                  }}>
                  <Icon
                    type={'Feather'}
                    name={'file-text'}
                    style={{fontSize: 16, color: theme.subPrimaryColor}}
                  />
                  <Text
                    style={[styles.timeText, {color: theme.subPrimaryColor}]}>
                    {' '}
                    Note:{' '}
                  </Text>
                </View>
                <TextInput
                  style={[
                    styles.bioTextInput,
                    {
                      color: theme.subPrimaryColor,
                      backgroundColor: theme.textInputBackgroundColor,
                    },
                  ]}
                  value={note}
                  placeholder="Type something here..."
                  placeholderTextColor={theme.subPrimaryColor}
                  multiline={true}
                  numberOfLines={5}
                  onChangeText={(note) => this.setState({note})}
                />
              </View>
              <View
                style={[
                  styles.itemView,
                  styles.commonView,
                  {borderColor: theme.borderColor},
                ]}>
                <Text
                  style={[styles.commonTitleText, {color: theme.primaryColor}]}>
                  {'You need to chat?'}
                </Text>
                <View style={[styles.rightRowView]}>
                  <Switch
                    trackColor={{false: theme.pinkColor, true: theme.pinkColor}}
                    thumbColor={White}
                    ios_backgroundColor={'transparent'}
                    onValueChange={this.chatSwitch}
                    value={isChat}
                  />
                </View>
              </View>
              <CommonButton
                theme={theme}
                container={{marginVertical: 20, marginHorizontal: 0}}
                backgroundColor={theme.pinkColor}
                borderColor={theme.pinkColor}
                textColor={theme.backgroundColor}
                title={'Post'}
                onPress={this.postPress}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  theme: state.theme.theme,
  user: state.auth.user,
  location: state.location.location,
});

export default connect(mapStateToProps, {showLoaderAction, hideLoaderAction})(
  SeekerForm,
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerView: {
    flex: 1,
  },
  userView: {
    height: regex.heightRatio(0.45),
    borderRadius: 5,
    overflow: 'hidden',
  },
  dateInputView: {
    width: regex.getWindowWidth() - 40,
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '400',
  },
  addressTextInput: {
    flex: 1,
    height: 70,
    padding: 15,
    paddingTop: 15,
    borderRadius: 15,
    marginTop: 10,
  },
  bioTextInput: {
    flex: 1,
    height: 100,
    padding: 15,
    paddingTop: 15,
    borderRadius: 15,
    marginTop: 10,
  },
  itemView: {
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  commonTitleText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  rightRowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const customStyle = {};
