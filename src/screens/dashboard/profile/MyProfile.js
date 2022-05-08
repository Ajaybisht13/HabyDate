import React, {Component} from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Modal, Button, Alert
} from 'react-native';
import {connect} from 'react-redux';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import regex from '../../../utils/regex';
import FastImage from 'react-native-fast-image';
import {Icon} from 'native-base';
import ReadMore from 'react-native-read-more-text';
import SquarePhotoItem from '../../../components/general/SquarePhotoItem';
import ImagePicker from 'react-native-image-crop-picker';
import {assetUploadInCloudinaryServer} from '../../../services/cloudinaryStorage';
import {Transparent} from '../../../themes/constantColors';
import {
  hideLoaderAction,
  showLoaderAction,
  updateUserDataAction,
} from '../../../actions';
import {PAGE_NAME} from '../../../utils/pageEnum';
import {deletePhoto} from '../../../services/userAction';
import * as messages from '../../../utils/messages';

class MyProfile extends Component {
  constructor(props) {
    super(props);
    let user = props.user;
    
    
    this.state = {
      show: false,
      currentPhoto: {},
      currentPhotoIndex: null,
      name: user.name,
      DoB: user.DoB,
      photos: user.photos,
      bio: Boolean(user.bio) ? user.bio : '',
      height: regex.isEmpty(user.height) ? `0' / 00'` : user.height,
      bodyType: regex.isEmpty(user.bodyType) ? '' : user.bodyType,
      gender: regex.isEmpty(user.gender) ? '' : user.gender,
      sexuality: regex.isEmpty(user.sexuality) ? '' : user.sexuality,
      personality: regex.isEmpty(user.personality) ? '' : user.personality,
      education: regex.isEmpty(user.education) ? '' : user.education,
      maritalStatus: regex.isEmpty(user.maritalStatus)
        ? ''
        : user.maritalStatus,
      lookingFor: regex.isEmpty(user.lookingFor) ? '' : user.lookingFor,
      religion: regex.isEmpty(user.religion) ? '' : user.religion,
      drinkingStatus: regex.isEmpty(user.drinkingStatus)
        ? ''
        : user.drinkingStatus,
      smokingStatus: regex.isEmpty(user.smokingStatus)
        ? ''
        : user.smokingStatus,
      eatingStatus: regex.isEmpty(user.eatingStatus) ? '' : user.eatingStatus,
      isEdit: false,
    };

    this.lastIndex = regex.isEmpty(user.photos) ? 0 : user.photos.length;
  }

  onBackPress = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  onEditPress = () => {
    let save = !this.state.isEdit;
    this.setState({isEdit: save});
    if (!save) {
      let getUpdateData = JSON.parse(JSON.stringify(this.state));
      delete getUpdateData['name'];
      delete getUpdateData['DoB'];
      delete getUpdateData['photos'];
      delete getUpdateData['isEdit'];
      this.props.updateUserDataAction(
        this.props.user.uid,
        getUpdateData,
        'profile',
      );
    }
  };

  setPic = () => {
    console.log(this.state.currentPhotoIndex);
    var newPhotos = [];
    newPhotos.push(this.props.user.photos[this.state.currentPhotoIndex]);
    for (var i = 0; i < this.props.user.photos.length; i++) {
      var photo = this.props.user.photos[i];
      if (i != this.state.currentPhotoIndex){
        newPhotos.push(photo);
      }
    }
    this.setState({photos: newPhotos});
    this.props.updateUserDataAction(
      this.props.user.uid,
      {photos: newPhotos},
      'profile',
    );
    this.props.hideLoaderAction();
    this.setState({show:false})
  }

  okClick = () => {
    this.props.showLoaderAction();
    console.log(this.state.currentPhotoIndex);

    var newPhotos = [];
    for (var i = 0; i < this.props.user.photos.length; i++) {
      var photo = this.props.user.photos[i];
      if (i != this.state.currentPhotoIndex){
        newPhotos.push(photo);
      }
    }
    this.setState({photos: newPhotos});
    this.props.updateUserDataAction(
      this.props.user.uid,
      {photos: newPhotos},
      'profile',
    );
    this.props.hideLoaderAction();
    this.setState({show:false})
 }

