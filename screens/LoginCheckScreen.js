import React, {useContext, useEffect} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import {COLORS, FONTS} from '../constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../context/AuthContext';
import {useNavigation} from "@react-navigation/native";
const LoginCheckScreen = () => {
  const {getData, signIn, states} = useContext(AuthContext);
  const {container, image, textStyle, textContainer} = styles;
  const navigation = useNavigation();

  const getLoginData = async () => {
    try {
      const value = await AsyncStorage.getItem('@loginInfo');
      if (value !== null && states.auth !== true) {
        const valueObject = JSON.parse(value);
        await signIn(valueObject);
      } else {
        getData();
        navigation.navigate('LogInScreen');
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getLoginData().catch(e => console.log(e));
  }, []);
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
        <Text style={textStyle}>Bilgileriniz Kontrol Ediliyor</Text>
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
    marginBottom: Dimensions.get('window').height * 0.09,
  },
});

export default LoginCheckScreen;
