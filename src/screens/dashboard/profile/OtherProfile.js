import React, {Component} from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import {connect} from 'react-redux';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import regex from '../../../utils/regex';
import FastImage from 'react-native-fast-image';
import {Icon} from 'native-base';
import {ONLINE, Transparent} from '../../../themes/constantColors';
import ReadMore from 'react-native-read-more-text';
import SquarePhotoItem from '../../../components/general/SquarePhotoItem';
import {distance} from '../../../utils/location';
import {
  updateUserAction,
} from '../../../services/userAction';


class OtherProfile extends Component {
  constructor(props) {
    super(props);
    let params = props.route.params;
    console.log(params.currentUserUid);
    this.state = {
      isReportingUser: false,
      reasonForReportingUser: '',
      instagramPhotos: [],
      currentUserId: params.currentUserUid,
      ...params.profileData,

    };
  }

  onBackPress = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  _handleTextReady = () => {};

  updateUserData = (data) => {
    updateUserAction(uid, data, 'profile')
  }
  renderItemView = (title, value, index) => {
    const {theme} = this.props;
    return (
      <View
        style={[
          styles.commonView,
          {
            backgroundColor: theme.backgroundColor,
            borderColor: theme.borderColor,
          },
        ]}>
        <Text style={[styles.commonText, {color: theme.primaryColor}]}>
          {title}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={[styles.commonText, {color: theme.subPrimaryColor}]}>
            {value}
          </Text>
        </View>
      </View>
    );
  };

