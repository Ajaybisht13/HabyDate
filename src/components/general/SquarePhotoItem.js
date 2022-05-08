import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import regex from '../../utils/regex';
import FastImage from 'react-native-fast-image';

class SquarePhotoItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {theme, item} = this.props;

    return (
      <View style={[styles.container]}>
        <FastImage source={{uri: item.photoUrl}} style={[styles.imageView]} />
      </View>
    );
  }
}

export default SquarePhotoItem;

const totalWidth = regex.getWindowWidth() - 40;

const styles = StyleSheet.create({
  container: {
    height: totalWidth / 3,
    width: totalWidth / 3,
    borderRadius: 10,
  },
  imageView: {
    height: totalWidth / 3 - 10,
    width: totalWidth / 3 - 10,
    borderRadius: 10,
  },
});
