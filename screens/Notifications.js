import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS } from "../constants/theme";
import semesterList from "./semesterList";
const Notifications = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.primary,
      }}
    >
      {semesterList()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containere: {
    flex: 1,

    borderRadius: 25,
    backgroundColor: "white",
  },
  head: {
    margin: 6,
  },
  text: {
    color: "black",
    ...FONTS.body3,
    paddingVertical: 8,
    marginLeft: 32,
    textAlign: "left",
  },
});

export default Notifications;
