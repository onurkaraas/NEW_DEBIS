import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useDimensions, useKeyboard} from '@react-native-community/hooks';
import {COLORS, FONTS} from '../constants/theme';
import {AuthContext} from '../context/AuthContext';

export const TopBar = headerTitle => {
  const {width, height} = useDimensions().window;
  const {name, department} = useContext(AuthContext);
  const keyboard = useKeyboard();

  return (
    <View
      style={{
        ...styles.container,
        width: width,
        height: keyboard.keyboardShown ? 0 : height * 0.1,
        justifyContent: name.length === 0 ? 'center' : 'space-between',
      }}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{...FONTS.h2, color: COLORS.white, fontWeight: '800'}}>
          {headerTitle}
        </Text>
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{...FONTS.h2, color: COLORS.white, fontWeight: '800'}}>
          {name}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.secondary,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    flexDirection: 'row',
    paddingHorizontal: 12,
  },
});