 deletePic = () => {
  Alert.alert(
    'Delete Photo',
    messages.deleteMsg,
    [
      {text: 'Cancel', onPress: () => {}, style: 'cancel'},
      {text: 'OK', onPress: this.okClick},
    ],
    {cancelable: false},
  );
};

  _handleTextReady = () => {};

  onItemInformationPress = ({title, value, index}) => {
    const {navigation} = this.props;
    const {isEdit} = this.state;

    if (!isEdit) return;

    navigation.navigate('UpdateYourInformation', {
      title,
      value,
      index,
      callback: (params) => {
        let parameter = {};
        if (params.index === PAGE_NAME.HEIGHT) {
          parameter.height = params.value;
        } else if (params.index === PAGE_NAME.BODY_TYPE) {
          parameter.bodyType = params.value;
        } else if (params.index === PAGE_NAME.GENDER) {
          parameter.gender = params.value;
        } else if (params.index === PAGE_NAME.SEXUALITY) {
          parameter.sexuality = params.value;
        } else if (params.index === PAGE_NAME.PERSONALITY) {
          parameter.personality = params.value;
        } else if (params.index === PAGE_NAME.EDUCATION) {
          parameter.education = params.value;
        } else if (params.index === PAGE_NAME.MARITAL_STATUS) {
          parameter.maritalStatus = params.value;
        } else if (params.index === PAGE_NAME.LOOKING_FOR) {
          parameter.lookingFor = params.value;
        } else if (params.index === PAGE_NAME.RELIGION) {
          parameter.religion = params.value;
        } else if (params.index === PAGE_NAME.DRINKING) {
          parameter.drinkingStatus = params.value;
        } else if (params.index === PAGE_NAME.SMOKING) {
          parameter.smokingStatus = params.value;
        } else if (params.index === PAGE_NAME.EATING) {
          parameter.eatingStatus = params.value;
        }
        this.setState({...this.state, ...parameter});
      },
    });
  };

  uploadPhotos = (images) => {
    this.props.showLoaderAction();
    let uploadPhotos = [];
    for (let i = 0; i < images.length; i++) {
      uploadPhotos.push(assetUploadInCloudinaryServer(images[i]), false);
    }

    Promise.all(uploadPhotos)
      .then((response) => {
        console.log(response)
        this.props.hideLoaderAction();
        let photos = [...this.state.photos];
        response.forEach((asset) => {
          console.log(asset.secure_url)
          if(asset.secure_url != undefined && asset.public_id != undefined){
            photos.push({
              photoUrl: asset.secure_url,
              public_id: asset.public_id,
            });
          }
        });
        this.lastIndex = photos.length;
        this.setState({photos});
        this.props.updateUserDataAction(
          this.props.user.uid,
          {photos: photos},
          'profile',
        );
      })
      .catch((error) => {
        this.props.hideLoaderAction();
      });
  };

  openLibrary = () => {
    let selectedLength = 12 - this.lastIndex;
    if (selectedLength < 0) return;

    ImagePicker.openPicker({
      multiple: true,
      maxSize: selectedLength,
      compressQuality: 20,
      mediaType: 'photo',
    }).then((images) => {
      if (images.length > 0) this.uploadPhotos(images);
    });
  };

