import React, {Component} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import CommonButton from '../../../components/general/CommonButton';
import regex from '../../../utils/regex';
import {
  drinkingData,
  eatingData,
  smokingData,
} from '../../../json/generalCatogeryData';

class Step8Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drinkingStatus: props.data.drinkingStatus,
      smokingStatus: props.data.smokingStatus,
      eatingStatus: props.data.eatingStatus,
      drinkingData: drinkingData,
      smokingData: smokingData,
      eatingData: eatingData,
    };
  }

  onDrinkingPress = (item) => {
    if (item.title === this.state.drinkingStatus)
      this.setState({drinkingStatus: ''});
    else this.setState({drinkingStatus: item.title}, this.checkAndAutoChange);
  };

  renderDrinkingItem = ({item}) => {
    const {drinkingStatus} = this.state;
    const {theme} = this.props;
    let selected = false;
    if (drinkingStatus === item.title) selected = true;

    return (
      <CommonButton
        theme={theme}
        container={{marginVertical: 8}}
        backgroundColor={theme.backgroundColor}
        borderColor={selected ? theme.pinkColor : theme.borderColor}
        textColor={selected ? theme.pinkColor : theme.secondaryColor}
        title={item.title}
        onPress={() => this.onDrinkingPress(item)}
      />
    );
  };

  onSmokingPress = (item) => {
    if (item.title === this.state.smokingStatus)
      this.setState({smokingStatus: ''});
    else this.setState({smokingStatus: item.title}, this.checkAndAutoChange);
  };

  renderSmokingItem = ({item}) => {
    const {smokingStatus} = this.state;
    const {theme} = this.props;
    let selected = false;
    if (smokingStatus === item.title) selected = true;

    return (
      <CommonButton
        theme={theme}
        container={{marginVertical: 8}}
        backgroundColor={theme.backgroundColor}
        borderColor={selected ? theme.pinkColor : theme.borderColor}
        textColor={selected ? theme.pinkColor : theme.secondaryColor}
        title={item.title}
        onPress={() => this.onSmokingPress(item)}
      />
    );
  };

  onEatingPress = (item) => {
    const {eatingStatus} = this.state;
    if (item.title === eatingStatus) this.setState({eatingStatus: ''});
    else this.setState({eatingStatus: item.title}, this.checkAndAutoChange);
  };

  checkAndAutoChange = () => {
    const {onPress} = this.props;
    const {drinkingStatus, smokingStatus, eatingStatus} = this.state;
    if (drinkingStatus !== '' && smokingStatus !== '' && eatingStatus !== '')
      onPress(8, {drinkingStatus, smokingStatus, eatingStatus});
  };

  renderEatingItem = ({item}) => {
    const {eatingStatus} = this.state;
    const {theme} = this.props;
    let selected = false;
    if (eatingStatus === item.title) selected = true;

    return (
      <CommonButton
        theme={theme}
        container={{marginVertical: 8}}
        backgroundColor={theme.backgroundColor}
        borderColor={selected ? theme.pinkColor : theme.borderColor}
        textColor={selected ? theme.pinkColor : theme.secondaryColor}
        title={item.title}
        onPress={() => this.onEatingPress(item)}
      />
    );
  };

  render() {
    const {drinkingData, smokingData, eatingData} = this.state;
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
              ]}>{`Drinking`}</Text>
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={drinkingData}
              renderItem={this.renderDrinkingItem}
              keyExtractor={(item) => item.id.toString()}
            />
            <Text
              style={[
                styles.titleText,
                {color: theme.primaryColor},
              ]}>{`Smoking`}</Text>
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={smokingData}
              renderItem={this.renderSmokingItem}
              keyExtractor={(item) => item.id.toString()}
            />
            <Text
              style={[
                styles.titleText,
                {color: theme.primaryColor},
              ]}>{`Eating`}</Text>
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={eatingData}
              renderItem={this.renderEatingItem}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Step8Item;

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
