import React, {Component} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import CommonButton from '../../../components/general/CommonButton';
import regex from '../../../utils/regex';
import {religionData} from '../../../json/generalCatogeryData';

class Step7Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      religion: props.data.religion,
      religionData: religionData,
    };
  }

  onReligionPress = (item) => {
    const {religion} = this.state;
    const {onPress} = this.props;
    if (item.title === religion) this.setState({religion: ''});
    else
      this.setState({religion: item.title}, () => {
        const {religion} = this.state;
        onPress(7, {religion});
      });
  };

  renderReligionItem = ({item}) => {
    const {religion} = this.state;
    const {theme} = this.props;
    let selected = false;
    if (religion === item.title) selected = true;

    return (
      <CommonButton
        theme={theme}
        container={{marginVertical: 8}}
        backgroundColor={theme.backgroundColor}
        borderColor={selected ? theme.pinkColor : theme.borderColor}
        textColor={selected ? theme.pinkColor : theme.secondaryColor}
        title={item.title}
        onPress={() => this.onReligionPress(item)}
      />
    );
  };

  render() {
    const {religionData} = this.state;
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
              ]}>{`Religion`}</Text>
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={religionData}
              renderItem={this.renderReligionItem}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Step7Item;

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
