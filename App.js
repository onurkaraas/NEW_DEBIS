import React, {useContext, useEffect, useState} from 'react';
import {StatusBar} from 'react-native';

import {SafeAreaProvider} from 'react-native-safe-area-context';

import Providers from './context';
import {COLORS} from './constants/theme';
import SplashScreen from 'react-native-splash-screen';
import {AuthContext} from './context/AuthContext';
const cheerio = require('react-native-cheerio');
const request = require('superagent');
const superagent = request.agent();
const App = () => {
  const [load, setLoad] = useState(false);

  useEffect(() => {
    (async () => {
      await setLoad(true);
      await superagent
        .get('https://debis.deu.edu.tr/debis.php')
        .end(async (err, res) => {
          const resultScreenData = await res.text;
          const $ = await cheerio.load(resultScreenData);
          const studentName = await $('body > div > div').text().slice(11);
          console.log(studentName.length);
          if (studentName.length !== 0) {
            setLoad(false);
          } else {
            setLoad(true);
          }
        });
    })();

    return () => setLoad(false);
  }, []);
  return (
    <SafeAreaProvider>
      {load ? SplashScreen.show() : SplashScreen.hide()}

      <Providers />
    </SafeAreaProvider>
  );
};

export default App;
