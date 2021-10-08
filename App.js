import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Tabs from "./navigation/tabs";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "./constants/theme";
import LogInScreen from "./screens/LogInScreen";
const Stack = createStackNavigator();
import { Provider as AuthProvider } from "./context/AuthContext";

const App = () => {
  const isLogged = false;

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="home"
      >
        {isLogged ? (
          <>
            <Stack.Screen name={"home"} component={LogInScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name={"Hosgeldiniz"} component={Tabs} />
          </>
        )}
      </Stack.Navigator>
      <StatusBar backgroundColor={COLORS.secondary} />
    </NavigationContainer>
  );
};

export default () => {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </SafeAreaProvider>
  );
};
