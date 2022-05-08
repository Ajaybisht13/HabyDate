import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import NHHeader from '../../../components/general/NHHeader';
import WhoLikeItem from './components/WhoLikeItem';
import regex from '../../../utils/regex';
import {
  peopleWhoLikedCountCountAction,
  updateUserDataAction,
} from '../../../actions';

class MessagesScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(): void {
    this.updateWhoLikedCount({
      likedReadCount: this.props.peopleWhoLiked.length,
    });
  }

  updateWhoLikedCount = (parameter) => {
    this.props.updateUserDataAction(this.props.user.uid, parameter, 'whoLiked');
    this.props.peopleWhoLikedCountCountAction();
  };

  onBackPress = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  renderData = () => {
    const {theme, navigation, peopleWhoLiked, user} = this.props;

    if (!regex.isPremiumUser(user.packageEndDate)) {
      return (
        <View style={styles.emptyView}>
          <Text style={[styles.infoText, {color: theme.subPrimaryColor}]}>
            See people who likes you with HabyDate Premium
          </Text>
        </View>
      );
    }

    if (peopleWhoLiked.length === 0) {
      return (
        <View style={styles.emptyView}>
          <Text style={[styles.infoText, {color: theme.subPrimaryColor}]}>
            No likes found for you.
          </Text>
        </View>
      );
    } else {
      return (
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={peopleWhoLiked}
          extraData={peopleWhoLiked}
          renderItem={({item}) => <WhoLikeItem theme={theme} item={item} />}
          keyExtractor={(item, index) => item.uid.toString()}
        />
      );
    }
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
          title={'People who liked you'}
          theme={theme}
          onLeftPress={this.onBackPress}
        />
        <View
          style={[
            styles.container,
            {backgroundColor: theme.container.backgroundColor},
          ]}>
          {this.renderData()}
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  theme: state.theme.theme,
  user: state.auth.user,
  peopleWhoLiked: state.peopleLiked.peopleWhoLiked,
});

export default connect(mapStateToProps, {
  peopleWhoLikedCountCountAction,
  updateUserDataAction,
})(MessagesScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 20,
  },
  infoText: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: '400',
    textAlign: 'center',
  },
});
