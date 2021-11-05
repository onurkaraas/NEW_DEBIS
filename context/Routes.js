import React, {useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';

import Tabs from '../navigation/tabs';
import LogInScreen from '../screens/LogInScreen';

import {AuthContext} from './AuthContext';
import SplashScreen from 'react-native-splash-screen';
import Schedule from '../screens/Schedule';
import {StatusBar} from 'react-native';
import {COLORS} from '../constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {val} from 'cheerio/lib/api/attributes';
import MealMenu from '../screens/MealMenu';
import VeganMenu from '../screens/VeganMenu';
import TranscriptScreen from '../screens/TranscriptScreen';
import Profile from '../screens/Profile';

const Stack = createStackNavigator();

const Routes = () => {
  const {auth, gett, signIn, load, setLoad} = useContext(AuthContext);

  useEffect(() => {
    gett();
    SplashScreen.hide()
  }, []);

  return (
    <NavigationContainer>
      {auth === null ? (
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="Profile">
          <Stack.Screen name={'Profile'} component={Profile} />
        </Stack.Navigator>
      ) : auth === true ? (
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="Tabs">
          <Stack.Screen name={'Hosgeldiniz'} component={Tabs} />
          <Stack.Screen name={'Schedule'} component={Schedule} />
          <Stack.Screen
            name={'TranscriptScreen'}
            component={TranscriptScreen}
          />
          <Stack.Screen name={'MealMenu'} component={MealMenu} />
          <Stack.Screen name={'VeganMenu'} component={VeganMenu} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="LogInScreen">
          <Stack.Screen name={'LogInScreen'} component={LogInScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
export default Routes;
