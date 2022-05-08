import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Input, Item, Label} from 'native-base';

class CommonTextInput extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {theme, placeholder} = this.props;

    return (
      <View style={[styles.viewContainer]}>
        <Item floatingLabel style={{marginLeft: 20, marginRight: 20}}>
          <Label>{placeholder}</Label>
          <Input
            style={{paddingLeft: 0}}
            autoCapitalize={'none'}
            {...this.props}
          />
        </Item>
      </View>
    );
  }
}

export default CommonTextInput;

const styles = StyleSheet.create({
  viewContainer: {
    marginVertical: 10,
  },
});
