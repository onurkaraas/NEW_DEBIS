import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';
import SplashScreen from 'react-native-splash-screen';

const cheerio = require('cheerio');
const request = require('superagent');
const superagent = request.agent();

export const AuthContext = createContext();
export const AuthProvider = ({children}) => {
  const [auth, setAuth] = useState(null);
  const [name, setName] = useState('');
  const [load, setLoad] = useState(true);
  const [saveUser, setSaveUser] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [semesterValue, setSemesterValue] = useState([]);
  const [department, setDepartment] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [year, setYear] = useState('');
  const [advisor, setAdvisor] = useState('');
  const [clicked, setClicked] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [press, setTimesPressed] = useState('');

  const toggleModal = () => setModalVisible(!isModalVisible);

  const toggleModal2 = () => setModalVisible2(!isModalVisible2);

  const gett = () => {
    try {
      (async () => {
        let resultScreen = await superagent.get(
          'https://debis.deu.edu.tr/OgrenciIsleri/Ogrenci/OgrenciNotu/index.php',
        );
        const resultScreenData = await resultScreen.text;
        const $ = await cheerio.load(resultScreenData);

        const studentName = $(
          'body > table:nth-child(4) > tbody > tr:nth-child(2) > td:nth-child(2) > form > table > tbody > tr:nth-child(1) > td:nth-child(3)',
        ).text();
        if (studentName.length !== 0) {
          setAuth(true);
          const departmentName = $(
            'body > table:nth-child(4) > tbody > tr:nth-child(2) > td:nth-child(2) > form > table > tbody > tr:nth-child(5) > td:nth-child(3)',
          ).text();
          const stuNum = $(
            'body > table:nth-child(4) > tbody > tr:nth-child(2) > td:nth-child(2) > form > table > tbody > tr:nth-child(2) > td:nth-child(3)',
          ).text();
          const year1 = $(
            'body > table:nth-child(4) > tbody > tr:nth-child(2) > td:nth-child(2) > form > table > tbody > tr:nth-child(3) > td:nth-child(3)',
          ).text();
          const prof = $(
            'body > table:nth-child(4) > tbody > tr:nth-child(2) > td:nth-child(2) > form > table > tbody > tr:nth-child(7) > td:nth-child(3)\n',
          ).text();
          const semesterSelect = await $(
            "select[id='ogretim_donemi_id'] > option",
          );
          let semesterValues = [];
          for (let i = 1; i < semesterSelect.length; i++) {
            let item = semesterSelect.eq(i);
            let title = item.text();
            let values = item.attr('value');
            semesterValues.push([values, title]);
          }
          setSemesterValue(semesterValues);
          setAdvisor(prof);
          setYear(year1);
          setStudentNumber(stuNum);
          setName(studentName);
          setDepartment(departmentName);
        } else {
          setAuth(false);
        }

      })();
    } catch (e) {
      showMessage(e, 'Error while getting data');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        gett,
        setAuth,
        name,
        load,
        press,
        setTimesPressed,
        setLoad,
        setClicked,
        clicked,
        semesterValue,
        setSemesterValue,
        setName,
        studentNumber,
        setStudentNumber,
        saveUser,
        year,
        advisor,
        setSelectedLanguage,
        selectedLanguage,
        setSaveUser,
        department,
        setDepartment,
        isModalVisible,
        setModalVisible,
        toggleModal,
        isModalVisible2,
        setModalVisible2,
        toggleModal2,
        signOut: async () => {
          try {
            await superagent
              .get('https://debis.deu.edu.tr/php_library/Cikis.php')
              .unset('User-Agent')
              .then(setAuth(false) && setName(''));
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
              .end(() => {
                gett();
              });
          } catch (e) {
            showMessage('Error while trying to sign in');
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
