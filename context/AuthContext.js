import React, {createContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';
import {isNonEmptyString} from '../helpers/checks';
import SplashScreen from 'react-native-splash-screen';

const cheerio = require('cheerio');
const request = require('superagent');
const superagent = request.agent();

export const AuthContext = createContext();
export const AuthProvider = ({children}) => {
  const [auth, setAuth] = useState(null);
  const [error, setError] = useState(null);
  const [saveUser, setSaveUser] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [isModalVisible3, setModalVisible3] = useState(false);
  const [selectedID, setSelectedID] = useState();
  const [semesterValue, setSemesterValue] = useState([]);
  const [userData, setUserData] = useState([]);
  const [studentInfo, setStudentInfo] = useState({
    name: '',
    department: '',
    studentNumber: '',
    year: '',
    advisor: '',
  });
  const toggleModalMeal = () => setModalVisible(!isModalVisible);

  const toggleModalLessonResult = () => setModalVisible2(!isModalVisible2);

  const toggleModalCalendar = () => setModalVisible3(!isModalVisible3);
  const storeData = async value => {
    try {
      await AsyncStorage.setItem('@loginInfo', value);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  const removeLoginData = async () => {
    try {
      await AsyncStorage.removeItem('@loginInfo');
    } catch (e) {
      console.log(e);
    }
    console.log('Done.');
  };

  const toggleModals = {
    toggleModalMeal,
    toggleModalLessonResult,
    toggleModalCalendar,
  };
  const modalVisibility = {
    isModalVisible,
    isModalVisible2,
    isModalVisible3,
  };
  const states = {
    auth,
    setAuth,
    semesterValue,
    saveUser,
    setSaveUser,
    studentInfo,
    selectedID,
    setSelectedID,
    error,
    setError,
  };
  const getData = () => {
    try {
      (async () => {
        let resultScreen = await superagent.get(
          'https://debis.deu.edu.tr/OgrenciIsleri/Ogrenci/OgrenciNotu/index.php',
        );
        const resultScreenData = resultScreen.text;
        const $ = cheerio.load(resultScreenData);
        const name = $(
          'body > table:nth-child(4) > tbody > tr:nth-child(2) > td:nth-child(2) > form > table > tbody > tr:nth-child(1) > td:nth-child(3)',
        ).text();
        if (name.length !== 0) {
          states.setError(false);
          states.setAuth(true);

          const departmentName = $(
            'body > table:nth-child(4) > tbody > tr:nth-child(2) > td:nth-child(2) > form > table > tbody > tr:nth-child(5) > td:nth-child(3)',
          ).text();
          const studentNumber = $(
            'body > table:nth-child(4) > tbody > tr:nth-child(2) > td:nth-child(2) > form > table > tbody > tr:nth-child(2) > td:nth-child(3)',
          ).text();
          const year = $(
            'body > table:nth-child(4) > tbody > tr:nth-child(2) > td:nth-child(2) > form > table > tbody > tr:nth-child(3) > td:nth-child(3)',
          ).text();
          const advisor = $(
            'body > table:nth-child(4) > tbody > tr:nth-child(2) > td:nth-child(2) > form > table > tbody > tr:nth-child(7) > td:nth-child(3)\n',
          ).text();
          const semesterSelect = $("select[id='ogretim_donemi_id'] > option");
          let semesterValues = [];
          for (let i = 1; i < semesterSelect.length; i++) {
            let item = semesterSelect.eq(i);
            let title = item.text();
            let values = item.attr('value');
            semesterValues.push([values, title]);
          }
          setSemesterValue(semesterValues);
          setStudentInfo({
            name,
            departmentName,
            studentNumber,
            year,
            advisor,
          });
          SplashScreen.hide();
        } else {
          states.setAuth(false);
          states.setError(true);
          showMessage({
            message: 'Hata',
            description: 'Beklenmedik bir hata oluştu.',
            type: 'danger',
          });
          SplashScreen.hide();
        }
      })();
    } catch (e) {
      if (e) {
        showMessage({
          message: 'Hata',
          description: 'Beklenmedik bir hata oluştu.',
          type: 'danger',
        });
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        states,
        toggleModals,
        modalVisibility,
        getData,
        signIn: async ({username, password}) => {
          try {
            !isNonEmptyString(username && password)
              ? showMessage({
                  message: 'Hata',
                  description: 'Kullanıcı adı veya şifre boş olamaz',
                  type: 'danger',
                })
              : await superagent
                  .post('https://debis.deu.edu.tr/debis.php')
                  .unset('User-Agent')
                  .send({
                    username: `${username.toLowerCase()}`,
                    password: `${password}`,
                    emailHost: 'ogr.deu.edu.tr',
                    tamam: 'Gonder',
                  })
                  .set('Content-Type', 'application/x-www-form-urlencoded')
                  .end(async () => {
                    await getData();
                    if (states.saveUser && states.auth) {
                      await storeData(
                        JSON.stringify({
                          username,
                          password,
                        }),
                      );
                    }
                  });
          } catch (e) {
            showMessage({
              message: 'Hata',
              description: 'Beklenmedik bir hata oluştu.',
              type: 'danger',
            });
          }
        },
        signOut: async () => {
          try {
            await superagent
              .get('https://debis.deu.edu.tr/php_library/Cikis.php')
              .unset('User-Agent')
              .then(async () => {
                await removeLoginData();
                states.setAuth(false);
                states.setSaveUser(false);
                setStudentInfo({
                  name: '',
                  department: '',
                  studentNumber: '',
                  year: '',
                  advisor: '',
                });
              });
          } catch (e) {
            console.log('giris hata');
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
