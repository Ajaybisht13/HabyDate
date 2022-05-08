import React, {Component} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import NHHeader from '../../../components/general/NHHeader';
import NotificationItem from './components/NotificationItem';
import {
  notificationAction,
  notificationCountAction,
  updateUserDataAction,
} from '../../../actions';

class Notifications extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(): void {
    this.getData();
  }

  shouldComponentUpdate(nextProps, nextState, nextContext: any): boolean {
    let readCount = this.props.notifications;
    if (nextProps.notifications.length > readCount)
      this.updateNotificationCount({
        notificationReadCount: nextProps.notifications.length,
      });

    return true;
  }

  getData = () => {
    this.props
      .notificationAction({
        uid: this.props.user.uid,
        notificationReadCount: this.props.user.notificationReadCount,
      })
      .then((res) => {
        if (res.length > 0)
          this.updateNotificationCount({notificationReadCount: res.length});
      });
  };

  updateNotificationCount = (parameter) => {
    this.props.updateUserDataAction(
      this.props.user.uid,
      parameter,
      'notifications',
    );
    this.props.notificationCountAction();
  };

  onBackPress = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  render() {
    const {theme, navigation, notifications} = this.props;

    return (
      <View
        style={[
          styles.container,
          {backgroundColor: theme.container.backgroundColor},
        ]}>
        <NHHeader
          title={'Notifications'}
          theme={theme}
          onLeftPress={this.onBackPress}
        />
        <View style={[styles.innerView]}>
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={notifications}
            extraData={notifications}
            renderItem={({item}) => (
              <NotificationItem
                refreshData={this.getData}
                theme={theme}
                item={item}
                navigation={navigation}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  theme: state.theme.theme,
  user: state.auth.user,
  notifications: state.notification.notifications,
});

export default connect(mapStateToProps, {
  notificationAction,
  notificationCountAction,
  updateUserDataAction,
})(Notifications);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerView: {
    flex: 1,
  },
});
