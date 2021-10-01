import React, { useState, useEffect } from "react";
import { Text, FlatList, View, StyleSheet } from "react-native";
const superagent = require("superagent").agent();
import cheerio from "react-native-cheerio";
import CollapsibleView from "@eliav2/react-native-collapsible-view";

import { COLORS, FONTS } from "../constants/theme";
import Add from "./Add";
import { Col, Row, Table, TableWrapper } from "react-native-table-component";

const classes = (id) => {
  const [databases, setDatabases] = useState([]);
  const tableHead = ["Sinav", "Sinif Ort.", "ORT2*", "Notunuz"];
  const [val, setVal] = useState("");
  const [tableTitle, setTableTitle] = useState([""]);
  const [tableData2, setTableData2] = useState([""]);
  const [tableData3, setTableData3] = useState([""]);
  const [tableData4, setTableData4] = useState([""]);

  useEffect(() => {
    async function asd() {
      let pickSemester = await superagent
        .post(
          "https://debis.deu.edu.tr/OgrenciIsleri/Ogrenci/OgrenciNotu/index.php"
        )
        .send({
          ogretim_donemi_id: id,
        })
        .set("Content-Type", "application/x-www-form-urlencoded");

      const pickSemesterData = pickSemester.text;
      const $ = cheerio.load(pickSemesterData);
      const classValue = $("select[id='ders'] > option");
      let lessonsObj = [];
      for (let i = 1; i < classValue.length; i++) {
        let item = classValue.eq(i);
        let lessonCode = item.text().slice(0, 8).trim();
        let title = item.text().slice(8).trim();
        let value = item.attr("value");

        lessonsObj.push({
          value,
          lessonCode,
          title,
        });
      }
      setDatabases(lessonsObj);
    }
    console.log(Object.entries(databases).map((x) => x[1].value));

    asd();
  }, [id]);

  useEffect(() => {
    async function dfg() {
      let pickLesson = await superagent
        .post(
          "https://debis.deu.edu.tr/OgrenciIsleri/Ogrenci/OgrenciNotu/index.php"
        )
        .send({
          ders: val,
          ogretim_donemi_id: 255,
        })
        .set("Content-Type", "application/x-www-form-urlencoded");

      const pickLessonData = pickLesson.text;

      const $$$ = cheerio.load(pickLessonData);

      const lessons = $$$(
        "body > table:nth-child(4) > tbody > tr:nth-child(2) > td:nth-child(2) > table:nth-child(3) > tbody > tr:nth-child(3) > td > table:nth-child(1) > tbody > tr:nth-child(3) > td:nth-child(2) > table > tbody > tr"
      );
      const examNames = [];
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
        classAverages.push(classAverage);
        finalAverages.push(finalAverage);
        studentResults.push(studentResult);
      });
      setTableTitle(examNames);
      setTableData4(studentResults);
      setTableData2(classAverages);
      setTableData3(finalAverages);
      setTableData4(studentResults);
    }
    dfg();
  }, []);

  const Item = ({ title }) => (
    <CollapsibleView
      title={
        <Text
          style={{
            color: COLORS.white,
            ...FONTS.h3,
            paddingVertical: 20,
          }}
        >
          {title.slice(0, 20)}
        </Text>
      }
      style={{
        borderWidth: 0,
        backgroundColor: COLORS.secondary,
        borderRadius: 25,
      }}
      arrowStyling={{
        size: 35,
        thickness: 6,
        color: "white",
      }}
    >
      <View style={styles.container2}>
        <Table
          borderStyle={{
            borderRadius: 25,
            borderBottomWidth: 1,
            borderColor: "#c8e1ff",
          }}
        >
          <Row data={tableHead} style={styles.head} textStyle={styles.text} />
          <TableWrapper style={styles.wrapper}>
            <Col
              data={tableTitle}
              style={styles.title}
              textStyle={styles.text}
            />
            <Col data={tableData2} style={styles.row} textStyle={styles.text} />
            <Col
              data={tableData3}
              style={styles.title3}
              textStyle={styles.text}
            />
            <Col data={tableData4} style={styles.row} textStyle={styles.text} />
          </TableWrapper>
        </Table>
      </View>
    </CollapsibleView>
  );
  const renderItem = ({ item }) => <Item title={item.title} />;

  return (
    <FlatList
      data={databases}
      renderItem={renderItem}
      keyExtractor={(item) => item.value}
    />
  );
};

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

  row: { height: 200 },
  text: {
    color: "white",

    ...FONTS.body4,
    marginHorizontal: 4,
    textAlign: "center",
    borderRadius: 25,
  },
});

export default classes;
