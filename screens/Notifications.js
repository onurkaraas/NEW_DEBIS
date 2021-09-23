import React, { Component, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import { COLORS, FONTS } from "../constants/theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Add from "./Add";
import { Row, Rows, Table } from "react-native-table-component";

const Notifications = () => {
  const [selectedLanguage, setSelectedLanguage] = useState();
  const window = useWindowDimensions();

  class ExampleTwo extends Component {
    constructor(props) {
      super(props);
      this.state = {
        tableHead: [],
        tableData: [
          ["Ogrenci No:", "2054978652"],
          ["Sinif:", "4.Sinif"],
          ["Danisman:", "Onur KARAAS"],
        ],
      };
    }

    render() {
      const state = this.state;
      return (
        <View style={styles.containere}>
          <Table
            borderStyle={{
              borderBottomWidth: 1,
              borderColor: "#c8e1ff",
            }}
          >
            <Row
              data={state.tableHead}
              style={styles.head}
              textStyle={styles.text}
            />
            <Rows data={state.tableData} textStyle={styles.text} />
          </Table>
        </View>
      );
    }
  }
  function renderStudentInformations() {
    return (
      <View
        style={{
          borderRadius: 25,
          width: 375,
          height: window.height * 0.2,
          backgroundColor: "#FFF",
        }}
      >
        <ExampleTwo />
      </View>
    );
  }
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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.primary,
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          marginBottom: 40,
          paddingTop: 20,
        }}
      >
        {renderStudentInformations()}
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 25,
            height: 45,
            width: 375,
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

      <View
        style={{
          flex: 3,
          alignItems: "center",
          paddingBottom: window.height * 0.1,
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            backgroundColor: COLORS.primary,
          }}
        >
          <Add />
          <Add />
          <Add />
          <Add />
        </ScrollView>
      </View>
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
