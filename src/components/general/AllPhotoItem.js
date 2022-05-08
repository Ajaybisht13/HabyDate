import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import regex from '../../utils/regex';

class AllPhotoItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {theme, item} = this.props;

    return (
      <View style={[styles.container, {borderColor: theme.borderColor}]}>
        <FastImage source={{uri: item.photoUrl}} style={[styles.imageView]} />
      </View>
    );
  }
}

export default AllPhotoItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: regex.heightRatio(0.22),
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    overflow: 'hidden',
  },
  imageView: {
    width: null,
    height: regex.heightRatio(0.22),
    borderRadius: 10,
  },
});
