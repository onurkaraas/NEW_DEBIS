import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';
import SplashScreen from 'react-native-splash-screen';
import {isNonEmptyString} from '../helpers/checks';

const cheerio = require('cheerio');
const request = require('superagent');
const superagent = request.agent();

export const AuthContext = createContext();
export const AuthProvider = ({children}) => {
  const [auth, setAuth] = useState(null);
  const [name, setName] = useState('');
  const [saveUser, setSaveUser] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [semesterValue, setSemesterValue] = useState([]);
  const [department, setDepartment] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [year, setYear] = useState('');
  const [advisor, setAdvisor] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [press, setTimesPressed] = useState('');
  const [error, setError] = useState(null);

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
            setError(false);
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
          setError(true);
        }
      })();
    } catch (e) {
      showMessage({
        message: 'Hata',
        description: 'Beklenmedik bir hata oluştu.',
        type: 'danger',
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        gett,
        setAuth,
        name,
        press,
        setTimesPressed,
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
        error,
        setError,
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
                    username: `${username}`,
                    password: `${password}`,
                    emailHost: 'ogr.deu.edu.tr',
                    tamam: 'Gonder',
                  })
                  .set('Content-Type', 'application/x-www-form-urlencoded')
                  .end(() => {
                    gett();
                    error
                      ? showMessage({
                          message: 'Giriş yaparken hata oluştu.',
                          description:
                            'Lütfen bilgileriniz kontrol edip tekrar deneyiniz',
                          type: 'danger',
                        })
                      : null;
                  });
          } catch (e) {
            showMessage('Error while trying to sign in');
          }
        },
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
      }}>
      {children}
    </AuthContext.Provider>
  );
};
