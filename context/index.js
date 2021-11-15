import React from 'react';

import FlashMessage from 'react-native-flash-message';
import {StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useKeyboard} from '@react-native-community/hooks';

import {AuthProvider} from './AuthContext';
import {COLORS, LAYOUT} from '../constants/theme';
import Routes from './Routes';

const Providers = () => {
  const keyboard = useKeyboard();

  return (
    <SafeAreaView style={LAYOUT.setFlex1}>
      <AuthProvider>
        <Routes />
        <FlashMessage position="top" />
        <StatusBar
          animated={true}
          backgroundColor={
            keyboard.keyboardShown ? COLORS.primary : COLORS.secondary
          }
        />
      </AuthProvider>
    </SafeAreaView>
  );
};

export default Providers;
