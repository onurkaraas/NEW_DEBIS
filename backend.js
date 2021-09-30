const cheerio = require("react-native-cheerio");
const superagent = require("superagent").agent();

export const qwe = async (username, password) => {
  let dashboard = await superagent
    .post("https://debis.deu.edu.tr/")
    .send({
      username: username,
      password: password,
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
  let semestersObj = [];
  for (let i = 1; i < semesterSelect.length; i++) {
    let item = await semesterSelect.eq(i);
    let title = await item.text();
    let value = await item.attr("value");
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

  const pickSemesterData = await pickSemester.text;
  const $$ = await cheerio.load(pickSemesterData);
  const classValue = await $$("select[id='ders'] > option");

  let lessonsObj = [];
  for (let i = 1; i < classValue.length; i++) {
    let item = await classValue.eq(i);
    let lessonCode = await item.text().slice(0, 8).trim();
    let lessonTitle = await item.text().slice(8).trim();
    let value = await item.attr("value");

    lessonsObj.push({
      value,
      lessonCode,
      lessonTitle,
    });
  }
  console.log(lessonsObj);
};
