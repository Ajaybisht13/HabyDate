import React, {Component} from 'react';
import {
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CommonButton from '../../../components/general/CommonButton';
import regex from '../../../utils/regex';
import HeightModal from './HeightModal';
import {DatePickerDialog} from 'react-native-datepicker-dialog';
import moment from 'moment';
import {
  bodyTypeData,
  genderData,
  incomeData,
} from '../../../json/generalCatogeryData';
import * as messages from '../../../utils/messages';

class Step2Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DoB: props.data.DoB,
      dobDate: null,
      height: props.data.height,
      modalVisible: false,
      bodyType: props.data.bodyType,
      gender: props.data.gender,
      bodyTypeData: bodyTypeData,
      genderData: genderData,
      income: props.data.income,
    };
  }

  nextPress = () => {
    const {DoB, height, bodyType, gender, income} = this.state;
    const {onPress} = this.props;

    if (DoB === 'MM / DD / YYYY') alert(messages.enterDOB);
    else if (height === `0' / 00'`) alert(messages.enterHeight);
    else if (regex.isEmpty(bodyType)) alert(messages.enterBodyType);
    else if (regex.isEmpty(gender)) alert(messages.enterGender);
    else if (regex.isEmpty(income)) alert(messages.enterIncome);
    else {
      onPress(2, {DoB, height, bodyType, gender, income});
    }
  };

  openHeightPress = () => {
    this.setState({modalVisible: true});
  };

  /**
   * DOB textbox click listener
   */
  onDOBPress = () => {
    let dobDate = this.state.dobDate;

    if (!dobDate || dobDate === null) {
      dobDate = new Date();
      this.setState({dobDate: dobDate});
    }

    //To open the dialog
    this.dobDialogRef.open({
      date: dobDate,
      maxDate: new Date(),
    });
  };

  /**
   * Call back for dob date picked event
   *
   */
  onDOBDatePicked = (date) => {
    this.setState({
      dobDate: date,
      DoB: moment(date).format('MM / DD / YYYY'),
    });
  };

  onBodyTypePress = (item) => {
    this.setState({bodyType: item.title});
  };

  renderBodyTypeItem = ({item}) => {
    const {bodyType} = this.state;
    const {theme} = this.props;
    let selected = false;
    if (bodyType === item.title) selected = true;

    return (
      <CommonButton
        theme={theme}
        container={{marginVertical: 8}}
        backgroundColor={theme.backgroundColor}
        borderColor={selected ? theme.pinkColor : theme.borderColor}
        textColor={selected ? theme.pinkColor : theme.secondaryColor}
        title={item.title}
        onPress={() => this.onBodyTypePress(item)}
      />
    );
  };

  onGenderPress = (item) => {
    this.setState({gender: item.title});
  };

  renderGenderItem = ({item}) => {
    const {gender} = this.state;
    const {theme} = this.props;
    let selected = false;
    if (gender === item.title) selected = true;

    return (
      <CommonButton
        theme={theme}
        container={{marginVertical: 8}}
        backgroundColor={theme.backgroundColor}
        borderColor={selected ? theme.pinkColor : theme.borderColor}
        textColor={selected ? theme.pinkColor : theme.secondaryColor}
        title={item.title}
        onPress={() => this.onGenderPress(item)}
      />
    );
  };

  onIncomePress = (item) => {
    this.setState({income: item.title});
  };

  renderIncomeItem = ({item}) => {
    const {income} = this.state;
    const {theme} = this.props;
    let selected = false;
    if (income === item.title) selected = true;

    return (
      <CommonButton
        theme={theme}
        container={{marginVertical: 8}}
        backgroundColor={theme.backgroundColor}
        borderColor={selected ? theme.pinkColor : theme.borderColor}
        textColor={selected ? theme.pinkColor : theme.secondaryColor}
        title={item.title}
        onPress={() => this.onIncomePress(item)}
      />
    );
  };

  render() {
    const {DoB, height, bodyTypeData, genderData, modalVisible, income} =
      this.state;
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
          <Text style={[styles.titleText, {color: theme.primaryColor}]}>
            {'My Birthday is'}
          </Text>
          <View>
            <Text
              style={[styles.titleTextInput, {color: theme.subPrimaryColor}]}>
              Date of Birth*
            </Text>
            <CommonButton
              theme={theme}
              container={{marginTop: 5}}
              backgroundColor={theme.textInputBackgroundColor}
              borderColor={theme.textInputBackgroundColor}
              textColor={theme.subPrimaryColor}
              title={DoB}
              onPress={this.onDOBPress}
            />
            <Text
              style={[
                styles.titleTextInput,
                {marginVertical: 10, color: theme.subSecondaryColor},
              ]}>
              Your age will be public
            </Text>
            <Text
              style={[styles.titleTextInput, {color: theme.subPrimaryColor}]}>
              Height
            </Text>
            <CommonButton
              theme={theme}
              container={{marginTop: 5}}
              backgroundColor={theme.textInputBackgroundColor}
              borderColor={theme.textInputBackgroundColor}
              textColor={theme.subPrimaryColor}
              title={height}
              onPress={this.openHeightPress}
              dropDownArrow={true}
              arrowColor={theme.subPrimaryColor}
            />
            <Text style={[styles.titleText, {color: theme.primaryColor}]}>
              {'Body Type'}
            </Text>
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              scrollEnabled={false}
              data={bodyTypeData}
              renderItem={this.renderBodyTypeItem}
              keyExtractor={(item) => item.id.toString()}
            />
            <Text style={[styles.titleText, {color: theme.primaryColor}]}>
              {'Gender'}
            </Text>
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              scrollEnabled={false}
              data={genderData}
              renderItem={this.renderGenderItem}
              keyExtractor={(item) => item.id.toString()}
            />
            <Text style={[styles.titleText, {color: theme.primaryColor}]}>
              {'Annual Income'}
            </Text>
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              scrollEnabled={false}
              data={incomeData}
              renderItem={this.renderIncomeItem}
              keyExtractor={(item) => item.id.toString()}
            />
            <CommonButton
              theme={theme}
              container={{marginVertical: regex.aspectRatio(30)}}
              backgroundColor={theme.pinkColor}
              borderColor={theme.pinkColor}
              textColor={theme.backgroundColor}
              title={'Continue'}
              onPress={this.nextPress}
            />
          </View>
        </ScrollView>
        <Modal
          animationType={'fade'}
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {}}>
          <HeightModal
            theme={theme}
            selectedHeightStatus={height}
            onClose={(height) => {
              let setStateData = {modalVisible: false};
              if (height) setStateData.height = height;

              this.setState(setStateData);
            }}
          />
        </Modal>
        <DatePickerDialog
          ref={(ref) => (this.dobDialogRef = ref)}
          onDatePicked={this.onDOBDatePicked.bind(this)}
        />
      </View>
    );
  }
}

export default Step2Item;

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
  titleTextInput: {
    marginHorizontal: 20,
    marginVertical: 5,
    fontSize: 14,
    fontWeight: '500',
  },
});
