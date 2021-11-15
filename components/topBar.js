import React, {useContext, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useDimensions, useKeyboard} from '@react-native-community/hooks';
import {COLORS, FONTS} from '../constants/theme';
import {AuthContext} from '../context/AuthContext';
export const TopBar = headerTitle => {
  const {width, height} = useDimensions().window;
  const {states} = useContext(AuthContext);
  const {container, textContainer, textStyle} = styles;
  const keyboard = useKeyboard();

  return (
    <View
      style={{
        ...container,
        width: width,
        height: height * 0.1,
        justifyContent:
          states.studentInfo.name.length === 0 ? 'center' : 'space-between',
      }}>
      <View style={textContainer}>
        <Text style={textStyle}>{headerTitle}</Text>
      </View>
      <View style={textContainer}>
        <Text style={textStyle}>{states.studentInfo.name}</Text>
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
  textContainer: {justifyContent: 'center', alignItems: 'center'},
  textStyle: {...FONTS.h2, color: COLORS.white, fontWeight: '800'},
});
