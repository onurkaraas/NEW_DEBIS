import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import Tabs from "./navigation/tabs";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "./constants/theme";
import LogInScreen from "./screens/LogInScreen";
const Stack = createStackNavigator();
import { Provider as AuthProvider } from "./screens/AuthContext";

const App = () => {
  const isLogged = false;
  const [loaded] = useFonts({
    "SF-Pro-Display-Regular": require("./assets/fonts/SF-Pro-Display-Regular.ttf"),
    "SF-Pro-Display-Medium": require("./assets/fonts/SF-Pro-Text-Medium.ttf"),
    "SF-Pro-Display-Bold": require("./assets/fonts/SF-Pro-Display-Bold.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="home"
          screenOptions={{
            headerTitleAlign: "center",
          }}
        >
          {isLogged ? (
            <>
              <Stack.Screen
                options={{
                  title: "Giriş Yapınız",

                  headerStyle: {
                    backgroundColor: COLORS.secondary,
                  },
                  headerTintColor: "#fff",
                }}
                name={"home"}
                component={LogInScreen}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                options={{
                  title: "Hosgeldiniz",

                  headerStyle: {
                    backgroundColor: COLORS.secondary,
                  },
                  headerTintColor: "#fff",
                }}
                name={"home"}
                component={Tabs}
              />
            </>
          )}
        </Stack.Navigator>
        <StatusBar backgroundColor={COLORS.secondary} />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};
