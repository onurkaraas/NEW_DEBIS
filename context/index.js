import React from 'react';

import {AuthProvider} from './AuthContext';
import FlashMessage from 'react-native-flash-message';
import { StatusBar, useWindowDimensions } from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context';

import {COLORS} from '../constants/theme';
import Routes from './Routes';
import {useKeyboard} from '@react-native-community/hooks';

const Providers = () => {
  const keyboard = useKeyboard();

  return (
    <SafeAreaView style={{flex: 1}}>
      <AuthProvider>
        <Routes />
        <FlashMessage position="top" />
        <StatusBar backgroundColor={keyboard.keyboardShown ? COLORS.primary : COLORS.secondary } />
      </AuthProvider>
    </SafeAreaView>
  );
};

export default Providers;