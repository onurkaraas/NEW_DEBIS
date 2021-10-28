import React, {useContext, useEffect, useState} from 'react';
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';

import Tabs from '../navigation/tabs';
import LogInScreen from '../screens/LogInScreen';

import {AuthContext} from './AuthContext';

const Stack = createStackNavigator();

const Routes = () => {
  const {auth, tex1} = useContext(AuthContext);
  tex1();
  return (
    <NavigationContainer>
      {auth ? (
        <Stack.Navigator
          screenOptions={{headerShown: false, animationEnabled: false}}
          initialRouteName="Tabs">
          <Stack.Screen name={'Hosgeldiniz'} component={Tabs} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{headerShown: false, animationEnabled: false}}
          initialRouteName="LogInScreen">
          <Stack.Screen name={'LogInScreen'} component={LogInScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
export default Routes;
