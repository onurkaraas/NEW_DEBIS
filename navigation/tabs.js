import React from 'react';
import 'react-native-gesture-handler';
import {useWindowDimensions} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../constants/theme';
import TranscriptScreen from '../screens/TranscriptScreen';
import LessonResultScreen from '../screens/LessonResultScreen';
import Home from '../screens/Home';

const Tab = createMaterialBottomTabNavigator();

const Tabs = () => {
  const window = useWindowDimensions();

  return (
    <Tab.Navigator
      activeColor={COLORS.green}
      inactiveColor={'#96A7AF'}
      barStyle={{
        backgroundColor: COLORS.secondary,
        height: window.height * 0.09,
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
                <MaterialCommunityIcons
                  name="file-document"
                  color={color}
                  size={26}
                />
              );
            case 'LessonResultScreen':
              return (
                <MaterialCommunityIcons
                  name="alpha-a-box"
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
    </Tab.Navigator>
  );
};

export default Tabs;
