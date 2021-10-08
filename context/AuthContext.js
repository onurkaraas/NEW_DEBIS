import createDataContext from "./createDataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
const cheerio = require("react-native-cheerio");
const request = require("superagent");
const superagent = request.agent();
//
const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return {
        ...state,
        errorMessage: action.payload,
      };
    case "signin":
      return { ...state, token: action.payload };
    case "signout":
      return { ...state, token: action.payload };
    default:
      return state;
  }
};

const signIn =
  (dispatch, callback) =>
  async ({ username, password }) => {
    try {
      let get = await superagent
        .get("https://debis.deu.edu.tr/debis.php")
        .unset("User-Agent");
      const dashboard = await superagent
        .post("https://debis.deu.edu.tr/debis.php")
        .unset("User-Agent")
        .send({
          username: `${username}`,
          password: `${password}`,
          emailHost: "ogr.deu.edu.tr",
          tamam: "Gonder",
        })
        .set("Content-Type", "application/x-www-form-urlencoded")
        .end((err, res) => {
          if (err) {
            console.log(err);
          }
          const resultScreenData = res.text;
          const $ = cheerio.load(resultScreenData);
          const studentName = $("body > div > div").text().slice(11);
          console.log(studentName);
        });

      await AsyncStorage.setItem("token", `qwe`);

      dispatch({
        type: "signin",
        payload: `qwe`,
      });
    } catch (e) {
      console.log("giris hata");
      dispatch({
        type: "add_error",
        payload: "signing err",
      });
    }
  };

const signOut = (dispatch, callback) => {
  return async () => {
    try {
      const out = await superagent
        .get("https://debis.deu.edu.tr/php_library/Cikis.php")
        .unset("User-Agent");
    } catch (e) {
      console.log("giris hata");

      dispatch({
        type: "add_error",
        payload: "signout err",
      });
    }
  };
};
export const { Provider, Context } = createDataContext(
  authReducer,
  { signIn, signOut },
  { token: null, errorMessage: "xzc" }
);
