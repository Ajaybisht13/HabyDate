import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';

const styles = StyleSheet.create({
  container: {},
  image: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
    resizeMode: 'cover',
  },
  imageActive: {
    flex: 1,
    resizeMode: 'contain',
  },
});

export default class MessageImage extends Component {
  render() {
    const {
      containerStyle,
      lightboxProps,
      imageProps,
      imageStyle,
      currentMessage,
    } = this.props;
    if (!!currentMessage) {
      return (
        <View style={[styles.container, containerStyle]}>
          <FastImage
            {...imageProps}
            style={[styles.image, imageStyle]}
            source={{uri: currentMessage.image}}
          />
        </View>
      );
    }
    return null;
  }
}
