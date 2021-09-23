import React from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS, FONTS } from "../constants/theme";
import { useNavigation } from "@react-navigation/native";

const Home = ({ color }) => {
  const navigation = useNavigation();

  function renderIcons(name, category) {
    const window = useWindowDimensions();

    return (
      <View
        style={{
          alignItems: "center",
          width: window.width * 0.8,
          flex: 1,
        }}
      >
        <View
          style={{
            backgroundColor: COLORS.green,
            height: window.height * 0.135,
            alignItems: "center",
            width: window.height * 0.135,
            borderRadius: 25,
          }}
        >
          <View style={{ flex: 1, justifyContent: "center" }}>
            <MaterialCommunityIcons
              name={name}
              color={COLORS.white}
              size={60}
            />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            height: 10,
            width: 95,
          }}
        >
          <Text
            style={{
              textAlign: "center",

              color: COLORS.white,
              fontSize: 17,
              fontFamily: "SF-Pro-Display-Bold",
            }}
          >
            {category}
          </Text>
        </View>
      </View>
    );
  }
  const window = useWindowDimensions();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.primary,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-end",
          marginBottom: window.height * 0.175,
        }}
      >
        <View
          style={{
            marginBottom: 50,
            flexDirection: "row",
          }}
        >
          {renderIcons("calendar", "Akademik Takvim")}
          {renderIcons("calendar-check", "Ders Programi")}
          {renderIcons("message-draw", "Mesajlar")}
        </View>
        <View style={{ flexDirection: "row" }}>
          {renderIcons("calendar-remove", "Devamsizlik")}
          {renderIcons("food", "Yemek Menusu")}
          {renderIcons("signal-hspa-plus", "Not Bilgisi")}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    paddingTop: 30,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "300",
    marginBottom: 20,
  },
  header: {
    backgroundColor: "#F5FCFF",
    padding: 10,
  },
  headerText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
  content: {
    padding: 20,
    backgroundColor: "#fff",
  },
  active: {
    backgroundColor: "rgba(255,255,255,1)",
  },
  inactive: {
    backgroundColor: "rgba(245,252,255,1)",
  },
  selectors: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  selector: {
    backgroundColor: "#F5FCFF",
    padding: 10,
  },
  activeSelector: {
    fontWeight: "bold",
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: "500",
    padding: 10,
    textAlign: "center",
  },
  multipleToggle: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 30,
    alignItems: "center",
  },
  multipleToggle__title: {
    fontSize: 16,
    marginRight: 8,
  },
});

export default Home;
