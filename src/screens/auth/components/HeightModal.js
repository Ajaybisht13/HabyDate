import React, {Component} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import regex from '../../../utils/regex';
import {Icon} from 'native-base';
import {heightData} from '../../../json/generalCatogeryData';

class HeightModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedHeightStatus: props.selectedHeightStatus,
      maritalData: heightData,
    };
  }

  onHeightPress = (item) => {
    this.setState({selectedHeightStatus: item.title});
  };

  renderItem = ({item}) => {
    const {selectedHeightStatus} = this.state;
    const {theme} = this.props;
    let selected = false;
    if (selectedHeightStatus === item.title) selected = true;

    let textStyle = {
      ...styles.itemText,
      fontWeight: selected ? '600' : '500',
      color: selected ? theme.pinkColor : theme.secondaryColor,
    };
    return (
      <TouchableWithoutFeedback onPress={() => this.onHeightPress(item)}>
        <View style={[styles.itemView, {borderColor: theme.borderColor}]}>
          <Text style={textStyle}>{item.title}</Text>
          {selected && (
            <Icon
              type={'Feather'}
              name={'check'}
              style={{fontSize: 20, color: theme.pinkColor}}
            />
          )}
          <Text style={textStyle}>{item.size}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    const {maritalData, selectedHeightStatus} = this.state;
    const {theme, onClose} = this.props;

    return (
      <View style={[styles.container]}>
        <View
          style={[
            styles.innerContainer,
            {backgroundColor: theme.container.backgroundColor},
          ]}>
          <View
            style={[
              styles.itemView,
              {
                marginHorizontal: 0,
                paddingHorizontal: 20,
                borderColor: theme.borderColor,
              },
            ]}>
            <Icon
              type={'Feather'}
              name={'x'}
              style={{fontSize: 25, color: theme.primaryColor}}
              onPress={() => onClose()}
            />
            <Text style={styles.titleText}>{'Height'}</Text>
            {selectedHeightStatus === '' ? (
              <Text style={styles.titleText}>{'      '}</Text>
            ) : (
              <Icon
                type={'Feather'}
                name={'check'}
                style={{fontSize: 25, color: theme.pinkColor}}
                onPress={() => onClose(selectedHeightStatus)}
              />
            )}
          </View>
          <View
            style={[
              styles.itemView,
              {
                marginHorizontal: 0,
                paddingHorizontal: 20,
                paddingVertical: 0,
                marginTop: 20,
                borderBottomWidth: 0,
              },
            ]}>
            <Text style={[styles.titleText, {color: theme.pinkColor}]}>
              {'ft/inches'}
            </Text>
            <Text style={[styles.titleText, {color: theme.pinkColor}]}>
              {'cm'}
            </Text>
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={maritalData}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>
    );
  }
}

export default HeightModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: regex.aspectRatio(80),
    width: regex.getWindowWidth(),
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  innerContainer: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
  itemView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
  },
  itemText: {
    fontSize: 16,
  },
});
