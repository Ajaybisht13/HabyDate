import React, {Component} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import {connect} from 'react-redux';
import {seekerData} from '../../../json/seekerData';
import NHHeader from '../../../components/general/NHHeader';
import SeekerItem from './components/SeekerItem';
import {Icon} from 'native-base';

class SeekerLists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seekerData,
    };
  }

  onBackPress = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  onSendSeeker = () => {
    const {navigation} = this.props;
    navigation.navigate('SendMySeekerRequest');
  };

  render() {
    const {seekerData} = this.state;
    const {theme, navigation} = this.props;

    return (
      <View
        style={[
          styles.container,
          {backgroundColor: theme.container.backgroundColor},
        ]}>
        <NHHeader
          title={'Seekers'}
          theme={theme}
          rightView={
            <TouchableWithoutFeedback onPress={this.onSendSeeker}>
              <View style={styles.buttonView}>
                <Icon
                  type={'Feather'}
                  name={'send'}
                  style={{fontSize: 28, color: theme.primaryColor}}
                />
              </View>
            </TouchableWithoutFeedback>
          }
          onLeftPress={this.onBackPress}
        />
        <View
          style={[
            styles.container,
            {
              backgroundColor: theme.container.backgroundColor,
              paddingHorizontal: 10,
            },
          ]}>
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={seekerData}
            extraData={seekerData}
            renderItem={({item}) => (
              <SeekerItem theme={theme} navigation={navigation} item={item} />
            )}
            numColumns={3}
            keyExtractor={(item, index) => item.id.toString()}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  theme: state.theme.theme,
});

export default connect(mapStateToProps)(SeekerLists);

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
});
