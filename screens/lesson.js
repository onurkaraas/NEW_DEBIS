import React, { Component, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Col, Row, Table, TableWrapper } from "react-native-table-component";
import { FONTS } from "../constants/theme";
import { Context as AuthContext } from "./AuthContext";
const cheerio = require("react-native-cheerio");
const superagent = require("superagent").agent();

export class ExampleThree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ["Sinav", "Sinif Ort.", "ORT2*", "Notunuz"],
      tableTitle: [],
      tableData2: [],
      tableData3: [],
      tableData4: [],
    };
  }
  async componentDidMount() {
    let pickLesson = await superagent
      .post(
        "https://debis.deu.edu.tr/OgrenciIsleri/Ogrenci/OgrenciNotu/index.php"
      )
      .send({
        ders: val,
        ogretim_donemi_id: "273",
      })
      .set("Content-Type", "application/x-www-form-urlencoded");

    const pickLessonData = pickLesson.text;

    const $$$ = cheerio.load(pickLessonData);

    const lessons = $$$(
      "body > table:nth-child(4) > tbody > tr:nth-child(2) > td:nth-child(2) > table:nth-child(3) > tbody > tr:nth-child(3) > td > table:nth-child(1) > tbody > tr:nth-child(3) > td:nth-child(2) > table > tbody > tr"
    );

    const examNames = [];
    const listingDates = [];
    const classAverages = [];
    const finalAverages = [];
    const studentResults = [];
    const scrapeLessons = $$$(lessons).each((index, element) => {
      if (index === 0) return true;
      const tds = $$$(element).find("td");
      const examName = $$$(tds[0]).text().slice(0, 15);
      const listingDate = $$$(tds[1]).text();
      const classAverage = $$$(tds[2]).text();
      const finalAverage = $$$(tds[3]).text();
      const studentResult = $$$(tds[4]).text();
      examNames.push(examName);
      listingDates.push(listingDate);
      classAverages.push(classAverage);
      finalAverages.push(finalAverage);
      studentResults.push(studentResult);
    });

    this.setState({ tableTitle: examNames });
    this.setState({ tableData1: listingDates });
    this.setState({ tableData2: classAverages });
    this.setState({ tableData3: finalAverages });
    this.setState({ tableData4: studentResults });
  }

  render() {
    const state = this.state;
    return (
      <View style={styles.container2}>
        <Table
          borderStyle={{
            borderRadius: 25,
            borderBottomWidth: 1,
            borderColor: "#c8e1ff",
          }}
        >
          <Row
            data={state.tableHead}
            style={styles.head}
            textStyle={styles.text}
          />
          <TableWrapper style={styles.wrapper}>
            <Col
              data={state.tableTitle}
              style={styles.title}
              textStyle={styles.text}
            />

            <Col
              data={state.tableData2}
              style={styles.title}
              textStyle={styles.text}
            />
            <Col
              data={state.tableData3}
              style={styles.title3}
              textStyle={styles.text}
            />
            <Col
              data={state.tableData4}
              style={styles.title}
              textStyle={styles.text}
            />
          </TableWrapper>
        </Table>
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
