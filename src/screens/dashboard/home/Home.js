import React, {Component} from 'react';
import Swiper from 'react-native-deck-swiper';
import {
  AppState,
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import {connect} from 'react-redux';
import {Icon} from 'native-base';
import NHHeader from '../../../components/general/NHHeader';
import regex from '../../../utils/regex';
import {
  ONLINE,
  PINK,
  RED,
  SUPERLIKE,
  White,
} from '../../../themes/constantColors';
import FastImage from 'react-native-fast-image';
import FilterModal from './FilterModal';
import {distance, getCurrentLocation} from '../../../utils/location';
import PulseLoader from './components/PulseLoader';
import CongraMatchModal from './CongraMatchModal';
import {discoverUsers} from '../../../services/userAction';
import {swipeCardUser} from '../../../services/swipeCardAction';
import moment from 'moment';
import {
  matchesAction,
  notificationAction,
  swipeCardLimitAction,
  updateLocationAction,
  updateUserDataAction,
} from '../../../actions';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      swipedAllCards: false,
      modalVisible: false,
      loading: true,
      congoModalVisible: false,
      matchUser: null,
    };
    this.location = null;
    this.filterData = {
      selectedDistance: 800,
      selectedAge: 60,
    };
  }

  componentDidMount(): void {
    this.getLastSwipeLimit();
    this.updateOnlineStatus();
    this.getNotificationData();
    getCurrentLocation(this)
      .then((location) => {
        this.location = location.coords;
        this.getNearByUserData();
      })
      .catch((error) => {
        this.setState({loading: false});
      });
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'active') {
      this.props.updateUserDataAction(
        this.props.user.uid,
        {online: true},
        'splash',
      );
    } else if (nextAppState === 'background' || nextAppState === 'inactive')
      this.props.updateUserDataAction(
        this.props.user.uid,
        {online: false},
        'splash',
      );
  };

  getNotificationData = () => {
    this.props.notificationAction({
      uid: this.props.user.uid,
      notificationReadCount: this.props.user.notificationReadCount,
    });
  };

  getLastSwipeLimit = () => {
    let {user} = this.props;
    let {packageEndDate, dailySwipeCount, swipeStartDate} = user;
    if (!regex.isPremiumUser(packageEndDate)) {
      if (Boolean(swipeStartDate)) {
        let a = moment.unix(swipeStartDate).local();
        let b = moment();
        let diff = a.diff(b, 'days');
        if (diff === 0) this.props.swipeCardLimitAction(dailySwipeCount);
      }
    }
  };

  updateOnlineStatus = () => {
    updateUserDataAction(this.props.user.uid, {online: true}, 'home');
  };

  getNearByUserData = () => {
    this.setLoader(true, () => {
      this.props.matchesAction(this.props.user.uid, true).then((response) => {
        discoverUsers(
          this.props.user.uid,
          this.location,
          this.filterData.selectedDistance,
        ).then((response) => {
          let data = [];
          for (let a in response) {
            let user = response[a]._data;
            if (this.props.matches.length > 0) {
              let notMatchedUser = this.props.matches.filter(function (o) {
                return o.user.uid === user.uid;
              });
              if (notMatchedUser.length === 0) data.push(user);
            } else data.push(user);
          }

          if (data.length > 0) this.filterToData(data);
        });
      });
    });
  };

  filterToData = (data) => {
    const {selectedAge, interested, showMe} = this.filterData;

    let uid = this.props.user.uid;
    let result = data.filter(function (v, i) {
      let query = false;
      if (Boolean(interested) && Boolean(showMe))
        query =
          v['uid'] !== uid &&
          v['age'] <= selectedAge &&
          interested.includes(v['lookingFor']) &&
          showMe.includes(v['sexuality']);
      else if (Boolean(interested))
        query =
          v['uid'] !== uid &&
          v['age'] <= selectedAge &&
          interested.includes(v['lookingFor']);
      else if (Boolean(showMe))
        query =
          v['uid'] !== uid &&
          v['age'] <= selectedAge &&
          showMe.includes(v['sexuality']);
      else query = v['uid'] !== uid && v['age'] <= selectedAge;

      return query;
    });
    this.setState({cards: [], loading: false}, () => {
      this.setState({cards: result});
    });
  };

  setLoader = (shown, callback) => {
    this.setState({loading: shown}, callback);
  };

  onMenuPress = () => {
    const {navigation} = this.props;
    navigation.openDrawer();
  };

  onFilterPress = () => {
    this.setState({modalVisible: true});
  };

  onSwiped = (type, index) => {
    let uid = this.props.user.uid;
    let other = this.state.cards[index];

    let isValidSwipe = this.checkSwipeLimit();
    if (isValidSwipe) {
      swipeCardUser(uid, other.uid, type).then((response) => {
        if (response && !this.state.congoModalVisible)
          this.setState({matchUser: other, congoModalVisible: true});
      });
    }
  };

  checkSwipeLimit = () => {
    let {user, swipeCardLimit} = this.props;
    let {uid, packageEndDate, swipeStartDate} = user;

    let isUpdate = true;
    if (!regex.isPremiumUser(packageEndDate)) {
      let parameter = {};
      if (Boolean(swipeStartDate)) {
        let a = moment.unix(swipeStartDate).local();
        let b = moment();
        let diff = a.diff(b, 'days');
        if (diff === 0) {
          if (swipeCardLimit >= regex.getSwipeCardLimit()) {
            isUpdate = false;
            this.swiper.swipeBack();
            alert('You reached daily limit.');
          } else parameter = {dailySwipeCount: swipeCardLimit + 1};
        } else
          parameter = {
            swipeStartDate: moment().utc().unix(),
            dailySwipeCount: 1,
          };
      } else
        parameter = {swipeStartDate: moment().utc().unix(), dailySwipeCount: 1};

      if (isUpdate) {
        this.props.updateUserDataAction(uid, parameter, 'home');
        this.props.swipeCardLimitAction(parameter.dailySwipeCount);
      }
    }

    return isUpdate;
  };

  onSwipedAllCards = () => {
    this.setState({swipedAllCards: true});
  };

  swipeLeft = (index) => {
    const {navigation} = this.props;
    console.log(this.props.user.uid);
    navigation.navigate('OtherProfile', {profileData: this.state.cards[index], currentUserUid: this.props.user.uid});
  };

  onButtonPress = (type) => {
    const {swipedAllCards} = this.state;

    if (swipedAllCards) return;

    if (type === 'dislike') this.swiper.swipeLeft();
    else if (type === 'like') this.swiper.swipeRight();
    else if (type === 'superLike') this.swiper.swipeTop();
  };

  renderCardItem = (item, index) => {
    const {theme} = this.props;
    return (
      <View
        style={[
          styles.cardView,
          {
            backgroundColor: theme.backgroundColor,
            borderColor: theme.subSecondaryColor,
          },
        ]}>
        <FastImage
          source={{uri: regex.getProfilePic(item.photos)}}
          style={{flex: 1, borderRadius: 20, overflow: 'hidden'}}
        />
        <FastImage
          source={require('./../../../assets/blur_effect.png')}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            top: 0,
            borderRadius: 20,
            overflow: 'hidden',
          }}
        />
        <View
          style={{position: 'absolute', top: 0, right: 0, left: 0, bottom: 0}}>
          <View
            style={{
              position: 'absolute',
              right: 0,
              left: 0,
              bottom: 20,
              paddingHorizontal: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {item.online && <View style={styles.onlineView} />}
              <Text style={[styles.nameText, {color: theme.backgroundColor}]}>
                {item.name}
                {regex.getAge(item.DoB)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 5,
              }}>
              <Icon
                type={'Feather'}
                name={'map-pin'}
                style={{fontSize: 16, color: theme.backgroundColor}}
              />
              <Text
                style={[
                  styles.locationText,
                  {color: theme.backgroundColor, marginLeft: 5},
                ]}>
                {`${distance(item.location, this.location, 'K')}`} km away
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  renderCard = () => {
    const {cards} = this.state;
    const {theme} = this.props;

    if (cards.length === 0) {
      return (
        <View
          style={[
            styles.innerView,
            {
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme.primaryBackgroundColor,
            },
          ]}>
          <Text style={{fontSize: 18, padding: 30, textAlign: 'center'}}>
            {'Nearby not available. You can apply filter.'}
          </Text>
        </View>
      );
    }

    return (
      <View
        style={[
          styles.innerView,
          {backgroundColor: theme.primaryBackgroundColor},
        ]}>
        <Swiper
          ref={(swiper) => {
            this.swiper = swiper;
          }}
          onSwipedLeft={(index) => this.onSwiped('dislike', index)}
          onSwipedRight={(index) => this.onSwiped('like', index)}
          onSwipedTop={(index) => this.onSwiped('superLike', index)}
          onTapCard={this.swipeLeft}
          disableBottomSwipe={true}
          cards={cards}
          renderCard={this.renderCardItem}
          onSwipedAll={this.onSwipedAllCards}
          backgroundColor={theme.primaryBackgroundColor}
          containerStyle={{bottom: regex.heightRatio(0.15)}}
          stackSize={cards.length > 2 ? 3 : cards.length}
          stackSeparation={-30}
          overlayLabels={overlayLabel}
          animateOverlayLabelsOpacity
          animateCardOpacity
          swipeBackCard
        />
        <View style={[styles.bottomView]}>
          <TouchableWithoutFeedback
            onPress={() => this.onButtonPress('dislike')}>
            <View
              style={[
                styles.commonLike,
                {backgroundColor: theme.backgroundColor},
              ]}>
              <Icon
                type={'Feather'}
                name={'x'}
                style={{color: RED, fontSize: 30}}
              />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => this.onButtonPress('superLike')}>
            <View
              style={[
                styles.commonLike,
                {
                  backgroundColor: theme.backgroundColor,
                  padding: 15,
                  borderRadius: 35,
                },
              ]}>
              <Icon
                type={'Feather'}
                name={'star'}
                style={{color: SUPERLIKE, fontSize: 30}}
              />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.onButtonPress('like')}>
            <View
              style={[
                styles.commonLike,
                {backgroundColor: theme.backgroundColor},
              ]}>
              <Icon
                type={'Feather'}
                name={'heart'}
                style={{color: theme.pinkColor, fontSize: 30}}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  };

  render() {
    const {modalVisible, loading, congoModalVisible, matchUser} = this.state;
    const {theme, user, navigation} = this.props;

    return (
      <View
        style={[
          styles.container,
          {backgroundColor: theme.container.backgroundColor},
        ]}>
        <NHHeader
          title={'Discover'}
          theme={theme}
          leftView={
            <TouchableWithoutFeedback onPress={this.onMenuPress}>
              <View style={styles.buttonView}>
                <Icon
                  type={'Feather'}
                  name={'align-left'}
                  style={{fontSize: 28, color: theme.primaryColor}}
                />
              </View>
            </TouchableWithoutFeedback>
          }
          rightView={
            <View style={{flexDirection: 'row'}}>
              <TouchableWithoutFeedback onPress={this.onFilterPress}>
                <View style={styles.buttonView}>
                  <Icon
                    type={'Feather'}
                    name={'filter'}
                    style={{fontSize: 25, color: theme.primaryColor}}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          }
        />
        {loading ? (
          <View
            style={[
              styles.innerView,
              {backgroundColor: theme.primaryBackgroundColor},
            ]}>
            <PulseLoader avatar={regex.getProfilePic(user.photos)} />
          </View>
        ) : (
          this.renderCard()
        )}
        <Modal
          animationType={'fade'}
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {}}>
          <FilterModal
            theme={theme}
            filterData={this.filterData}
            onClose={(data) => {
              let setStateData = {modalVisible: false};
              this.setState(setStateData);

              if (data) {
                this.filterData = data;
                this.getNearByUserData();
              }
            }}
          />
        </Modal>
        <Modal
          animationType={'fade'}
          transparent={true}
          visible={congoModalVisible}
          onRequestClose={() => {}}>
          <CongraMatchModal
            navigation={navigation}
            theme={theme}
            uid={user.uid}
            data={matchUser}
            location={this.location}
            onClose={(data) => {
              let setStateData = {congoModalVisible: false};
              this.setState(setStateData);
            }}
          />
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  theme: state.theme.theme,
  user: state.auth.user,
  matches: state.matche.matches,
  swipeCardLimit: state.matche.swipeCardLimit,
});

