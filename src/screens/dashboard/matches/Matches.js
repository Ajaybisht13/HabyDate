import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import NHHeader from '../../../components/general/NHHeader';
import MatchItem from './components/MatchItem';
import regex from '../../../utils/regex';
import {matchesAction} from '../../../actions';

class Matches extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(): void {
    this.props.matchesAction(this.props.user.uid, true);
  }

  onBackPress = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  onRightPress = () => {};

  renderData = () => {
    const {theme, navigation, matches, user} = this.props;

    if (!regex.isPremiumUser(user.packageEndDate)) {
      return (
        <View style={styles.emptyView}>
          <Text style={[styles.infoText, {color: theme.subPrimaryColor}]}>
            See people who matches with you with HabyDate Premium
          </Text>
        </View>
      );
    }

    if (matches.length === 0) {
      return (
        <View style={styles.emptyView}>
          <Text style={[styles.infoText, {color: theme.subPrimaryColor}]}>
            No matches found for you.
          </Text>
        </View>
      );
    } else {
      return (
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={matches}
          extraData={matches}
          renderItem={({item}) => <MatchItem theme={theme} item={item} />}
          numColumns={2}
          keyExtractor={(item, index) => item.customId.toString()}
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
          title={'Matches'}
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
  matches: state.matche.matches,
});

export default connect(mapStateToProps, {matchesAction})(Matches);

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
