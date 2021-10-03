import createDataContext from "./createDataContext";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
    case "signinpos":
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
        .unset("User-Agent")
        .set("Content-Type", "application/x-www-form-urlencoded");
      await AsyncStorage.setItem("token", `${username && password}`);
      const resultScreenData = dashboard.text;
      const $ = cheerio.load(resultScreenData);
      const studentName = $("body > div > div").text().slice(11);
      dispatch({ type: "signin", payload: `${username && password}` });
    } catch (e) {
      dispatch({ type: "add_error", payload: "signing err" });
    }
  };

const signInPos = (dispatch) => async () => {
  try {
    const dashboard = await superagent
      .post("https://pos.deu.edu.tr/index.php")
      .send({
        kullanici_posta: "onur.karaas",
        kullanici_parola: "080103003On",
        kullanici_tipi: "O",
      })
      .set("Content-Type", "application/x-www-form-urlencoded");

    const resultScreenData = dashboard.text;
    const $ = cheerio.load(resultScreenData);
    const studentName = $("body > div > div").text().slice(11);
    console.log(resultScreenData);
  } catch (e) {
    dispatch({ type: "add_error", payload: "signing err" });
  }
};

const signOut = (dispatch) => {
  return async () => {
    try {
      const out = await superagent
        .get("https://debis.deu.edu.tr/php_library/Cikis.php")
        .unset("User-Agent");
    } catch (e) {
      dispatch({ type: "add_error", payload: "signout err" });
    }
  };
};
export const { Provider, Context } = createDataContext(
  authReducer,
  { signIn, signOut, signInPos },
  { token: null, errorMessage: "xzc" }
);
