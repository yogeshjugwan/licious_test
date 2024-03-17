// depandance
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator, useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
// Screens
import * as Icons from '../helpers/Icons.js';
import * as Config from '../helpers/Config.js';
import Books from '../screens/Books.js';
import FavoriteBooks from '../screens/FavoriteBooks.js';
import { heightToDp, widthToDp } from '../helpers/Responsive.js';
import CustomTabBarIcon from '../components/CustomTabBarIcon.js';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const LandingStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        headerShown: false,
      }}
    >
      <Stack.Screen name="login" component={BottomTabs}
      />


    </Stack.Navigator>
  );
};

const BottomTabs = () => {
  return (
    <Tab.Navigator
      // tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        tabBarActiveTintColor: Config.Colors.themeColor,
        tabBarInactiveTintColor: Config.Colors.bottomColor,
        tabBarStyle: {
          height: heightToDp(8),
          // paddingVertical: 10,
          paddingBottom: 10,
          paddingTop: 10
        },
        tabBarLabelStyle: {
          fontSize: widthToDp(3),
          fontFamily: Config.fontFamilys.Poppins_SemiBold,
        },
        tabBarHideOnKeyboard: true,
      }}
      initialRouteName='markattendance'

    >
      <Tab.Screen
        name="books"
        options={{
          tabBarLabel: 'Books',
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon
              focused={focused}
              iconSource={Icons?.library_icon} // Replace with your image path
            />
          ),

        }}
        component={Books} />
      <Tab.Screen
        name="favoriteBooks "
        options={{
          tabBarLabel: 'Favorite Books',
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon
              focused={focused}
              iconSource={Icons?.favorite_icon} // Replace with your image path not uri
            />
          )
        }}
        component={FavoriteBooks} />
    </Tab.Navigator>
  )
}


export {  LandingStack };
