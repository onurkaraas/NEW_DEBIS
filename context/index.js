import React, {useContext, useEffect, useState} from 'react';

import {AuthProvider, AuthContext} from './AuthContext';
import FlashMessage from 'react-native-flash-message';
import {StatusBar, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {COLORS} from '../constants/theme';
import Routes from './Routes';

const Providers = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <AuthProvider>
        <Routes />
        <FlashMessage position="top" />
        <StatusBar backgroundColor={COLORS.secondary} />
      </AuthProvider>
    </SafeAreaView>
  );
};

export default Providers;
