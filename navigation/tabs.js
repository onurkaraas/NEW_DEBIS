import React from "react";
import { useWindowDimensions } from "react-native";
import Home from "../screens/Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Search from "../screens/Search";
import Add from "../screens/Add";
import Profile from "../screens/Profile";
import Notifications from "../screens/Notifications";
import { COLORS } from "../constants/theme";
const Tab = createMaterialBottomTabNavigator();

const Tabs = () => {
  const window = useWindowDimensions();

  return (
    <Tab.Navigator
      activeColor={COLORS.green}
      inactiveColor={"#96A7AF"}
      barStyle={{
        backgroundColor: COLORS.secondary,
        height: window.height * 0.1,
        position: "absolute",
        overflow: "hidden",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        justifyContent: "center",
      }}
      labeled={false}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          switch (route.name) {
            case "Home":
              return (
                <MaterialCommunityIcons color={color} name="home" size={26} />
              );
            case "Search":
              return (
                <MaterialCommunityIcons
                  name="arrow-right"
                  color={color}
                  size={26}
                />
              );
            case "Add":
              return (
                <MaterialCommunityIcons name="plus" color={color} size={26} />
              );
            case "Notifications":
              return (
                <MaterialCommunityIcons name="alarm" color={color} size={26} />
              );
            case "Profile":
              return (
                <MaterialCommunityIcons
                  name="account-circle"
                  color={color}
                  size={26}
                />
              );
          }
        },
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Add" component={Add} options={{ headerShown: false }} />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
