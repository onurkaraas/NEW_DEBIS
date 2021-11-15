import React, {useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthContext} from './AuthContext';
import SplashScreen from 'react-native-splash-screen';
import 'react-native-gesture-handler';
import {
  Tabs,
  ExitScreen,
  Schedule,
  TranscriptScreen,
  MealMenu,
  VeganMenu,
  LogInScreen,
  LessonResultScreen,
} from '../screens';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createStackNavigator();

const Routes = () => {
  const {states, getData, signIn} = useContext(AuthContext);
  const getLoginData = async () => {
    try {
      const value = await AsyncStorage.getItem('@loginInfo');
      if (value !== null && states.auth !== true) {
        const valueObject = JSON.parse(value);
        console.log(valueObject);
        await signIn(valueObject);
      } else {
        getData();
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getLoginData();
  }, []);

  return (
    <NavigationContainer>
      {states.auth === true ? (
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="Tabs">
          <Stack.Screen name={'Tabs'} component={Tabs} />
          <Stack.Screen
            name={'LessonResultScreen'}
            component={LessonResultScreen}
          />
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
