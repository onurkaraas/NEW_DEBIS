import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import FastImage from 'react-native-fast-image';
import {COLORS, FONTS} from '../constants/theme';
const LoadingScreen = () => {
  const {container, image, textStyle, textContainer} = styles;
  return (
    <SafeAreaView style={container}>
      <FastImage
        style={image}
        source={{
          uri: 'https://cdn.freelogovectors.net/wp-content/uploads/2020/03/Dokuz_Eylul_Universitesi_Logo.png',
          priority: FastImage.priority.normal,
        }}
        resizeMode={'contain'}
      />
      <View style={textContainer}>
        <Text style={textStyle}>Giriş Bilgileriniz Kontrol Ediliyor</Text>
        <ActivityIndicator size={60} colo={'blue'} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  image: {
    width: Dimensions.get('window').width * 0.75,
    height: Dimensions.get('window').width * 0.75,
    flex: 0.65,
    alignItems: 'center',
  },
  textStyle: {...FONTS.body1, fontWeight: 'bold', color: 'white'},
  textContainer: {
    flex: 0.3,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default LoadingScreen;