export default connect(mapStateToProps, {
  swipeCardLimitAction,
  updateLocationAction,
  notificationAction,
  matchesAction,
  updateUserDataAction,
})(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonView: {
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerView: {
    flex: 1,
  },
  bottomView: {
    height: regex.heightRatio(0.15),
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  commonLike: {
    padding: 20,
    marginHorizontal: 8,
    marginBottom: regex.heightRatio(0.01),
    borderRadius: 40,
    ...regex.shadow(),
  },
  cardView: {
    height: regex.heightRatio(0.63),
    borderRadius: 20,
    justifyContent: 'center',
    borderWidth: 1,
    ...regex.shadow(),
  },
  onlineView: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: ONLINE,
    marginRight: 5,
  },
  nameText: {
    fontSize: 24,
    fontWeight: '800',
  },
  locationText: {
    fontSize: 16,
    fontWeight: '800',
  },
});

const overlayLabel = {
  left: {
    title: 'NOPE',
    style: {
      label: {
        backgroundColor: RED,
        borderColor: RED,
        color: White,
        borderWidth: 1,
      },
      wrapper: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        marginTop: 30,
        marginLeft: -30,
      },
    },
  },
  right: {
    title: 'LIKE',
    style: {
      label: {
        backgroundColor: PINK,
        borderColor: PINK,
        color: White,
        borderWidth: 1,
      },
      wrapper: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: 30,
        marginLeft: 30,
      },
    },
  },
  top: {
    title: 'SUPER LIKE',
    style: {
      label: {
        backgroundColor: SUPERLIKE,
        borderColor: SUPERLIKE,
        color: White,
        borderWidth: 1,
      },
      wrapper: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
  },
};
