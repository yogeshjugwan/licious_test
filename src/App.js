import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import Splash from './screens/Splash';
import { Provider } from 'react-redux';
import * as RootNavigation from './navigation/RootNavigation';
import { store } from './redux/store';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
function App() {
  return (
    <>
      <Provider store={store}>
        <NavigationContainer ref={RootNavigation.navigationRef}>
          <Splash />
          <Toast />
        </NavigationContainer>
      </Provider>
    </>
  );
}

export default App;
