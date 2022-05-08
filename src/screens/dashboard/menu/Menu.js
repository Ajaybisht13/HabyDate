import React, {Component} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Alert,
  Linking
} from 'react-native';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import regex from '../../../utils/regex';
import CommonButton from '../../../components/general/CommonButton';
import * as messages from '../../../utils/messages';
import {logoutAction, updateUserDataAction} from '../../../actions';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        // {
        //   id: 1,
        //   title: 'My Membership',
        //   count: 0,
        // },
        {
          id: 2,
          title: 'Matches',
          count: 0,
        },
        {
          id: 3,
          title: 'Messages',
          count: 0,
        },
        {
          id: 4,
          title: 'Notifications',
          count: 0,
        },
        {
          id: 5,
          title: 'Seekers',
          count: 0,
        },
        // {
        //   id: 6,
        //   title: 'Invite Friends',
        //   count: 0,
        // },
        // {
        //     id: 7,
        //     title: 'Language (s)',
        //     count: 0,
        // },
        {
          id: 8,
          title: 'Terms and Conditions',
          count: 0,
        },
        {
          id: 9,
          title: 'Privacy Policy',
          count: 0,
        },
        {
          id: 10,
          title: 'Refund policy',
          count: 0,
        },
        {
          id: 11,
          title: 'Settings',
          count: 0,
        },
        {
          id: 12,
          title: 'Logout',
          count: 0,
        },
      ],
    };
  }

  onItemPress = (item) => {
    const {navigation} = this.props;
    if (item.id !== 10) navigation.closeDrawer();

    if (item.id === 1) {
      //navigation.navigate('Payments');
    } else if (item.id === 2) {
      navigation.navigate('Matches');
    } else if (item.id === 3) {
      navigation.navigate('Messages');
    } else if (item.id === 4) {
      navigation.navigate('Notifications');
    } else if (item.id === 5) {
      navigation.navigate('Seekers');
    } else if (item.id === 6) {
    } else if (item.id === 7) {
    } else if (item.id === 8) {
      this.termsAndCondition();
    } else if (item.id === 9) {
      this.privacyPolicy();
    } else if (item.id === 10) {
      this.RefundPolicy();
    } else if (item.id === 11) {
      navigation.navigate('Settings');
    } else if (item.id === 12) {
      this.logout();
    }
  };

  termsAndCondition = () => {
    Linking.openURL('http://habydate.com/term-condition/')
  }

  privacyPolicy = () => {
    Linking.openURL('http://habydate.com/privacy-policy/')
  }

  RefundPolicy = () => {
    Linking.openURL('http://habydate.com/refund-policy/')
  }


  logout = () => {
    Alert.alert(
      'Logout',
      messages.logout,
      [
        {text: 'Cancel', onPress: () => {}, style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            this.props.navigation.closeDrawer();
            regex.clearData(this);
            this.props.logoutAction();
          },
        },
      ],
      {cancelable: false},
    );
  };

  renderItem = ({item, index}) => {
    const {theme, user, notificationCount, conversationCount} = this.props;

    let count = 0;
    if (item.id === 1) count = regex.getDayLeft(user.packageEndDate);
    else if (item.id === 3) count = conversationCount;
    else if (item.id === 4) count = notificationCount;

    return (
      <TouchableWithoutFeedback onPress={() => this.onItemPress(item)}>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 15,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 16, color: '#333333', fontWeight: '400'}}>
            {item.title}
          </Text>
          {index === 0 && count > 0 ? (
            <Text
              style={{
                marginLeft: 10,
                fontSize: 14,
                color: theme.pinkColor,
                fontWeight: '800',
              }}>
              {count} days left
            </Text>
          ) : (
            count > 0 && (
              <View
                style={{
                  marginLeft: 10,
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: theme.pinkColor,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: theme.backgroundColor,
                    fontWeight: '800',
                  }}></Text>
              </View>
            )
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    const {data} = this.state;
    const {user, theme, navigation} = this.props;

    return (
      <View
        style={[
          styles.container,
          {backgroundColor: theme.container.backgroundColor},
        ]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <View style={[styles.innerView]}>
            <View style={[styles.imageView, {...regex.shadow(5)}]}>
              <FastImage
                source={{uri: regex.getProfilePic(user.photos)}}
                style={[styles.imageView]}
              />
            </View>
            <Text style={[styles.nameText, {color: theme.primaryColor}]}>{`${
              user.name
            }${regex.getAge(user.DoB)}`}</Text>
            <CommonButton
              theme={theme}
              container={{
                marginTop: 10,
                marginBottom: 20,
                marginHorizontal: 0,
                width: 120,
              }}
              innerContainer={{paddingVertical: 10}}
              backgroundColor={theme.primaryColor}
              borderColor={theme.primaryColor}
              textColor={theme.backgroundColor}
              title={'My Profile'}
              onPress={() => navigation.navigate('MyProfile')}
            />
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={data}
              extraData={data}
              renderItem={this.renderItem}
              keyExtractor={(item) => item.id.toString()}
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
  notificationCount: state.notification.notificationCount,
  conversationCount: state.conversation.conversationCount,
});

export default connect(mapStateToProps, {logoutAction, updateUserDataAction})(
  Menu,
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerView: {
    flex: 1,
    marginHorizontal: 20,
    paddingTop: regex.aspectRatio(45),
  },
  imageView: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  nameText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: '500',
  },
});
