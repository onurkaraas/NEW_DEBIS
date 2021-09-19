import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

import { useFonts } from "expo-font";
import Tabs from "./navigation/tabs";
import Home from "./screens/Home";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "./constants/theme";

const Stack = createStackNavigator();

const App = () => {
  const [loaded] = useFonts({
    "SF-Pro-Display-Medium": require("./assets/fonts/SF-Pro-Text-Medium.ttf"),
    "SF-Pro-Display-Bold": require("./assets/fonts/SF-Pro-Display-Bold.ttf"),
    "SF-Pro-Display-Regular": require("./assets/fonts/SF-Pro-Display-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name={"a"}
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen name={"home"} component={Tabs} />
      </Stack.Navigator>
      <StatusBar backgroundColor={COLORS.secondary} />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default () => {
  return <App />;
};
