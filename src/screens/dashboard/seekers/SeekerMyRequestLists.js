import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import NHHeader from '../../../components/general/NHHeader';
import SeekerRequest from './components/SeekerRequest';
import {mySeekerRequestListAction} from '../../../actions';

class SeekerMyRequestLists extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(): void {
    this.props.mySeekerRequestListAction(this.props.user.uid);
  }

  onBackPress = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  render() {
    const {theme, navigation, mySendSeekerRequests} = this.props;

    return (
      <View
        style={[
          styles.container,
          {backgroundColor: theme.container.backgroundColor},
        ]}>
        <NHHeader
          title={'Send My Seekers Request'}
          theme={theme}
          onLeftPress={this.onBackPress}
        />
        <View
          style={[
            styles.container,
            {backgroundColor: theme.container.backgroundColor},
          ]}>
          {mySendSeekerRequests.length === 0 ? (
            <View style={styles.emptyView}>
              <Text style={[styles.infoText, {color: theme.subPrimaryColor}]}>
                No data found
              </Text>
            </View>
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={mySendSeekerRequests}
              extraData={mySendSeekerRequests}
              renderItem={({item}) => (
                <SeekerRequest
                  type={'my'}
                  theme={theme}
                  navigation={navigation}
                  item={item}
                />
              )}
              keyExtractor={(item, index) => item.seeker_id.toString()}
            />
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  theme: state.theme.theme,
  user: state.auth.user,
  mySendSeekerRequests: state.seeker.mySendSeekerRequests,
});

export default connect(mapStateToProps, {mySeekerRequestListAction})(
  SeekerMyRequestLists,
);

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
