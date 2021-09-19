import React, { Component } from "react";
import { Table, Row, Rows } from "react-native-table-component";
import { StyleSheet, Text, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { SafeAreaView } from "react-native-safe-area-context";
import Accordion from "react-native-collapsible/Accordion";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS, FONTS } from "../constants/theme";

const Add = () => {
  const SECTIONS = [
    {
      title: "",
      content:
        "LoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLorem",
    },
    {
      title: "Second",
      content: "Lorem ipsum...",
    },
  ];
  class ExampleOne extends Component {
    constructor(props) {
      super(props);
      this.state = {
        tableHead: [
          "Sinav Turu",
          "Ilan Tarihi",
          "Sinif Ort.",
          "ORT2*",
          "Notunuz",
        ],
        tableData: [
          ["Arasinav", "15/20/21", "23", "", "34"],
          ["Y.yilici Notu", "15/20/21", "54", "", "23"],
          ["Y.yilsonu Sinavi", "15/20/21", "23", "", "43"],
          ["Basari Notu", "15/20/21", "", "34", "FF"],
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
  class AccordionView extends Component {
    state = {
      activeSections: [],
    };

    _renderSectionTitle = (section) => {
      return (
        <View>
          <Text> </Text>
        </View>
      );
    };

    _renderHeader = (section, index, isActive, sections) => {
      return (
        <Animatable.View duration={300} style={{ backgroundColor: "fff" }}>
          {
            <View
              style={{
                justifyContent: "center",
                height: 90,
                width: 375,
                backgroundColor: COLORS.secondary,
                borderRadius: 25,
                borderBottomRightRadius: isActive ? 0 : 25,
                borderBottomLeftRadius: isActive ? 0 : 25,
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
          }
        </Animatable.View>
      );
    };

    _renderContent = (section, i, isActive, sections) => {
      return (
        <Animatable.View duration={300}>
          {
            <View
              style={{
                justifyContent: "center",
                borderWidth: 2,
                borderColor: COLORS.secondary,
                borderRadius: 25,
                backgroundColor: COLORS.primary,
                borderBottomLeftRadius: 25,
                borderBottomRightRadius: 25,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <ExampleOne />
              </View>
            </View>
          }
        </Animatable.View>
      );
    };

    _updateSections = (activeSections) => {
      this.setState({ activeSections });
    };

    render() {
      return (
        <Accordion
          sections={SECTIONS}
          activeSections={this.state.activeSections}
          renderSectionTitle={this._renderSectionTitle}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
          onChange={this._updateSections}
        />
      );
    }
  }
  return <AccordionView />;
};
const styles = StyleSheet.create({
  containere: {
    flex: 1,
    paddingBottom: 5,

    backgroundColor: COLORS.primary,
  },
  head: {
    borderBottomWidth: 1,
    borderColor: "white",
    padding: 6,
    borderRadius: 25,
  },
  text: {
    color: "white",
    ...FONTS.body4,
    paddingHorizontal: 4,
    textAlign: "center",
  },
});

export default Add;
