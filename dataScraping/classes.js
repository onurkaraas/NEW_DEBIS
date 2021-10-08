import React, { useState, useEffect } from "react";
import {
  Text,
  FlatList,
  View,
  Pressable,
  useWindowDimensions,
} from "react-native";
const cheerio = require("react-native-cheerio");
import { COLORS, FONTS } from "../constants/theme";
const superagent = require("superagent").agent();
import modalVise from "./modal";
const classes = (id, id1) => {
  const window = useWindowDimensions();

  const [x, setX] = useState(0);

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
          .unset("User-Agent")
          .send({
            ogretim_donemi_id: id,
          })
          .set("Content-Type", "application/x-www-form-urlencoded")
          .end((err, res) => {
            if (err) {
              console.log(err);
            }
            const pickSemesterData = res.text;
            const $ = cheerio.load(`${pickSemesterData}`);
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
              setVal(values);
              setDatabases(lessonsObj);
            }
          });
      }

      asd();
    } catch (e) {
      console.log("classes error");
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
                style={{
                  color: COLORS.red,
                  ...FONTS.body3,
                  marginBottom: 6,
                }}
              >
                {code}
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.body3,
                  textAlign: "center",
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
        showsVerticalScrollIndicator={false}
        data={databases}
        renderItem={renderItem}
        keyExtractor={(item) => item.value}
      />

      {modalVise(`${press}`, `${id1}`, `${x}`)}
    </View>
  );
};

export default classes;
