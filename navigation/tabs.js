import React from 'react';
import 'react-native-gesture-handler';
import {useWindowDimensions} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../constants/theme';
import TranscriptScreen from '../screens/TranscriptScreen';
import LessonResultScreen from '../screens/LessonResultScreen';
import Home from '../screens/Home';
import {ExitScreen} from '../screens';

const Tab = createMaterialBottomTabNavigator();

const Tabs = () => {
  const window = useWindowDimensions();
  const icons = {
    Anasayfa: 'home-outline',
    Çıkış: 'exit-to-app',
  };
  return (
    <Tab.Navigator
      activeColor={COLORS.green}
      inactiveColor={'#96A7AF'}
      tabBarShowLabel={false}
      barStyle={{
        backgroundColor: COLORS.secondary,
        height: window.height * 0.09,
        position: 'absolute',
        overflow: 'hidden',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        justifyContent: 'center',
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          return (
            <MaterialCommunityIcons
              name={icons[route.name]}
              color={color}
              size={26}
            />
          );
        },
      })}>
      <Tab.Screen name="Anasayfa" component={Home} />
      <Tab.Screen name="Çıkış" component={ExitScreen} />
    </Tab.Navigator>
  );
};

export default Tabs;
