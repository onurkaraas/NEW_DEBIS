import createDataContext from "./createDataContext";
const cheerio = require("react-native-cheerio");
const superagent = require("superagent").agent();
const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

const signIn = (dispatch) => {
  return async ({ username, password }) => {
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
      console.log(studentName);
      console.log(username, password);
    } catch (e) {
      dispatch({ type: "add_error", payload: "signing err" });
    }
  };
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
  { isSignedIn: false, errorMessage: "" }
);
