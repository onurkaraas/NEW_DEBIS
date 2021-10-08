import React from "react";
import { Text, useWindowDimensions, View, Pressable } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS, FONTS } from "../constants/theme";
import { useNavigation } from "@react-navigation/native";
import LogInScreen from "./LogInScreen";
import LessonResultScreen from "./LessonResultScreen";
import Profile from "./Profile";
import TranscriptScreen from "./TranscriptScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../topBar";

const Home = () => {
  const navigation = useNavigation();
  function renderStudentInfo() {
    return (
      <View
        style={{
          height: window.height * 0.25,
          width: window.width * 0.9,
          backgroundColor: "white",
          justifyContent: "center",
          borderRadius: 25,
          padding: 12,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            flex: 0.3,
            borderColor: "gray",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ justifyContent: "space-between" }}>
              <Text style={FONTS.h3}>ADI SOYADI </Text>
            </View>
            <View>
              <Text>qweeqqew</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            flex: 0.3,
            borderColor: "gray",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ justifyContent: "space-between" }}>
              <Text style={FONTS.h3}>ÖĞRENCİ NO:</Text>
            </View>
            <View>
              <Text>qweeqqew</Text>
            </View>
          </View>
        </View>

        <View
          style={{
            justifyContent: "center",
            flex: 0.3,
            borderColor: "gray",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ justifyContent: "space-between" }}>
              <Text style={FONTS.h3}>KÜMÜLATİF:</Text>
            </View>
            <View>
              <Text>qweeqqew</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
  function renderIcons(name, category, navigate) {
    const window = useWindowDimensions();
    return (
      <Pressable
        style={{ flex: 1, alignItems: "center" }}
        onPress={() => navigation.navigate(navigate)}
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
        <View>
          <Text
            style={{
              marginTop: 12,
              textAlign: "center",
              color: COLORS.white,
              fontSize: 17,
              fontFamily: "SF-Pro-Display-Bold",
            }}
          >
            {category}
          </Text>
        </View>
      </Pressable>
    );
  }
  const window = useWindowDimensions();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.primary,
        flexDirection: "column",
      }}
    >
      {TopBar("Hoşgeldiniz")}
      <View
        style={{
          marginVertical: window.height * 0.05,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {renderStudentInfo()}
      </View>

      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          {renderIcons("calendar", "Akademik Takvim", Home)}
          {renderIcons("calendar-remove", "Devamsizlik", TranscriptScreen)}
          {renderIcons("calendar-check", "Ders Programi", LogInScreen)}
        </View>

        <View
          style={{
            flexDirection: "row",
            marginVertical: window.height * 0.025,
          }}
        >
          {renderIcons("food", "Yemek Menusu")}
          {renderIcons("message-draw", "Mesajlar", Profile)}
          {renderIcons("signal-hspa-plus", "Not Bilgisi", LessonResultScreen)}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
