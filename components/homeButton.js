import {Pressable, Text, View, StyleSheet, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {COLORS, LAYOUT} from '../constants/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, {useContext} from 'react';
import {AuthContext} from '../context/AuthContext';

export const homeButton = (name, category, navigate) => {
  const {toggleModal, toggleModal3} = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <Pressable
      style={styles.pressableStyles}
      onPress={
        category === 'Yemek Menusu'
          ? toggleModal
          : category === 'Akademik Takvim'
          ? toggleModal3
          : () => navigation.navigate(navigate)
      }>
      <View style={styles.container}>
        <View style={{...LAYOUT.setFlex1, ...LAYOUT.justifyCenter}}>
          <MaterialCommunityIcons name={name} color={COLORS.white} size={60} />
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textStyle}>{category}</Text>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  pressableStyles: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    backgroundColor: COLORS.green,
    height: Dimensions.get('window').height * 0.135,
    alignItems: 'center',
    width: Dimensions.get('window').height * 0.135,
    borderRadius: 25,
  },
  textContainer: {
    width: Dimensions.get('window').height * 0.135,
    height: Dimensions.get('window').height * 0.075,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    textAlign: 'center',
    color: COLORS.white,
    fontSize: 17,
    fontFamily: 'SF-Pro-Display-Bold',
    fontWeight: 'bold',
  },
});