  render() {
    const {theme, navigation} = this.props;
    const {
      uid,
      instagramPhotos,
      online,
      name,
      DoB,
      bio,
      photos,
      height,
      bodyType,
      gender,
      sexuality,
      personality,
      education,
      maritalStatus,
      lookingFor,
      religion,
      drinkingStatus,
      smokingStatus,
      eatingStatus,
      location,
      userReports
    } = this.state;

    return (
      <View
        style={[
          styles.container,
          {backgroundColor: theme.container.backgroundColor},
        ]}>
        <StatusBar backgroundColor={Transparent} />
        <ParallaxScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          backgroundColor={theme.container.backgroundColor}
          headerBackgroundColor={'transparent'}
          contentContainerStyle={{
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            marginTop: -25,
          }}
          stickyHeaderHeight={STICKY_HEADER_HEIGHT}
          parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
          backgroundSpeed={10}
          renderBackground={() => (
            <View style={{height: PARALLAX_HEADER_HEIGHT, flex: 1}}>
              <FastImage
                source={{uri: regex.getProfilePic(photos)}}
                style={[styles.imageView]}
              />
            </View>
          )}
          renderFixedHeader={() => (
            <View key="fixed-header" style={styles.fixedSection}>
              <TouchableWithoutFeedback onPress={this.onBackPress}>
                <View style={styles.buttonView}>
                  <Icon
                    type={'Feather'}
                    name={'x'}
                    style={{fontSize: 30, color: theme.backgroundColor}}
                  />
                </View>
              </TouchableWithoutFeedback>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableWithoutFeedback>
                  <View style={styles.buttonView}>
                    <Icon
                      type={'Feather'}
                      name={'more-horizontal'}
                      style={{color: 'transparent'}}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          )}>
          <View style={{borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
            <View style={[styles.userView]}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {online && <View style={styles.onlineView} />}
                <View style={{width: '100%', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between'}}>
                  <Text style={[styles.nameText, {color: theme.primaryColor}]}>
                    {name}
                    {regex.getAge(DoB)}
                  </Text>
                  <Text
                    style={[styles.commonText, {color: theme.pinkColor, paddingTop: 5}]}
                    onPress={() => {
                      console.log(userReports)
                      var reports = userReports == undefined ? [] : userReports;
                      if(this.state.reasonForReportingUser.length > 0){

                        var userReport = {
                          reportingUserId: this.state.currentUserId,
                          reasonForReportingUser: this.state.reasonForReportingUser
                        }

                        reports.push(userReport);
                        console.log(uid);

                        updateUserAction(uid, {userReports: reports}, 'profile')
                      }
                      this.setState({reasonForReportingUser: '', isReportingUser: !this.state.isReportingUser, userReports: reports})
                    }}>
                    {!this.state.isReportingUser ?  'Report User' : 'Submit'}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  styles.locationView,
                  {backgroundColor: theme.primaryBackgroundColor},
                ]}>
                <Icon
                  type={'Feather'}
                  name={'map-pin'}
                  style={{fontSize: 14, color: theme.subPrimaryColor}}
                />
                <Text
                  style={[
                    styles.timeText,
                    {color: theme.subPrimaryColor, marginLeft: 5},
                  ]}>
                  {`${distance(location, this.props.location, 'K')}`} km away
                </Text>
              </View>
              {this.state.isReportingUser ? (
                <TextInput
                  style={[
                    styles.reportReasonText,
                    {
                      color: theme.subPrimaryColor,
                      width: '100%',
                      backgroundColor: theme.textInputBackgroundColor,
                    },
                  ]}
                  placeholder="Write reason for reporting the user..."
                  placeholderTextColor={theme.subPrimaryColor}
                  multiline={true}
                  numberOfLines={5}
                  onChangeText={(reasonForReportingUser) => this.setState({reasonForReportingUser})}
                />
              ) : null}
              <ReadMore
                numberOfLines={3}
                renderTruncatedFooter={(handlePress) => {
                  return (
                    <Text
                      style={[styles.readMore, {color: theme.subPrimaryColor}]}
                      onPress={handlePress}>
                      Read more
                    </Text>
                  );
                }}
                renderRevealedFooter={(handlePress) => {
                  return (
                    <Text
                      style={[styles.readMore, {color: theme.subPrimaryColor}]}
                      onPress={handlePress}>
                      Show less
                    </Text>
                  );
                }}
                onReady={this._handleTextReady}>
                <Text style={[styles.bioText, {color: theme.subPrimaryColor}]}>
                  {bio}
                </Text>
              </ReadMore>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: theme.borderColor,
                marginVertical: 20,
                marginBottom: 10,
              }}
            />

            {photos.length > 0 && (
              <View
                style={[
                  styles.commonView,
                  {
                    backgroundColor: theme.backgroundColor,
                    borderBottomWidth: 0,
                  },
                ]}>
                <Text
                  style={[
                    styles.photoText,
                    {color: theme.primaryColor},
                  ]}>{`All Photos (${photos.length})`}</Text>
                <Text
                  style={[styles.commonText, {color: theme.pinkColor}]}
                  onPress={() => navigation.navigate('AllPhotos', {photos})}>
                  See All
                </Text>
              </View>
            )}
            {photos.length > 0 && (
              <View style={{marginHorizontal: 20}}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  data={photos}
                  extraData={photos}
                  renderItem={({item}) => (
                    <SquarePhotoItem theme={theme} item={item} />
                  )}
                  numColumns={3}
                  keyExtractor={(item, index) => item.public_id.toString()}
                />
              </View>
            )}
            {photos.length > 0 && (
              <View
                style={{
                  height: 1,
                  backgroundColor: theme.borderColor,
                  marginVertical: 20,
                  marginHorizontal: 20,
                  marginBottom: 10,
                }}
              />
            )}

            {instagramPhotos.length > 0 && (
              <View
                style={[
                  styles.commonView,
                  {
                    backgroundColor: theme.backgroundColor,
                    borderBottomWidth: 0,
                  },
                ]}>
                <Text style={[styles.photoText, {color: theme.primaryColor}]}>
                  Instagram Photos (0)
                </Text>
                <Text
                  style={[styles.commonText, {color: theme.pinkColor}]}
                  onPress={() => navigation.navigate('AllPhotos')}>
                  See All
                </Text>
              </View>
            )}
            {instagramPhotos.length > 0 && (
              <View style={{marginHorizontal: 20}}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  data={instagramPhotos}
                  extraData={instagramPhotos}
                  renderItem={({item}) => (
                    <SquarePhotoItem theme={theme} item={item} />
                  )}
                  numColumns={3}
                  keyExtractor={(item, index) => item.id.toString()}
                />
              </View>
            )}

            {this.renderItemView('Height', height, 1)}
            {this.renderItemView('Body Type', bodyType, 2)}
            {this.renderItemView('Gender', gender, 3)}
            {this.renderItemView('Sexuality', sexuality, 4)}
            {this.renderItemView('Personality', personality, 5)}
            {this.renderItemView('Education', education, 6)}
            {this.renderItemView('Marital Status', maritalStatus, 7)}
            {this.renderItemView('Looking for', lookingFor, 8)}
            {this.renderItemView('Religion', religion, 9)}
            {this.renderItemView('Drinking', drinkingStatus, 10)}
            {this.renderItemView('Smoking', smokingStatus, 11)}
            {this.renderItemView('Eating', eatingStatus, 12)}
            <View style={{marginVertical: 15}} />
          </View>
        </ParallaxScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  theme: state.theme.theme,
  location: state.location.location,
});

export default connect(mapStateToProps)(OtherProfile);

const PARALLAX_HEADER_HEIGHT = regex.heightRatio(0.468);
const STICKY_HEADER_HEIGHT = regex.heightRatio(0.103);

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
  imageView: {
    width: regex.getWindowWidth(),
    height: PARALLAX_HEADER_HEIGHT,
  },
  fixedSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 10,
    right: 0,
    left: 0,
  },
  userView: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  onlineView: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: ONLINE,
    marginRight: 5,
  },
  nameText: {
    fontSize: 24,
    fontWeight: '800',
  },
  locationView: {
    marginVertical: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
  },
  readMore: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: '600',
  },
  bioText: {
    fontSize: 14,
    fontWeight: '400',
  },

  reportReasonText: {
    marginHorizontal: 20,
    height: 100,
    padding: 15,
    paddingTop: 15,
    borderRadius: 15,
    marginTop: 5,
  },

  photoText: {
    fontSize: 16,
    fontWeight: '600',
  },
  addPhotoView: {
    marginHorizontal: 20,
    marginVertical: 15,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
  },
  buttonAddPhotoText: {
    fontSize: 18,
    fontWeight: '600',
  },
  commonView: {
    marginHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
  commonText: {
    fontSize: 18,
    fontWeight: '400',
  },
});
