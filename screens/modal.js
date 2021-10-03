import React, { useEffect, useState } from "react";
import cheerio from "react-native-cheerio";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { Col, Row, Table, TableWrapper } from "react-native-table-component";
import { COLORS, FONTS } from "../constants/theme";
import Modal from "react-native-modal";

const superagent = require("superagent").agent();

const modalVise = (presse, id1) => {
  const [press, setTimesPressed] = useState("");
  const [res, setRes] = useState([""]);
  const [modalVisible, setModalVisible] = useState(false);
  const [lessone, setLesson] = useState([""]);
  const [tableTitle, setTableTitle] = useState([""]);
  const [tableData2, setTableData2] = useState([""]);
  const [tableData3, setTableData3] = useState([""]);
  const tableHead = ["Sinav", "Sinif Ort.", "ORT2*", "Notunuz"];
  const [tableData4, setTableData4] = useState([""]);
  const window = useWindowDimensions();

  useEffect(() => {
    try {
      async function cvb() {
        let pickLesson = await superagent
          .post(
            "https://debis.deu.edu.tr/OgrenciIsleri/Ogrenci/OgrenciNotu/index.php"
          )
          .send({
            ders: presse,
            ogretim_donemi_id: id1,
          })
          .unset("User-Agent")
          .set("Content-Type", "application/x-www-form-urlencoded");
        const pickLessonData = await pickLesson.text;
        const $$$ = await cheerio.load(pickLessonData);
        const result = await $$$(
          "body > table:nth-child(4) > tbody > tr:nth-child(2) > td:nth-child(2) > table:nth-child(3) > tbody > tr:nth-child(3) > td > table:nth-child(1) > tbody > tr:nth-child(4) > td > b"
        );
        const lessons = await $$$(
          "body > table:nth-child(4) > tbody > tr:nth-child(2) > td:nth-child(2) > table:nth-child(3) > tbody > tr:nth-child(3) > td > table:nth-child(1) > tbody > tr:nth-child(3) > td:nth-child(2) > table > tbody > tr"
        );
        const lessonName = await $$$(
          "body > table:nth-child(4) > tbody > tr:nth-child(2) > td:nth-child(2) > table:nth-child(3) > tbody > tr:nth-child(3) > td > table:nth-child(1) > tbody > tr:nth-child(1)"
        );
        const reso = [];
        const examNames = [];
        const lessonsNames = [];
        const classAverages = [];
        const finalAverages = [];
        const studentResults = [];
        const datas = [];
        await setRes(result.text());
        const scrapeLessons = await $$$(lessons).each((index, element) => {
          if (index === 0) return true;
          const tds = $$$(element).find("td");
          const examName = $$$(tds[0]).text().slice(0, 14);
          const listingDate = $$$(tds[1]).text();
          const classAverage = $$$(tds[2]).text();
          const finalAverage = $$$(tds[3]).text();
          const studentResult = $$$(tds[4]).text();
          examNames.push(examName);
          classAverages.push(classAverage);
          finalAverages.push(finalAverage);
          studentResults.push(studentResult);
          datas.push({ examName, classAverage, finalAverage, studentResult });
          setTableTitle(examNames);
          setTableData2(finalAverages);
          setTableData3(classAverages);
          setTableData4(studentResults);
        });
        const scrapeLessonNamee = await $$$(lessonName).each(
          (index, element) => {
            const tds = $$$(element).find("td");
            const lessonNameee = $$$(tds[0]).text();
            lessonsNames.push(lessonNameee);
            setLesson(lessonsNames);
          }
        );
        const scrapeLessonNameee = await $$$(result).each((index, element) => {
          const tds = $$$(element);
          const ress = $$$(tds[0]).text();
          reso.push(ress);
          setRes(reso);
        });

        await setModalVisible(true);
      }
      cvb();
    } catch (e) {
      console.error(e);
    }
  }, [presse]);

  return (
    <Modal
      backdropOpacity={0.4}
      transparent={true}
      onBackdropPress={() => setModalVisible(!modalVisible)}
      isVisible={modalVisible}
      style={{ textAlign: "center", alignItems: "center" }}
    >
      <View style={styles.centeredView}>
        <View
          style={[
            styles.modalView,
            res[0] === "BAŞARISIZ"
              ? { ...styles.modalRed }
              : res[0] === "BAŞARILI"
              ? { ...styles.modalGreen }
              : { ...styles.modalView },
          ]}
        >
          <View style={styles.container2}>
            <View
              style={{
                width: window.width * 0.9,
                height: window.height * 0.55,
                justifyContent: "center",
              }}
            >
              <Table
                borderStyle={{
                  borderBottomWidth: 1,
                  borderColor: "#c8e1ff",
                }}
              >
                <Row
                  data={lessone}
                  style={styles.head}
                  textStyle={[
                    styles.text2,
                    res[0] === "BAŞARISIZ"
                      ? { ...styles.textRed }
                      : res[0] === "BAŞARILI"
                      ? { ...styles.textGreen }
                      : { ...styles.text2 },
                  ]}
                />
                <Row
                  data={tableHead}
                  style={styles.head}
                  textStyle={styles.text}
                />
                <TableWrapper style={styles.wrapper}>
                  <Col
                    data={tableTitle}
                    style={{
                      width: window.width * 0.2,
                      height: window.height * 0.35,
                    }}
                    textStyle={styles.text}
                  />
                  <Col
                    data={tableData2}
                    style={{
                      width: window.width * 0.2,
                      height: window.height * 0.35,
                    }}
                    textStyle={styles.text}
                  />
                  <Col
                    data={tableData3}
                    style={{
                      width: window.width * 0.2,
                      height: window.height * 0.35,
                    }}
                    textStyle={styles.text}
                  />
                  <Col
                    data={tableData4}
                    style={{
                      width: window.width * 0.2,
                      height: window.height * 0.35,
                    }}
                    textStyle={styles.text1}
                  />
                </TableWrapper>
              </Table>
            </View>
          </View>
        </View>
      </View>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          style={[
            {
              width: window.width * 0.5,
              backgroundColor: "#fff",
            },
            styles.openButton,

            res[0] === "BAŞARISIZ"
              ? { ...styles.buttonRed }
              : res[0] === "BAŞARILI"
              ? { ...styles.buttonGreen }
              : { ...styles.openButton },
          ]}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <Text
            style={[
              styles.textStyle,
              res[0] === "BAŞARISIZ"
                ? { ...styles.textRed }
                : res[0] === "BAŞARILI"
                ? { ...styles.textGreen }
                : { ...styles.textStyle },
            ]}
          >
            {res[0]}
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "center",
    justifyContent: "center",
  },

  container2: {
    backgroundColor: "#2A3C44",
    textAlign: "center",
    borderRadius: 25,
    flexDirection: "column",
  },
  head: {
    borderBottomWidth: 2,
    borderColor: "white",

    padding: 12,
    borderRadius: 25,
  },

  wrapper: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 6,
    height: 260,
  },

  text: {
    color: "white",
    ...FONTS.body4,
    marginHorizontal: 4,
    marginVertical: 6,
    textAlign: "center",
  },
  text1: {
    color: "white",
    ...FONTS.body4,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  text2: {
    color: "white",
    ...FONTS.h2,
    fontSize: 20,
    marginHorizontal: 4,
    textAlign: "center",
  },
  modalView: {
    backgroundColor: COLORS.gray,
    borderRadius: 25,
    padding: 8,
    alignItems: "center",
    shadowColor: COLORS.secondary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalGreen: {
    backgroundColor: COLORS.green,
  },
  modalRed: {
    backgroundColor: COLORS.red,
  },
  openButton: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 8,
    marginTop: 10,
    elevation: 2,
    borderColor: COLORS.gray,
    borderWidth: 3,
  },
  buttonGreen: {
    borderColor: COLORS.green,
  },
  buttonRed: {
    borderColor: COLORS.red,
  },
  textStyle: {
    ...FONTS.body3,
    color: COLORS.gray,
    fontWeight: "bold",
    textAlign: "center",
  },
  textGreen: {
    color: COLORS.green,
  },
  textRed: {
    color: COLORS.red,
  },
});
export default modalVise;
