import React, {Component} from 'react';
import {StyleSheet, Text, View, Modal, TouchableOpacity, Button} from 'react-native';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import regex from '../../utils/regex';
import CommonButton from '../../components/general/CommonButton';
import {loginAction} from '../../actions';

class Congratulations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      toggle1:false,
      toggle2:false,
      toggle3:false,
      toggle4:false,
      toggle5:false,
      toggle6:false,
      toggle7:false,
      toggle8:false,
      toggle10:false
    }
  }
  show1 = () => {
    const newState1 = !this.state.toggle1;
    this.setState({toggle1:newState1})
  }

  show2 = () => {
    const newState2 = !this.state.toggle2;
      this.setState({toggle2:newState2})
  }
  show3 = () => {
    const newState3 = !this.state.toggle3;
      this.setState({toggle3:newState3})
  }
  show4 = () => {
    const newState4 = !this.state.toggle4;
      this.setState({toggle4:newState4})
  }
  show5 = () => {
    const newState5 = !this.state.toggle5;
      this.setState({toggle5:newState5})
  }
  show6 = () => {
    const newState6 = !this.state.toggle6;
      this.setState({toggle6:newState6})
  }
  show7 = () => {
    const newState7 = !this.state.toggle7;
      this.setState({toggle7:newState7})
  }
  show8 = () => {
    const newState8 = !this.state.toggle8;
      this.setState({toggle8:newState8})
  }
  show10 = () => {
    const newState10 = !this.state.toggle10;
      this.setState({toggle10:newState10})
  }   
  discoverData = () => {
    const {route} = this.props;
    let params = route.params;
    let data = params.data;

    let parameter = {token: data.uid, ...data};
    regex.setDashboard(parameter).then((response) => {
      if (response) this.props.loginAction(parameter);
    });
    this.setState({show:false})
  };
  discoverNowPress = () => {
    this.setState({show:true})
  };
  render() {
    const {theme, route} = this.props;
    let params = route.params;
    let photoData = params.photoData;
    let data = params.data;
    const {toggle1, toggle2, toggle3,toggle4,toggle5,toggle6,toggle7,toggle8,toggle10} = this.state;
    const buttonbg1 = toggle1?"#FF1493":"gray";
    const buttonbg2 = toggle2?"#FF1493":"gray";
    const buttonbg3 = toggle3?"#FF1493":"gray";
    const buttonbg4 = toggle4?"#FF1493":"gray";
    const buttonbg5 = toggle5?"#FF1493":"gray";
    const buttonbg6 = toggle6?"#FF1493":"gray";
    const buttonbg7 = toggle7?"#FF1493":"gray";
    const buttonbg8 = toggle8?"#FF1493":"gray";
    const buttonbg10 = toggle10?"#FF1493":"gray";
    return (
      <View
        style={[
          styles.container,
          {backgroundColor: theme.container.backgroundColor},
        ]}>
        <View style={styles.iconView}>
          <FastImage
            source={{uri: photoData[0].path}}
            style={{width: 150, height: 150, borderRadius: 75}}
          />
          <Text style={[styles.logoText, {color: theme.secondaryColor}]}>
            {data.name}
          </Text>
        </View>
        <View style={[styles.bottomView]}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <FastImage
              source={require('./../../assets/congo.png')}
              style={{width: 60, height: 62}}
            />
            <Text style={[styles.congoText, {color: theme.secondaryColor}]}>
              Congratulations!
            </Text>
            <Text style={[styles.messageText, {color: theme.subPrimaryColor}]}>
              You have successfully completed your profile
            </Text>
          </View>
          <CommonButton
            theme={theme}
            container={{marginBottom: regex.aspectRatio(60)}}
            backgroundColor={theme.pinkColor}
            borderColor={theme.pinkColor}
            textColor={theme.backgroundColor}
            title={'Discover Now'}
            onPress={this.discoverNowPress}
          />
        </View>
        <Modal transparent= {true} visible={this.state.show} animationType="slide">
              <View style = {{backgroundColor:"#000000aa", flex:1}}>
                 <View style={{borderRadius:20,height:"90%",backgroundColor:"#ffffff", width:"80%", top :"5%", alignSelf:"center", padding:"5%", display:"flex", justifyContent:"space-between"}}>
                 <Text style={{alignSelf:"center", fontSize:20}}>Intrested In</Text>
                 <TouchableOpacity  style= {{backgroundColor:"white", height: 40, borderRadius:30, borderColor:buttonbg1, borderWidth:1}} onPress = {() => this.show1()}>
                       <Text style= {{alignSelf:"center", top:"20%", color:buttonbg1}}>Dating</Text>
                     </TouchableOpacity>
                     <TouchableOpacity style= {{backgroundColor:"white", height: 40, borderRadius:30, borderWidth:1, borderColor:buttonbg2}} onPress = {() => this.show2()}>
                       <Text style= {{alignSelf:"center", top:"20%", color: buttonbg2}}>Friendship</Text>
                     </TouchableOpacity>
                     <TouchableOpacity style= {{backgroundColor:"white",height: 40, borderRadius:30, borderWidth:1, borderColor:buttonbg3}} onPress = {() => this.show3()}>
                       <Text style= {{alignSelf:"center", top:"20%", color: buttonbg3}}>Chat Buddy</Text>
                     </TouchableOpacity>
                     <TouchableOpacity style= {{backgroundColor:"white", height: 40, borderRadius:30, borderWidth:1, borderColor:buttonbg4}} onPress = {() => this.show4()}>
                       <Text style= {{alignSelf:"center", top:"20%", color: buttonbg4}}>High Buddy</Text>
                     </TouchableOpacity>
                     <TouchableOpacity style= {{backgroundColor:"white", height: 40, borderRadius:30, borderWidth:1, borderColor:buttonbg8}} onPress = {() => this.show8()}>
                       <Text style= {{alignSelf:"center", top:"20%", color: buttonbg8}}>Hookups</Text>
                     </TouchableOpacity>
                     <TouchableOpacity style= {{backgroundColor:"white", height: 40, borderRadius:30, borderWidth:1, borderColor:buttonbg10}} onPress = {() => this.show10()}>
                       <Text style= {{alignSelf:"center", top:"20%", color:buttonbg10}}>Friends with benefits</Text>
                     </TouchableOpacity>
                     <Button title="Ok" color="#FF1493" onPress={() => this.discoverData()}/>
                 </View>
              </View>
            </Modal>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  theme: state.theme.theme,
});

export default connect(mapStateToProps, {loginAction})(Congratulations);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    marginTop: 10,
    fontSize: 26,
    fontWeight: '500',
  },
  bottomView: {
    flex: 1,
  },
  congoText: {
    marginTop: 5,
    fontSize: 26,
    fontWeight: '800',
  },
  messageText: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: '400',
  },
});
