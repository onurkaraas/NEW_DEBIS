import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthContext} from './AuthContext';
import 'react-native-gesture-handler';
import {
  Tabs,
  TranscriptScreen,
  MealMenu,
  VeganMenu,
  LogInScreen,
  LessonResultScreen,
  LoginCheckScreen,
  LoanCheckScreen,
} from '../screens';
const Stack = createStackNavigator();

const Routes = () => {
  const {states} = useContext(AuthContext);

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
          <Stack.Screen name={'LoanCheckScreen'} component={LoanCheckScreen} />
          <Stack.Screen name={'MealMenu'} component={MealMenu} />
          <Stack.Screen name={'VeganMenu'} component={VeganMenu} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="LoginCheckScreen">
          <Stack.Screen
            name={'LoginCheckScreen'}
            component={LoginCheckScreen}
          />
          <Stack.Screen name={'LogInScreen'} component={LogInScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
export default Routes;
