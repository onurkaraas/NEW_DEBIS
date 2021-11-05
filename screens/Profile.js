import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import TopBar from '../topBar';
import {SafeAreaView} from 'react-native-safe-area-context';
import User from '../dataScrapping/mod';
import {useDimensions} from '@react-native-community/hooks';

import FastImage from 'react-native-fast-image';
import {COLORS, FONTS, SHADOWS} from '../constants/theme';
const Profile = () => {
  const {width, height} = useDimensions().window;

  return (
    <SafeAreaView style={style.container}>
      <FastImage
        style={{
          width: width * 0.8,
          height: width * 0.8,
          flex: 0.65,
          alignItems: 'center',
        }}
        source={{
          uri: 'https://cdn.freelogovectors.net/wp-content/uploads/2020/03/Dokuz_Eylul_Universitesi_Logo.png',
          priority: FastImage.priority.normal,
        }}
        resizeMode={'contain'}
      />
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'column',
        }}>
        <Text style={{...FONTS.h2, color: 'white'}}>
          Giriş Bilgileriniz Kontrol Ediliyor
        </Text>
        <ActivityIndicator size={'large'} colo={'blue'} style={{marginTop:33}} />
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
  },
  input: {
    marginTop: 222,
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 4,
  },
  status: {
    padding: 10,
    textAlign: 'center',
  },
});

export default Profile;
