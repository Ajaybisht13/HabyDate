/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import thunk from "redux-thunk";
import reducer from './src/reducers';
import AppNavigator from './src/navigators/AppNavigator';
import enableFontPatch from './src/navigators/enableFontPatch';

export const getStore = createStore(reducer, applyMiddleware(thunk));

// Android: Set Default Font sans-serif-medium
enableFontPatch();

class App extends React.Component {
  render() {
    return (
      <Provider store={getStore}>
        <AppNavigator />
      </Provider>
    );
  }
}

export default App;
