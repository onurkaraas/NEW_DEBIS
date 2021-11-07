import React from 'react';
import {useWindowDimensions, View} from 'react-native';
import 'react-native-gesture-handler';
import Home from '../screens/Home';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import PdfFunc from '../screens/pdfScreens/PdfFunc';
import LoadingScreen from '../screens/LoadingScreen';
import LessonResultScreen from '../screens/LessonResultScreen';
import {COLORS} from '../constants/theme';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Schedule from '../screens/Schedule';
import TranscriptScreen from '../screens/TranscriptScreen';
import MealMenu from '../screens/pdfScreens/MealMenu';
import VeganMenu from '../screens/pdfScreens/VeganMenu';
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
            // case 'LoadingScreen':
            //   return (
            //     <MaterialCommunityIcons
            //       name="account-circle"
            //       color={color}
            //       size={26}
            //     />
            //   );
          }
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="TranscriptScreen" component={TranscriptScreen} />
      <Tab.Screen name="LessonResultScreen" component={LessonResultScreen} />
      {/*<Tab.Screen name="LoadingScreen" component={LoadingScreen} />*/}
    </Tab.Navigator>
  );
};

export default Tabs;
