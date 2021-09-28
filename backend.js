const cheerio = require("react-native-cheerio");
const superagent = require("superagent").agent();
import AsyncStorage from "@react-native-async-storage/async-storage";

export const deb = async () => {
  let dashboard = await superagent
    .post("https://debis.deu.edu.tr/debis.php")
    .send({
      username: "onur.karaas",
      password: "080103003On",
      emailHost: "ogr.deu.edu.tr",
      tamam: "Gönder",
    })
    .set("Content-Type", "application/x-www-form-urlencoded");
  let resultScreen = await superagent
    .post(
      "https://debis.deu.edu.tr/OgrenciIsleri/Ogrenci/OgrenciNotu/index.php"
    )
    .set("Content-Type", "application/x-www-form-urlencoded");

  const resultScreenData = resultScreen.text;
  const $ = cheerio.load(resultScreenData);
  const semesterSelect = $("select[id='ogretim_donemi_id'] > option");
  console.log(semesterSelect);

  let semestersObj = [];
  for (let i = 1; i < semesterSelect.length; i++) {
    let item = semesterSelect.eq(i);
    let title = item.text();
    let value = item.attr("value");
    semestersObj.push({
      value,
      title,
    });
  }

  console.log(semestersObj);

  let pickSemester = await superagent
    .post(
      "https://debis.deu.edu.tr/OgrenciIsleri/Ogrenci/OgrenciNotu/index.php"
    )
    .send({
      ogretim_donemi_id: "273",
    })
    .set("Content-Type", "application/x-www-form-urlencoded");

  const pickSemesterData = pickSemester.text;
  // console.log(res);
  const $$ = cheerio.load(pickSemesterData);
  const classValue = $$("select[id='ders'] > option");

  let lessonsObj = [];
  for (let i = 1; i < classValue.length; i++) {
    let item = classValue.eq(i);
    let lessonCode = item.text().slice(0, 8).trim();
    let lessonTitle = item.text().slice(8).trim();
    let value = item.attr("value");

    lessonsObj.push({
      value,
      lessonCode,
      lessonTitle,
    });
  }
  console.log(lessonsObj);

  let pickLesson = await superagent
    .post(
      "https://debis.deu.edu.tr/OgrenciIsleri/Ogrenci/OgrenciNotu/index.php"
    )
    .send({
      ders: "X_FD _4_1176_4135_3_",
      ogretim_donemi_id: "273",
    })
    .set("Content-Type", "application/x-www-form-urlencoded");

  const pickLessonData = pickLesson.text;

  const $$$ = cheerio.load(pickLessonData);

  const lessons = $$$(
    "body > table:nth-child(4) > tbody > tr:nth-child(2) > td:nth-child(2) > table:nth-child(3) > tbody > tr:nth-child(3) > td > table:nth-child(1) > tbody > tr:nth-child(3) > td:nth-child(2) > table > tbody > tr"
  );

  const examResultsObj = [];
  const scrapeLessons = await $$$(lessons).each((index, element) => {
    if (index === 0) return true;
    const tds = $$$(element).find("td");
    const examName = $$$(tds[0]).text();
    const listingDate = $$$(tds[1]).text();
    const classAverage = $$$(tds[2]).text();
    const finalAverage = $$$(tds[3]).text();
    const studentResult = $$$(tds[4]).text();

    const tableRow = {
      examName,
      listingDate,
      classAverage,
      finalAverage,
      studentResult,
    };
    examResultsObj.push(tableRow);
  });

  console.log(examResultsObj);
};

export const storeData = async (value) => {
  try {
    await AsyncStorage.setItem("@storage_Key", value);
  } catch (e) {
    // saving error
  }
};
