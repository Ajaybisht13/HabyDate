import React, {Component} from 'react';
import {StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import regex from '../../../utils/regex';
import {Icon} from 'native-base';
import FastImage from 'react-native-fast-image';

class AddPhotoItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {theme, item, index, openLibrary, removePhoto} = this.props;

    return (
      <View style={[styles.container]}>
        <View
          style={[
            styles.innerView,
            {backgroundColor: theme.textInputBackgroundColor},
          ]}>
          {item.photoUrl ? (
            <View style={[styles.innerView]}>
              <FastImage
                source={{uri: item.photoUrl}}
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                }}
              />
              <TouchableWithoutFeedback onPress={() => removePhoto(index)}>
                <View style={[styles.deleteView]}>
                  <Icon
                    type={'Feather'}
                    name={'trash'}
                    style={{fontSize: 18, color: theme.backgroundColor}}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          ) : (
            <TouchableWithoutFeedback onPress={() => openLibrary(item)}>
              <View
                style={[
                  styles.innerView,
                  {alignItems: 'center', justifyContent: 'center'},
                ]}>
                <View
                  style={[
                    styles.plusView,
                    {backgroundColor: theme.backgroundColor},
                  ]}>
                  <Icon
                    type={'Feather'}
                    name={'plus'}
                    style={{fontSize: 20, color: theme.subSecondaryColor}}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>
      </View>
    );
  }
}

export default AddPhotoItem;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    height: 200,
    width: regex.getWindowWidth() / 2 - 20,
  },
  innerView: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
  plusView: {
    width: 42,
    height: 42,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    ...regex.shadow(5),
  },
  deleteView: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#1A1A1A95',
    ...regex.shadow(5),
  },
});
