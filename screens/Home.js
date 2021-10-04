import React from "react";
import { Text, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS } from "../constants/theme";
const Home = () => {
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
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            height: window.height * 0.25,
            width: window.width * 0.9,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 25,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              flex: 0.3,
              borderBottomWidth: 1,
              borderColor: "gray",
              flexDirection: "column",
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "flex-start" }}
            >
              <Text>qweeqqew</Text>
            </View>
            <View style={{ justifyContent: "flex-end" }}>
              <Text>qweeqqew</Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              flex: 0.3,
              borderBottomWidth: 1,
              borderColor: "gray",
            }}
          >
            <Text>qweeqqew</Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              flex: 0.3,
              borderBottomWidth: 1,
              borderColor: "gray",
            }}
          >
            <Text>qweeqqew</Text>
          </View>
        </View>
      </View>

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

export default Home;
