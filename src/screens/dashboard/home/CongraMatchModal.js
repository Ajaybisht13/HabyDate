import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableWithoutFeedback} from 'react-native';
import NHHeader from '../../../components/general/NHHeader';
import {Icon} from 'native-base';
import CommonButton from '../../../components/general/CommonButton';
import FastImage from 'react-native-fast-image';
import regex from '../../../utils/regex';
import {ONLINE} from '../../../themes/constantColors';
import {distance} from '../../../utils/location';

class CongraMatchModal extends Component {
  constructor(props) {
    super(props);
  }

  onClosePress = () => {
    const {onClose} = this.props;
    onClose();
  };

  onSendMessagePress = () => {
    this.onClosePress();
    const {uid, data, navigation} = this.props;
    let matches_id = `${uid}${data.uid}`;
    navigation.navigate('Chat', {
      conversation: {matches_id, user: data},
      type: 'messages',
    });
  };

  onKeepExploringPress = () => {
    const {onClose} = this.props;
    onClose();
  };

  render() {
    const {theme, data, location} = this.props;

    return (
      <View
        style={[
          styles.container,
          {backgroundColor: theme.container.backgroundColor},
        ]}>
        <NHHeader
          title={'Congratulations!'}
          titleStyle={{fontSize: 14, fontWeight: '400'}}
          theme={theme}
          leftView={
            <TouchableWithoutFeedback onPress={this.onClosePress}>
              <View style={styles.buttonView}>
                <Icon
                  type={'Feather'}
                  name={'x'}
                  style={{fontSize: 28, color: theme.subSecondaryColor}}
                />
              </View>
            </TouchableWithoutFeedback>
          }
        />
        <View
          style={[
            styles.innerContainer,
            {backgroundColor: theme.container.backgroundColor},
          ]}>
          <Text
            style={[
              styles.matchTitleText,
              {color: theme.pinkColor},
            ]}>{`It's Match`}</Text>
          <View style={[styles.cardView]}>
            <View
              style={[
                styles.cardInnerView,
                {
                  backgroundColor: theme.backgroundColor,
                  borderColor: theme.subSecondaryColor,
                },
              ]}>
              <FastImage
                source={{uri: regex.getProfilePic(data.photos)}}
                style={{flex: 1, borderRadius: 20, overflow: 'hidden'}}
              />
              <FastImage
                source={require('./../../../assets/blur_effect.png')}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  top: 0,
                  borderRadius: 20,
                  overflow: 'hidden',
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  left: 0,
                  bottom: 0,
                }}>
                <View
                  style={{position: 'absolute', right: 0, left: 0, bottom: 20}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    {data.online && <View style={styles.onlineView} />}
                    <Text
                      style={[styles.nameText, {color: theme.backgroundColor}]}>
                      {data.name}
                      {regex.getAge(data.DoB)}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginVertical: 5,
                    }}>
                    <Icon
                      type={'Feather'}
                      name={'map-pin'}
                      style={{fontSize: 16, color: theme.backgroundColor}}
                    />
                    <Text
                      style={[
                        styles.locationText,
                        {color: theme.backgroundColor, marginLeft: 5},
                      ]}>
                      {`${distance(data.location, location, 'K')}`} km away
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <CommonButton
            theme={theme}
            container={{marginVertical: 10}}
            backgroundColor={theme.pinkColor}
            borderColor={theme.pinkColor}
            textColor={theme.backgroundColor}
            title={'Send message'}
            onPress={this.onSendMessagePress}
          />
          <CommonButton
            theme={theme}
            container={{marginVertical: 10, marginBottom: 20}}
            backgroundColor={theme.backgroundColor}
            borderColor={theme.pinkColor}
            textColor={theme.pinkColor}
            title={'Keep exploring'}
            onPress={this.onKeepExploringPress}
          />
        </View>
      </View>
    );
  }
}

export default CongraMatchModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonView: {
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    flex: 1,
  },
  matchTitleText: {
    fontSize: 34,
    fontWeight: '700',
    textAlign: 'center',
  },
  cardView: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  cardInnerView: {
    flex: 1,
    borderRadius: 20,
    justifyContent: 'center',
    borderWidth: 1,
    ...regex.shadow(),
  },
  onlineView: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: ONLINE,
    marginRight: 5,
  },
  nameText: {
    fontSize: 24,
    fontWeight: '800',
  },
  locationText: {
    fontSize: 16,
    fontWeight: '800',
  },
});
