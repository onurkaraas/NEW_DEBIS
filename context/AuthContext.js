import React, {
  createContext,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';
import SplashScreen from 'react-native-splash-screen';

const cheerio = require('react-native-cheerio');
const request = require('superagent');
const superagent = request.agent();

export const AuthContext = createContext();
export const AuthProvider = ({children}) => {
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState('');
  const [saveUser, setSaveUser] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [semesterValue, setSemesterValue] = useState([]);

  const gett = () => {
    try {
      (async function qwe() {
        let resultScreen = await superagent.get(
          'https://debis.deu.edu.tr/OgrenciIsleri/Ogrenci/OgrenciNotu/index.php',
        );
        const resultScreenData = await resultScreen.text;
        const $ = await cheerio.load(resultScreenData);
        const semesterSelect = await $(
          "select[id='ogretim_donemi_id'] > option",
        );
        let semestersObj = [];
        let semesterValues = [];
        for (let i = 0; i < semesterSelect.length; i++) {
          let item = await semesterSelect.eq(i);
          let title = await item.text();
          let values = await item.attr('value');
          semestersObj.push(title);
          semesterValues.push([values, title]);
          setSemesterValue(semesterValues);
        }
      })();
    } catch (e) {
      console.log(e, 'HATAAAAAAAA');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        name,
        semesterValue,
        setSemesterValue,
        setName,
        saveUser,
        setSelectedLanguage,
        selectedLanguage,
        setSaveUser,
        signOut: async () => {
          try {
            await superagent
              .get('https://debis.deu.edu.tr/php_library/Cikis.php')
              .unset('User-Agent')
              .then(setAuth(false));
          } catch (e) {
            console.log('giris hata');
          }
        },

        signIn: async ({username, password}) => {
          try {
            await superagent
              .post('https://debis.deu.edu.tr/debis.php')
              .unset('User-Agent')
              .send({
                username: `${username}`,
                password: `${password}`,
                emailHost: 'ogr.deu.edu.tr',
                tamam: 'Gonder',
              })
              .set('Content-Type', 'application/x-www-form-urlencoded')
              .end(async (err, res) => {
                const resultScreenData = await res.text;
                const $ = await cheerio.load(resultScreenData);
                const studentName = await $('body > div > div')
                  .text()
                  .slice(11);
                if (studentName.length !== 0) {
                  setName(studentName);
                  setAuth(true);
                } else {
                  setAuth(false);
                  showMessage({
                    type: 'danger',
                    message:
                      'Giris yapilamadi, Lutfen Kullanici yapilamadi ve Sifrenizi Kontrol Edin.',
                  });
                }
              });

            const name = await AsyncStorage.getItem('name');
            const pass = await AsyncStorage.getItem('pass');
            console.log(name, pass);
          } catch (e) {
            console.log(e, 'AAAAAAAAAAAAA');
          }
        },
        tex1: async () => {
          await superagent
            .get('https://debis.deu.edu.tr/debis.php')
            .end(async (err, res) => {
              const resultScreenData = await res.text;
              const $ = await cheerio.load(resultScreenData);
              const studentName = await $('body > div > div').text().slice(11);
              if (studentName.length !== 0) {
                setName(studentName);
                setAuth(true);
                SplashScreen.hide();
              } else {
                setAuth(false);
                SplashScreen.hide();
              }
            });
          gett();
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
