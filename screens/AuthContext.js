import createDataContext from "./createDataContext";
import { useState } from "react";
const cheerio = require("react-native-cheerio");
const superagent = require("superagent").agent();
const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signin":
      return { ...state, token: action.payload };
    case "classe":
      return { ...state, token: action.payload };
    default:
      return state;
  }
};

const signIn =
  (dispatch) =>
  async ({ username, password }, callback) => {
    try {
      const dashboard = await superagent
        .post("https://debis.deu.edu.tr/debis.php")
        .send({
          username: `${username}`,
          password: `${password}`,
          emailHost: "ogr.deu.edu.tr",
          tamam: "Gonder",
        })
        .set("Content-Type", "application/x-www-form-urlencoded");
      const resultScreenData = dashboard.text;
      const $ = cheerio.load(resultScreenData);
      const studentName = $("body > div > div").text().slice(11);
      dispatch({ type: "signin", payload: studentName });
      console.log(studentName);
    } catch (e) {
      dispatch({ type: "add_error", payload: "signing err" });
    }
  };

const signOut = (dispatch) => {
  return async () => {
    try {
      const out = await superagent.get(
        "https://debis.deu.edu.tr/php_library/Cikis.php"
      );
    } catch (e) {
      dispatch({ type: "add_error", payload: "signout err" });
    }
  };
};
export const { Provider, Context } = createDataContext(
  authReducer,
  { signIn, signOut },
  { token: null, errorMessage: "" }
);
