import React, { useState, useEffect } from "react";
import {
  Text,
  FlatList,
  View,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
const superagent = require("superagent").agent();
import cheerio from "react-native-cheerio";
import { COLORS, FONTS } from "../constants/theme";

import modalVise from "./modal";
const classes = (id, id1) => {
  const window = useWindowDimensions();

  function loade() {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }
  const [x, setX] = useState(1);

  const [databases, setDatabases] = useState([]);
  const [val, setVal] = useState([""]);
  const [press, setTimesPressed] = useState("");
  useEffect(() => {
    try {
      async function asd() {
        let pickSemester = await superagent
          .post(
            "https://debis.deu.edu.tr/OgrenciIsleri/Ogrenci/OgrenciNotu/index.php"
          )
          .send({
            ogretim_donemi_id: id,
          })
          .unset("User-Agent")
          .set("Content-Type", "application/x-www-form-urlencoded");

        const pickSemesterData = pickSemester.text;
        const $ = cheerio.load(pickSemesterData);
        const classValue = $("select[id='ders'] > option");
        let lessonsObj = [];
        const values = [];
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
          values.push(value);
        }

        setVal(values);
        setDatabases(lessonsObj);
      }
      asd();
    } catch (e) {
      console.error(e);
    }

    // console.log(databases);
  }, [id]);

  const Item = ({ title, value, code }) => (
    <Pressable
      onPress={() => {
        setTimesPressed(value);
        setX(x + 1);
      }}
    >
      <View
        style={{
          borderWidth: 0,
          backgroundColor: COLORS.secondary,
          borderRadius: 25,
          marginHorizontal: 12,
          marginBottom: 18,
          paddingVertical: 18,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Text
                style={{ color: COLORS.red, ...FONTS.body3, marginBottom: 6 }}
              >
                {code}
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.body3,
                }}
              >
                {title}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
  const renderItem = ({ item }) => (
    <Item code={item.lessonCode} title={item.title} value={item.value} />
  );

  return (
    <View style={{ marginBottom: window.height * 0.1 }}>
      <FlatList
        data={databases}
        renderItem={renderItem}
        keyExtractor={(item) => item.value}
      />

      {modalVise(`${press}`, `${id1}`, `${x}`)}
    </View>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default classes;
