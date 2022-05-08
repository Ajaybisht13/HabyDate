import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableWithoutFeedback} from 'react-native';
import {connect} from 'react-redux';
import NHHeader from '../../../components/general/NHHeader';
import {Icon} from 'native-base';
import {openCardModal, setUpStripe} from '../../../services/paymentAction';
import moment from 'moment';
import {
  hideLoaderAction,
  showLoaderAction,
  updateUserDataAction,
} from '../../../actions';

class PaymentMethod extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setUpStripe();
  }

  onBackPress = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  openCardDetail = async () => {
    const {user, route} = this.props;
    let params = route.params;
    let type = params.isMonth ? 'M' : 'y';
    let packageEndDate = moment().add(1, type).unix();
    let amount = params.isMonth ? 29.95 : 75.95;

    openCardModal(user, amount, packageEndDate, this);
  };

  render() {
    const {theme} = this.props;

    return (
      <View
        style={[
          styles.container,
          {backgroundColor: theme.container.backgroundColor},
        ]}>
        <NHHeader
          title={'Payment Method'}
          theme={theme}
          onLeftPress={this.onBackPress}
        />
        <View
          style={[
            styles.innerView,
            {backgroundColor: theme.primaryBackgroundColor},
          ]}>
          <Text style={[styles.titleText, {color: theme.subSecondaryColor}]}>
            Choose your preferred payment method
          </Text>
          <TouchableWithoutFeedback onPress={this.openCardDetail}>
            <View
              style={[
                styles.optionView,
                {backgroundColor: theme.backgroundColor},
              ]}>
              <View style={{flex: 1}}>
                <Text style={{color: theme.secondaryColor}}>
                  Credit or debit card
                </Text>
              </View>
              <Icon
                type={'Feather'}
                name={'chevron-right'}
                style={{fontSize: 30, color: theme.subPrimaryColor}}
              />
            </View>
          </TouchableWithoutFeedback>
          {/*<View style={[styles.optionView, {backgroundColor: theme.backgroundColor}]}>*/}
          {/*   <View style={{flex: 1}}>*/}
          {/*       <FastImage source={require('./../../../assets/paypal.png')} style={{width: 81, height: 20}}/>*/}
          {/*   </View>*/}
          {/*   <Icon type={'Feather'} name={'chevron-right'} style={{fontSize: 30, color: theme.subPrimaryColor}}/>*/}
          {/*</View>*/}
          {/*<View style={[styles.optionView, {backgroundColor: theme.backgroundColor}]}>*/}
          {/*    <View style={{flex: 1}}>*/}
          {/*        <FastImage source={require('./../../../assets/gpay.png')} style={{width: 49, height: 20}}/>*/}
          {/*    </View>*/}
          {/*    <Icon type={'Feather'} name={'chevron-right'} style={{fontSize: 30, color: theme.subPrimaryColor}}/>*/}
          {/*</View>*/}
          {/*<View style={[styles.optionView, {backgroundColor: theme.backgroundColor}]}>*/}
          {/*    <View style={{flex: 1}}>*/}
          {/*        <FastImage source={require('./../../../assets/applepay.png')} style={{width: 43, height: 20}}/>*/}
          {/*    </View>*/}
          {/*    <Icon type={'Feather'} name={'chevron-right'} style={{fontSize: 30, color: theme.subPrimaryColor}}/>*/}
          {/*</View>*/}
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  theme: state.theme.theme,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  showLoaderAction,
  hideLoaderAction,
  updateUserDataAction,
})(PaymentMethod);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerView: {
    flex: 1,
  },
  titleText: {
    marginHorizontal: 20,
    marginVertical: 20,
    fontSize: 14,
    fontWeight: '600',
  },
  optionView: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingVertical: 8,
    marginTop: 2,
  },
});
