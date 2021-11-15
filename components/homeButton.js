import {Pressable, Text, View, StyleSheet, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {COLORS, LAYOUT} from '../constants/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, {useContext} from 'react';
import {AuthContext} from '../context/AuthContext';

export const homeButton = (name, category, navigate) => {
  const {toggleModals} = useContext(AuthContext);
  const navigation = useNavigation();
  const {pressableStyles, container, textContainer, textStyle} = styles;
  return (
    <Pressable
      style={pressableStyles}
      onPress={
        category === 'Yemek Menusu'
          ? toggleModals.toggleModalMeal
          : category === 'Akademik Takvim'
          ? toggleModals.toggleModalCalendar
          : () => navigation.navigate(navigate)
      }>
      <View style={container}>
        <View style={{...LAYOUT.setFlex1, ...LAYOUT.justifyCenter}}>
          <MaterialCommunityIcons name={name} color={COLORS.white} size={60} />
        </View>
      </View>
      <View style={textContainer}>
        <Text style={textStyle}>{category}</Text>
      </View>
    </Pressable>
  );
};
export const dimensions = Dimensions.get('window');

const styles = StyleSheet.create({
  pressableStyles: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    backgroundColor: COLORS.green,
    height: dimensions.height * 0.135,
    alignItems: 'center',
    width: dimensions.height * 0.135,
    borderRadius: 25,
  },
  textContainer: {
    width: dimensions.height * 0.135,
    height: dimensions.height * 0.075,
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
