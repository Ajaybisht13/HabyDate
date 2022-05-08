import React, {Component} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import regex from '../../../utils/regex';
import {
  bodyTypeData,
  drinkingData,
  eatingData,
  educationData,
  genderData,
  heightData,
  lookingData,
  maritalData,
  personalityData,
  religionData,
  sexualityData,
  smokingData,
} from '../../../json/generalCatogeryData';
import CommonButton from '../../../components/general/CommonButton';
import {connect} from 'react-redux';
import {Icon} from 'native-base';
import NHHeader from '../../../components/general/NHHeader';
import {PAGE_NAME} from '../../../utils/pageEnum';

class UpdateYourInformation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      height: '',
      bodyType: '',
      gender: '',
      sexuality: '',
      personality: '',
      education: '',
      maritalStatus: '',
      lookingFor: '',
      religion: '',
      drinkingStatus: '',
      smokingStatus: '',
      eatingStatus: '',
      lookingData: [],
    };

    let params = props.route.params;
    this.state.lookingFor = params.value;
    if (params.index === PAGE_NAME.HEIGHT) {
      this.state.lookingData = heightData;
    } else if (params.index === PAGE_NAME.BODY_TYPE) {
      this.state.lookingData = bodyTypeData;
    } else if (params.index === PAGE_NAME.GENDER) {
      this.state.lookingData = genderData;
    } else if (params.index === PAGE_NAME.SEXUALITY) {
      this.state.lookingData = sexualityData;
    } else if (params.index === PAGE_NAME.PERSONALITY) {
      this.state.lookingData = personalityData;
    } else if (params.index === PAGE_NAME.EDUCATION) {
      this.state.lookingData = educationData;
    } else if (params.index === PAGE_NAME.MARITAL_STATUS) {
      this.state.lookingData = maritalData;
    } else if (params.index === PAGE_NAME.LOOKING_FOR) {
      this.state.lookingData = lookingData;
    } else if (params.index === PAGE_NAME.RELIGION) {
      this.state.lookingData = religionData;
    } else if (params.index === PAGE_NAME.DRINKING) {
      this.state.lookingData = drinkingData;
    } else if (params.index === PAGE_NAME.SMOKING) {
      this.state.lookingData = smokingData;
    } else if (params.index === PAGE_NAME.EATING) {
      this.state.lookingData = eatingData;
    }
  }

  onBackPress = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  onRightPress = () => {
    let params = this.props.route.params;
    params.callback({index: params.index, value: this.state.lookingFor});
    this.onBackPress();
  };

  onLookingForPress = (item) => {
    const {lookingFor} = this.state;
    if (item.title === lookingFor) this.setState({lookingFor: ''});
    else this.setState({lookingFor: item.title});
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
    const {theme, route} = this.props;

    return (
      <View
        style={[
          styles.container,
          {backgroundColor: theme.container.backgroundColor},
        ]}>
        <NHHeader
          title={route.params.title}
          theme={theme}
          rightView={
            <TouchableWithoutFeedback onPress={this.onRightPress}>
              <View style={styles.buttonView}>
                <Icon
                  type={'Feather'}
                  name={'check'}
                  style={{color: theme.pinkColor}}
                />
              </View>
            </TouchableWithoutFeedback>
          }
          onLeftPress={this.onBackPress}
        />
        <View
          style={[
            styles.container,
            {paddingTop: 20, backgroundColor: theme.container.backgroundColor},
          ]}>
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={lookingData}
            renderItem={this.renderLookingForItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  theme: state.theme.theme,
});

export default connect(mapStateToProps)(UpdateYourInformation);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: regex.getWindowWidth(),
  },
  buttonView: {
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
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