  renderItemView = (title, value, index) => {
    const {theme} = this.props;
    const {isEdit} = this.state;
    return (
      <TouchableWithoutFeedback
        onPress={() => this.onItemInformationPress({title, value, index})}>
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
            {isEdit && (
              <Icon
                type={'Feather'}
                name={'chevron-right'}
                style={{
                  marginLeft: 10,
                  fontSize: 25,
                  color: theme.subPrimaryColor,
                }}
              />
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    const {theme, navigation, user} = this.props;
    const {
      currentPhoto,
      isEdit,
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
    } = this.state;

    return (
      <View
        style={[
          styles.container,
          {backgroundColor: theme.container.backgroundColor},
        ]}>
        <StatusBar backgroundColor={Transparent} />
        <ParallaxScrollView
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
                    name={'chevron-left'}
                    style={{fontSize: 35, color:'black'}}
                  />
                </View>
              </TouchableWithoutFeedback>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableWithoutFeedback onPress={this.onEditPress}>
                  <View style={styles.buttonView}>
                    <Icon
                      type={'Feather'}
                      name={isEdit ? 'send' : 'edit'}
                      style={{color: 'black'}}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          )}>
          <View style={{borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 10,
              }}>
              <View
                style={{
                  width: 50,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: theme.subSecondaryColor,
                }}
              />
            </View>
            <Text
              style={[
                styles.nameText,
                {color: theme.primaryColor},
              ]}>{`${name}${regex.getAge(DoB)}`}
            </Text>
            <Text
              style={{
                color: theme.primaryColor,
                paddingHorizontal: 20,
                marginTop: 10,
                fontSize: 14,
              }}>Please click and hold on image to change profile pic or delete image
            </Text>
            <Text
              style={{
                color: theme.primaryColor,
                paddingHorizontal: 20,
                marginTop: 10,
                fontSize: 14,
              }}>Click on edit button above to edit profile details
            </Text> 
            {regex.isPremiumUser ? null : <TouchableWithoutFeedback
              onPress={() => navigation.navigate('Payments')}>
              <View style={[styles.premiumView]}>
                <View
                  style={[
                    styles.premiumInnerView,
                    {backgroundColor: theme.pinkColor},
                  ]}>
                  <Icon
                    type={'MaterialCommunityIcons'}
                    name={'crown'}
                    style={{color: theme.backgroundColor}}
                  />
                  <Text
                    style={[
                      styles.premiumText,
                      {color: theme.backgroundColor},
                    ]}>{regex.getDaysLeft(user.packageEndDate)}
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>}
            {isEdit ? (
              <TextInput
                style={[
                  styles.bioText,
                  {
                    color: theme.subPrimaryColor,
                    backgroundColor: theme.textInputBackgroundColor,
                  },
                ]}
                value={bio}
                placeholder="Write something about yourself..."
                placeholderTextColor={theme.subPrimaryColor}
                multiline={true}
                numberOfLines={5}
                onChangeText={(bio) => this.setState({bio})}
              />
            ) : (
              <View style={{marginHorizontal: 20}}>
                <ReadMore
                  numberOfLines={3}
                  renderTruncatedFooter={(handlePress) => {
                    return (
                      <Text
                        style={[
                          styles.readMore,
                          {color: theme.subPrimaryColor},
                        ]}
                        onPress={handlePress}>
                        Read more
                      </Text>
                    );
                  }}
                  renderRevealedFooter={(handlePress) => {
                    return (
                      <Text
                        style={[
                          styles.readMore,
                          {color: theme.subPrimaryColor},
                        ]}
                        onPress={handlePress}>
                        Show less
                      </Text>
                    );
                  }}
                  onReady={this._handleTextReady}>
                  <Text
                    style={[styles.bioDText, {color: theme.subPrimaryColor}]}>
                    {bio}
                  </Text>
                </ReadMore>
              </View>
            )}
            <View
              style={{
                height: 1,
                backgroundColor: theme.borderColor,
                marginVertical: 20,
              }}
            />

            <Text
              style={[
                styles.photoText,
                {color: theme.primaryColor},
              ]}>{`All Photos (${photos.length})`}</Text>
            <View style={{marginHorizontal: 20, marginTop: 10}}>
              <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={photos}
                extraData={photos}
                renderItem={({item, index}) => {

                  if(item.photoUrl != null && item.public_id != null){
                    return <TouchableOpacity onLongPress = {() => { 
                      this.setState({currentPhoto: item});
                      this.setState({currentPhotoIndex: index});

                      this.setState({show:true})
                    }}>
                      <SquarePhotoItem theme={theme} item={item} />
                    </TouchableOpacity>
                  }
                  
                }}
                numColumns={3}
                //keyExtractor={(item, index) => item.public_id.toString()}
              />
            </View>
            <Modal transparent={true} visible={this.state.show} animationType="slide">
              <View style = {{backgroundColor:"#000000aa", flex:1}}>
                 <View style={{borderRadius:20,height:"25%",backgroundColor:"#ffffff", width:"80%", top :"30%", alignSelf:"center", padding:"5%", display:"flex", justifyContent:"space-between"}}>
                     <Button title="SET AS PROFILE PICTURE" color="#8B008B" onPress = {() => this.setPic()}/>
                     <Button title="DELETE" color="#8B008B" onPress = {() => this.deletePic()}/>
                     <Button title="Cancel"  color="#8B008B" onPress = {() => this.setState({show:false})}/>
                 </View>
              </View>
            </Modal>
            <TouchableWithoutFeedback onPress={() => this.openLibrary()}>
              <View
                style={[
                  styles.addPhotoView,
                  {
                    backgroundColor: theme.primaryBackgroundColor,
                    borderColor: theme.borderColor,
                  },
                ]}>
                <Icon
                  type={'Feather'}
                  name={'plus'}
                  style={{color: theme.subSecondaryColor}}
                />
                <Text
                  style={[
                    styles.buttonAddPhotoText,
                    {color: theme.subSecondaryColor},
                  ]}>
                  {' '}
                  Add Photos
                </Text>
              </View>
            </TouchableWithoutFeedback>

            <View
              style={[
                styles.commonView,
                {
                  backgroundColor: theme.backgroundColor,
                  borderColor: theme.borderColor,
                },
              ]}>
              <Text
                style={[
                  styles.commonText,
                  {fontWeight: '600', color: theme.primaryColor},
                ]}>
                Your Information
              </Text>
            </View>
            {this.renderItemView('Height', height, PAGE_NAME.HEIGHT)}
            {this.renderItemView('Body Type', bodyType, PAGE_NAME.BODY_TYPE)}
            {this.renderItemView('Gender', gender, PAGE_NAME.GENDER)}
            {this.renderItemView('Sexuality', sexuality, PAGE_NAME.SEXUALITY)}
            {this.renderItemView(
              'Personality',
              personality,
              PAGE_NAME.PERSONALITY,
            )}
            {this.renderItemView('Education', education, PAGE_NAME.EDUCATION)}
            {this.renderItemView(
              'Marital Status',
              maritalStatus,
              PAGE_NAME.MARITAL_STATUS,
            )}
            {this.renderItemView(
              'Looking for',
              lookingFor,
              PAGE_NAME.LOOKING_FOR,
            )}
            {this.renderItemView('Religion', religion, PAGE_NAME.RELIGION)}
            {this.renderItemView(
              'Drinking',
              drinkingStatus,
              PAGE_NAME.DRINKING,
            )}
            {this.renderItemView('Smoking', smokingStatus, PAGE_NAME.SMOKING)}
            {this.renderItemView('Eating', eatingStatus, PAGE_NAME.EATING)}
            <View style={{marginVertical: 15}} />
          </View>
        </ParallaxScrollView>
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
})(MyProfile);

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
  premiumView: {
    marginHorizontal: 20,
    marginVertical: 15,
  },
  premiumInnerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
    borderRadius: 15,
  },
  premiumText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  fixedSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 0,
    left: 0,
  },
  nameText: {
    paddingHorizontal: 20,
    marginTop: 10,
    fontSize: 24,
    fontWeight: '800',
  },
  readMore: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: '600',
  },
  bioDText: {
    fontSize: 14,
    fontWeight: '400',
  },
  bioText: {
    marginHorizontal: 20,
    height: 100,
    padding: 15,
    paddingTop: 15,
    borderRadius: 15,
    marginTop: 5,
  },
  photoText: {
    paddingHorizontal: 20,
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
    fontSize: 16,
    fontWeight: '400',
  },
});
