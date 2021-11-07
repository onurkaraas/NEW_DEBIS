import React, {useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthContext} from './AuthContext';
import SplashScreen from 'react-native-splash-screen';
import 'react-native-gesture-handler';
import {
  Tabs,
  LoadingScreen,
  Schedule,
  TranscriptScreen,
  MealMenu,
  VeganMenu,
  LogInScreen,
} from '../screens';
const Stack = createStackNavigator();

const Routes = () => {
  const {auth, gett} = useContext(AuthContext);

  useEffect(() => {
    gett();
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      {auth === null ? (
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="LoadingScreen">
          <Stack.Screen name={'LoadingScreen'} component={LoadingScreen} />
        </Stack.Navigator>
      ) : auth === true ? (
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="Tabs">
          <Stack.Screen name={'Tabs'} component={Tabs} />
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
