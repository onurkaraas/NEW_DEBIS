import React, { Component, useRef, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import Accordion from "react-native-collapsible/Accordion";
import { renderTopBar } from "./Home";
import { COLORS, FONTS } from "../constants/theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { List } from "react-native-paper";
import ListAccordion from "react-native-paper/src/components/List/ListAccordion";
import Add from "./Add";

const Notifications = () => {
  const [selectedLanguage, setSelectedLanguage] = useState();

  function renderClasses() {
    return (
      <View
        style={{
          justifyContent: "center",
          marginVertical: 10,
          height: 90,
          width: 375,
          backgroundColor: COLORS.secondary,
          borderRadius: 25,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",

            alignItems: "center",
            marginHorizontal: 18,
          }}
        >
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Text style={{ ...FONTS.h2, color: COLORS.red }}>FF</Text>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ ...FONTS.h3, color: COLORS.white }}>
              Istatistik II
            </Text>
            <View
              style={{
                height: 7,
                width: 225,
                backgroundColor: "#2A3C44",
                marginVertical: 10,
              }}
            />
            <MaterialCommunityIcons
              style={{ marginRight: 10 }}
              name="arrow-down"
              color={"#fff"}
              size={20}
            />
          </View>

          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <MaterialCommunityIcons
              name="heart-outline"
              color={"#FF575F"}
              size={30}
            />
          </View>
        </View>
      </View>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <View style={{ flex: 1 }}>
        {renderTopBar()}
        <View
          style={{ flex: 0.3, alignItems: "center", justifyContent: "center" }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 25,
              height: 35,
              width: 350,
              justifyContent: "center",
            }}
          >
            <Picker
              selectedValue={selectedLanguage}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedLanguage(itemValue)
              }
            >
              <Picker.Item label="2021-2022 Guz Donemi" value="java" />
              <Picker.Item label="2021-2022 Bahar Donemi" value="js" />
            </Picker>
          </View>
        </View>
        <View style={{ flex: 3, alignItems: "center" }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: COLORS.primary }}
          >
            <Add />
            <Add />
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Notifications;
