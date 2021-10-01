import React, { Component, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Col, Row, Table, TableWrapper } from "react-native-table-component";
import { FONTS } from "../constants/theme";
import { Picker } from "@react-native-picker/picker";
import classes from "./classes";
const cheerio = require("react-native-cheerio");
const superagent = require("superagent").agent();

export class semesterListClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
      title: [],
    };
  }

  async componentDidMount() {
    const [data, setData] = useState([]);
    const [semesterValue, setSemesterValue] = useState([]);
    let resultScreen = await superagent
      .post(
        "https://debis.deu.edu.tr/OgrenciIsleri/Ogrenci/OgrenciNotu/index.php"
      )
      .set("Content-Type", "application/x-www-form-urlencoded");
    const resultScreenData = resultScreen.text;
    const $ = cheerio.load(resultScreenData);
    const semesterSelect = $("select[id='ogretim_donemi_id'] > option");
    let semestersObj = [];
    let semesterValues = [];
    for (let i = 1; i < semesterSelect.length; i++) {
      let item = semesterSelect.eq(i);
      let title = item.text();
      let values = item.attr("value");
      semestersObj.push(title);

      setData(semestersObj);
      semesterValues.push(values);
      setSemesterValue(semesterValues);
      this.setState({ title: semestersObj });
      this.setState({ tableData1: semesterValues });
    }
  }

  render() {
    const [selectedLanguage, setSelectedLanguage] = useState();

    const state = this.state;
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, alignItems: "center" }}>
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
                setSelectedLanguage(itemIndex)
              }
            >
              {this.state.title.map((item, index) => {
                return (
                  <Picker.Item
                    label={item}
                    value={this.state.value}
                    key={index}
                  />
                );
              })}
            </Picker>
          </View>
        </View>
        <View style={{ flex: 6 }}>{classes("274")}</View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "center",
    justifyContent: "center",
  },

  container2: {
    flex: 1,
    backgroundColor: "#2A3C44",
    textAlign: "center",
  },
  head: {
    borderBottomWidth: 2,
    borderColor: "white",
    marginLeft: 8,
    padding: 16,
    borderRadius: 25,
  },
  wrapper: { flexDirection: "row" },
  title: {
    flex: 2,
    backgroundColor: "#2A3C44",
    borderRadius: 25,
  },

  title3: {
    flex: 1,
    backgroundColor: "#2A3C44",
    borderRadius: 25,
  },
  title4: {
    flex: 2,
    backgroundColor: "#2A3C44",
    borderRadius: 25,
  },

  row: { height: 45 },
  text: {
    color: "white",

    ...FONTS.body4,
    marginHorizontal: 4,
    textAlign: "center",
    borderRadius: 25,
  },
});
