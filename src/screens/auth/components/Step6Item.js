import React, {Component} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import CommonButton from '../../../components/general/CommonButton';
import regex from '../../../utils/regex';
import {lookingData} from '../../../json/generalCatogeryData';

class Step6Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lookingFor: props.data.lookingFor,
      lookingData: lookingData,
    };
  }

  onLookingForPress = (item) => {
    const {lookingFor} = this.state;
    const {onPress} = this.props;
    if (item.title === lookingFor) this.setState({lookingFor: ''});
    else
      this.setState({lookingFor: item.title}, () => {
        const {lookingFor} = this.state;
        onPress(6, {lookingFor});
      });
  };

  renderLookingForItem = ({item}) => {
    const {lookingFor} = this.state;
    const {theme} = this.props;
    let selected = false;
    if (lookingFor === item.title) selected = true;

    return (
      <CommonButton
        theme={theme}
        container={{marginVertical: 8}}
        backgroundColor={theme.backgroundColor}
        borderColor={selected ? theme.pinkColor : theme.borderColor}
        textColor={selected ? theme.pinkColor : theme.secondaryColor}
        title={item.title}
        onPress={() => this.onLookingForPress(item)}
      />
    );
  };

  render() {
    const {lookingData} = this.state;
    const {theme} = this.props;

    return (
      <View
        style={[
          styles.container,
          {backgroundColor: theme.container.backgroundColor},
        ]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <View>
            <Text
              style={[
                styles.titleText,
                {color: theme.primaryColor},
              ]}>{`I'm Looking for`}</Text>
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={lookingData}
              renderItem={this.renderLookingForItem}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Step6Item;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: regex.getWindowWidth(),
  },
  titleText: {
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: 10,
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
  },
});
