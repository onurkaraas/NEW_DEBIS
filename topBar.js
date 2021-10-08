import React, { useState, useEffect } from "react";
import { View, Text, useWindowDimensions } from "react-native";
import { COLORS, FONTS } from "./constants/theme";
const cheerio = require("react-native-cheerio");
const superagent = require("superagent").agent();

const TopBar = (headerTitle) => {
  const { height, scale, width } = useWindowDimensions();
  const [name, setName] = useState();
  const [x, setX] = useState();
  useEffect(() => {
    try {
      async function qwe() {
        let getStudentName = await superagent
          .get("https://debis.deu.edu.tr/debis.php")
          .unset("User-Agent");

        const studentNameData = getStudentName.text;
        const $ = cheerio.load(studentNameData);
        const studentName = $("body > div > div").text().slice(11);
        setName(studentName);
      }

      qwe();
    } catch (e) {
      console.log(e);
    }
    try {
      async function dg() {
        let getXName = await superagent
          .get(
            "https://debis.deu.edu.tr/OgrenciIsleri/Ogrenci/OgrenciNotu/index.php"
          )
          .unset("User-Agent");

        const studentXData = getXName.text;
        const $$ = cheerio.load(studentXData);
        const xName = $$(
          "body > table:nth-child(4) > tbody > tr:nth-child(2) > td:nth-child(2) > form > table > tbody > tr:nth-child(5) > td:nth-child(3)"
        ).text();
        setX(xName);
      }
      dg();
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <View
      style={{
        width: width,
        height: height * 0.1,
        backgroundColor: COLORS.secondary,
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
        flexDirection: "row",
        paddingHorizontal: 8,
      }}
    >
      <View style={{ flex: 1, justifyContent: "center" }} r>
        <Text style={{ ...FONTS.h2, color: COLORS.white }}>{headerTitle}</Text>
      </View>

      <View style={{ alignItems: "flex-end", justifyContent: "center" }}>
        <Text
          style={{
            ...FONTS.body3,
            color: COLORS.white,
            marginBottom: 8,
          }}
        >
          {name}
        </Text>

        <Text
          style={{
            ...FONTS.body3,
            color: COLORS.white,
          }}
        >
          {x}
        </Text>
      </View>
    </View>
  );
};
export default TopBar;