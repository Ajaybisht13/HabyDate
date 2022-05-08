import React, {Component} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import CommonButton from '../../../components/general/CommonButton';
import regex from '../../../utils/regex';
import {educationData} from '../../../json/generalCatogeryData';

class Step4Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      education: props.data.education,
      educationData: educationData,
    };
  }

  onEducationPress = (item) => {
    const {education} = this.state;
    const {onPress} = this.props;
    if (item.title === education) this.setState({education: ''});
    else
      this.setState({education: item.title}, () => {
        const {education} = this.state;
        onPress(4, {education});
      });
  };

  renderEducationItem = ({item}) => {
    const {education} = this.state;
    const {theme} = this.props;
    let selected = false;
    if (education === item.title) selected = true;

    return (
      <CommonButton
        theme={theme}
        container={{marginVertical: 8}}
        backgroundColor={theme.backgroundColor}
        borderColor={selected ? theme.pinkColor : theme.borderColor}
        textColor={selected ? theme.pinkColor : theme.secondaryColor}
        title={item.title}
        onPress={() => this.onEducationPress(item)}
      />
    );
  };

  render() {
    const {educationData} = this.state;
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
              ]}>{`What's Your Education?`}</Text>
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={educationData}
              renderItem={this.renderEducationItem}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Step4Item;

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
