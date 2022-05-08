import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';

class VerifiedCode extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const {theme} = this.props;

    return (
      <View
        style={[
          styles.container,
          {backgroundColor: theme.container.backgroundColor},
        ]}>
        <View style={styles.innerContainer}>
          <FastImage
            source={require('./../../assets/verifiedCode.png')}
            style={{width: 83, height: 106}}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  theme: state.theme.theme,
});

export default connect(mapStateToProps)(VerifiedCode);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
