import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableWithoutFeedback} from 'react-native';
import regex from '../../../../utils/regex';
import FastImage from 'react-native-fast-image';
import {ONLINE} from '../../../../themes/constantColors';
import {Icon} from 'native-base';
import {distance} from '../../../../utils/location';

class SeekerUser extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {theme, item, navigation, route, location} = this.props;
    let params = route.params;

    return (
      <TouchableWithoutFeedback
        onPress={() =>
          navigation.navigate('SeekerSendRequest', {
            seeker: params.seeker,
            user: item,
          })
        }>
        <View style={[styles.container]}>
          <View
            style={[
              styles.innerView,
              {backgroundColor: theme.textInputBackgroundColor},
            ]}>
            <FastImage
              source={{uri: regex.getProfilePic(item.photos)}}
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
              }}
            />
            <FastImage
              source={require('../../../../assets/blur_effect.png')}
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                top: 0,
              }}
            />
            <View style={styles.bottomView}>
              <View style={[styles.bottomNameView]}>
                <Text style={[styles.nameText, {color: theme.backgroundColor}]}>
                  {item.name}
                  {regex.getAge(item.DoB)}
                </Text>
              </View>
              <View style={[styles.bottomNameView]}>
                <Icon
                  type={'Feather'}
                  name={'map-pin'}
                  style={{fontSize: 14, color: theme.backgroundColor}}
                />
                <Text
                  style={[
                    styles.locationText,
                    {color: theme.backgroundColor, marginLeft: 5},
                  ]}>
                  {`${distance(item.location, location, 'K')}`} km away
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default SeekerUser;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    height: 177,
    width: regex.getWindowWidth() / 2 - 20,
    overflow: 'hidden',
  },
  innerView: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
  bottomView: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    paddingBottom: 15,
    paddingHorizontal: 15,
  },
  bottomNameView: {
    flex: 1,
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineView: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: ONLINE,
    marginRight: 5,
  },
  nameText: {
    fontSize: 18,
    fontWeight: '600',
  },
  locationText: {
    fontSize: 14,
    fontWeight: '400',
  },
});
