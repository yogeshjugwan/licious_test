import { View, Text, useColorScheme, SafeAreaView, StatusBar } from 'react-native'
import React from 'react'
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { useDispatch } from 'react-redux';
import Welcome from './Welcome';
import * as Config from '../helpers/Config';
import Toast from 'react-native-toast-message';

import NetInfo from "@react-native-community/netinfo";

const Splash = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  React.useEffect(() => {
    console.log("introDetails")

    const unsubscribe = NetInfo.addEventListener((state) => {
      // console.log("state.isConnected-1", state.isConnected);
      if (!state.isConnected) {
        Toast.show({
          type: 'info',
          text1: 'Opps! Something is went wrong',
          position: 'top',
        });
      }
    });

    // Fetch initial network status
    NetInfo.refresh().then(state => {
      // console.log("state.isConnected-2", state)
      if (!state.isConnected) {
        Toast.show({
          type: 'info',
          text1: 'Opps! Something is went wrong',
          position: 'top',
        });
      }
    });
    // Cleanup function
    return () => {
      unsubscribe();
    };
  }, []);
  // }

  return (
    <SafeAreaView style={{ ...backgroundStyle, flex: 1 }}>
      <StatusBar
        barStyle={Config.Colors.defaultColor}
        backgroundColor={Config.Colors.primary}
      />
      <Welcome />
      {/* <Profile/> */}
    </SafeAreaView>
  )
}

export default Splash