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

  return (
    <SafeAreaProvider>

      <Providers />
    </SafeAreaProvider>
  );
};

export default App;
