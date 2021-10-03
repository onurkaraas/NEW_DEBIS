import React, { useEffect } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS } from "../constants/theme";
import semesterList from "./semesterList";
import { useState } from "react";
import cheerio from "react-native-cheerio";
import { Text, View } from "react-native";
const superagent = require("superagent").agent();
import { Picker } from "@react-native-picker/picker";
import classes from "./classes";

const Notifications = () => {
  const window = useWindowDimensions();

  const [selectedLanguage, setSelectedLanguage] = useState();
  const [semesterValue, setSemesterValue] = useState([]);
  useEffect(() => {
    try {
      async function qwe() {
        let resultScreen = await superagent
          .get(
            "https://debis.deu.edu.tr/OgrenciIsleri/Ogrenci/OgrenciNotu/index.php"
          )
          .unset("User-Agent")

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
          semesterValues.push([values, title]);
          setSemesterValue(semesterValues);
        }
      }
      qwe();
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <View style={{ backgroundColor: COLORS.primary, flex: 1, ...FONTS.h2 }}>
      <View style={{ alignItems: "center", padding: 22 }}>
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 25,
            height: 45,
            width: window.width * 0.9,
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Picker
            itemStyle={{
              textAlign: "center",
              alignItems: "center",
            }}
            style={{
              ...FONTS.h2,
            }}
            selectedValue={selectedLanguage}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedLanguage(itemValue)
            }
          >
            <Picker.Item
              style={{
                ...FONTS.h2,
              }}
              label={"Lütfen Dönem Seçiniz "}
              value={0}
            />
            {semesterValue.map((item, index) => {
              return (
                <Picker.Item
                  style={{
                    ...FONTS.h2,
                  }}
                  label={item[1]}
                  value={item[0]}
                  key={index}
                />
              );
            })}
          </Picker>
        </View>
      </View>
      <View style={{ flex: 6 }}>
        {classes(`${selectedLanguage}`, `${selectedLanguage}`)}
      </View>
    </View>
  );
};

export default Notifications;
