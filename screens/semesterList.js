import React, { useEffect, useState } from "react";
import cheerio from "react-native-cheerio";
import { Text, View } from "react-native";
const superagent = require("superagent").agent();
import { Picker } from "@react-native-picker/picker";
import classes from "./classes";

const semesterList = () => {
  const [data, setData] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [semesterValue, setSemesterValue] = useState([]);
  useEffect(() => {
    async function qwe() {
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

        semesterValues.push([values, title]);
        setSemesterValue(semesterValues);
      }
    }
    qwe();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text>{selectedLanguage}</Text>
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
            {semesterValue.map((item, index) => {
              return (
                <Picker.Item label={item[1]} value={item[0]} key={index} />
              );
            })}
          </Picker>
        </View>
      </View>
      <View style={{ flex: 6 }}>
        {classes(`${selectedLanguage}`, "X_FF _2_9752_44_1_")}
      </View>
    </View>
  );
};
export default semesterList;
