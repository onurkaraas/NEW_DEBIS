import React from 'react';
import {useWindowDimensions} from 'react-native';
import 'react-native-gesture-handler';
import Home from '../screens/Home';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import TranscriptScreen from '../screens/TranscriptScreen';
import Profile from '../screens/Profile';
import LessonResultScreen from '../screens/LessonResultScreen';
import {COLORS} from '../constants/theme';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
const Tab = createMaterialBottomTabNavigator();

const Tabs = () => {
  const window = useWindowDimensions();

  return (
    <Tab.Navigator
      activeColor={COLORS.green}
      inactiveColor={'#96A7AF'}
      barStyle={{
        backgroundColor: COLORS.secondary,
        height: window.height * 0.1,
        position: 'absolute',
        overflow: 'hidden',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        justifyContent: 'center',
      }}
      labeled={false}
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          switch (route.name) {
            case 'Home':
              return (
                <MaterialCommunityIcons
                  name="home-outline"
                  color={color}
                  size={26}
                />
              );
            case 'TranscriptScreen':
              return (
                <MaterialCommunityIcons name="plus" color={color} size={26} />
              );
            case 'LessonResultScreen':
              return (
                <MaterialCommunityIcons name="alarm" color={color} size={26} />
              );
            case 'Profile':
              return (
                <MaterialCommunityIcons
                  name="account-circle"
                  color={color}
                  size={26}
                />
              );
          }
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="TranscriptScreen" component={TranscriptScreen} />
      <Tab.Screen name="LessonResultScreen" component={LessonResultScreen} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default Tabs;
