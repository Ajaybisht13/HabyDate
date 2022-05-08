import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {connect} from 'react-redux';
import Splash from '../screens/Splash';
import GetStarted from '../screens/auth/GetStarted';
import Home from '../screens/dashboard/home/Home';
import Login from '../screens/auth/Login';
import Verification from '../screens/auth/Verification';
import RegistrationStep from '../screens/auth/RegistrationStep';
import AddPhoto from '../screens/auth/AddPhoto';
import Congratulations from '../screens/auth/Congratulations';
import Menu from '../screens/dashboard/menu/Menu';
import Matches from '../screens/dashboard/matches/Matches';
import Messages from '../screens/dashboard/messages/Messages';
import WhoLikesMe from '../screens/dashboard/messages/WhoLikesMe';
import SeekerRequest from '../screens/dashboard/seekers/SeekerRequestLists';
import PaymentPackages from '../screens/dashboard/payment/PaymentPackages';
import PaymentMethod from '../screens/dashboard/payment/PaymentMethod';
import Notifications from '../screens/dashboard/notifications/Notifications';
import SeekerDetail from '../screens/dashboard/seekers/SeekerDetail';
import SeekerLists from '../screens/dashboard/seekers/SeekerLists';
import SeekerUsers from '../screens/dashboard/seekers/SeekerUsers';
import SeekerSendRequest from '../screens/dashboard/seekers/SeekerForm';
import Settings from '../screens/dashboard/settings/Settings';
import AccountSetting from '../screens/dashboard/settings/AccountSetting';
import MyProfile from '../screens/dashboard/profile/MyProfile';
import OtherProfile from '../screens/dashboard/profile/OtherProfile';
import AllPhoto from '../screens/dashboard/profile/AllPhoto';
import Chat from '../screens/dashboard/messages/Chat';
import Verified from '../screens/auth/VerifiedCode';
import {firebase} from '@react-native-firebase/analytics';
import {GoogleSignin} from '@react-native-community/google-signin';
import {WEB_CLIENT_ID} from '@env';
import UpdateYourInformation from '../screens/dashboard/profile/UpdateYourInformation';
import NHLoader from './components/NHLoader';
import SendMySeekerRequest from '../screens/dashboard/seekers/SeekerMyRequestLists';
import Register from '../screens/auth/Register';

let Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const navigationOption = () => {
  return {
    headerShown: false,
    headerBackTitleVisible: false,
    gestureEnabled: false,
  };
};

let appNav = null;

function CommonView() {
  return (
    <>
      <Stack.Screen name="OtherProfile" component={OtherProfile} />
      <Stack.Screen name="AllPhotos" component={AllPhoto} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="SeekerDetail" component={SeekerDetail} />
      <Stack.Screen
        name="UpdateYourInformation"
        component={UpdateYourInformation}
      />
      <Stack.Screen name="WhoLikeMe" component={WhoLikesMe} />
      <Stack.Screen name="SeekerRequest" component={SeekerRequest} />
    </>
  );
}

function HomeStackScreen() {
  return (
    <Stack.Navigator screenOptions={navigationOption()}>
      <Stack.Screen name="Home" component={Home} />
      {CommonView()}
    </Stack.Navigator>
  );
}

function MyProfileStackScreen() {
  return (
    <Stack.Navigator screenOptions={navigationOption()}>
      <Stack.Screen name="MyProfile" component={MyProfile} />
      {CommonView()}
    </Stack.Navigator>
  );
}

function PaymentStackScreen() {
  return (
    <Stack.Navigator screenOptions={navigationOption()}>
      <Stack.Screen name="PaymentPackages" component={PaymentPackages} />
      <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
    </Stack.Navigator>
  );
}

function MatchesStackScreen() {
  return (
    <Stack.Navigator screenOptions={navigationOption()}>
      <Stack.Screen name="Matches" component={Matches} />
      {CommonView()}
    </Stack.Navigator>
  );
}

function MessagesStackScreen() {
  return (
    <Stack.Navigator screenOptions={navigationOption()}>
      <Stack.Screen name="Messages" component={Messages} />
      {CommonView()}
    </Stack.Navigator>
  );
}

function NotificationStackScreen() {
  return (
    <Stack.Navigator screenOptions={navigationOption()}>
      <Stack.Screen name="Notification" component={Notifications} />
      {CommonView()}
    </Stack.Navigator>
  );
}

function SeekerStackScreen() {
  return (
    <Stack.Navigator screenOptions={navigationOption()}>
      <Stack.Screen name="SeekerList" component={SeekerLists} />
      <Stack.Screen name="SeekerUser" component={SeekerUsers} />
      <Stack.Screen name="SeekerSendRequest" component={SeekerSendRequest} />
      <Stack.Screen
        name="SendMySeekerRequest"
        component={SendMySeekerRequest}
      />
      {CommonView()}
    </Stack.Navigator>
  );
}

function SettingStackScreen() {
  return (
    <Stack.Navigator screenOptions={navigationOption()}>
      <Stack.Screen name="Setting" component={Settings} />
      <Stack.Screen name="AccountSetting" component={AccountSetting} />
    </Stack.Navigator>
  );
}

class AppNavigator extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  async componentDidMount(): void {
    appNav = this;
    await firebase.analytics().setAnalyticsCollectionEnabled(true);
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
    });
  }

  render() {
    const {user, loading} = this.props;

    if (loading) return <Splash />;

    return (
      <NavigationContainer>
        {user === null ? (
          <Stack.Navigator screenOptions={navigationOption()}>
            <Stack.Screen name="GetStarted" component={GetStarted} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Verification" component={Verification} />
            <Stack.Screen
              name="RegistrationStep"
              component={RegistrationStep}
            />
            <Stack.Screen name="AddPhoto" component={AddPhoto} />
            <Stack.Screen name="Congratulations" component={Congratulations} />
            <Stack.Screen name="VerifiedCode" component={Verified} />
          </Stack.Navigator>
        ) : (
          <Drawer.Navigator
            initialRouteName="Home"
            drawerContent={(props) => <Menu {...props} />}
            edgeWidth={0}>
            <Drawer.Screen name="MyProfile" component={MyProfileStackScreen} />
            <Drawer.Screen name="Home" component={HomeStackScreen} />
            <Drawer.Screen name="Payments" component={PaymentStackScreen} />
            <Drawer.Screen name="Matches" component={MatchesStackScreen} />
            <Drawer.Screen name="Messages" component={MessagesStackScreen} />
            <Drawer.Screen
              name="Notifications"
              component={NotificationStackScreen}
            />
            <Drawer.Screen name="Seekers" component={SeekerStackScreen} />
            <Drawer.Screen name="Settings" component={SettingStackScreen} />
          </Drawer.Navigator>
        )}
        <NHLoader loading={this.props.showLoader} />
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  user: state.auth.user,
  theme: state.theme.theme,
  showLoader: state.loader.showLoader,
});

export default connect(mapStateToProps)(AppNavigator);
