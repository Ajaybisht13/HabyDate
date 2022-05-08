import React, {Component} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import NHHeader from '../../../components/general/NHHeader';
import AllPhotoItem from '../../../components/general/AllPhotoItem';

class AllPhoto extends Component {
  constructor(props) {
    super(props);
    let params = props.route.params;
    this.state = {
      photoData: params.photos,
    };
  }

  onBackPress = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  render() {
    const {photoData} = this.state;
    const {theme, navigation} = this.props;

    return (
      <View
        style={[
          styles.container,
          {backgroundColor: theme.container.backgroundColor},
        ]}>
        <NHHeader
          title={'All Photos'}
          theme={theme}
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
            data={photoData}
            extraData={photoData}
            renderItem={({item}) => <AllPhotoItem theme={theme} item={item} />}
            numColumns={2}
            keyExtractor={(item, index) => item.public_id.toString()}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  theme: state.theme.theme,
});

export default connect(mapStateToProps)(AllPhoto);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
