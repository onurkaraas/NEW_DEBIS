import React, {useContext, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useDimensions, useKeyboard} from '@react-native-community/hooks';
import {COLORS, FONTS} from '../constants/theme';
import {AuthContext} from '../context/AuthContext';
import {IconButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
export const screenTopBar = screenTitle => {
  const {width, height} = useDimensions().window;
  const {states} = useContext(AuthContext);
  const {container, textContainer, textStyle} = styles;
  const keyboard = useKeyboard();
  const navigation = useNavigation();

  return (
    <View
      style={{
        backgroundColor: COLORS.secondary,
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
        flexDirection: 'row',
        paddingHorizontal: 14,
        width: width,
        height: keyboard.keyboardShown ? 0 : height * 0.09,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View style={{justifyContent: 'center'}}>
        <IconButton
          icon="arrow-left"
          color={'white'}
          size={24}
          onPress={() => navigation.navigate('Tabs')}
          style={{
            ...FONTS.h2,
            color: COLORS.white,
            fontWeight: '800',
          }}
        />
      </View>
      <View style={textContainer}>
        <Text style={textStyle}>
          {screenTitle}
        </Text>
      </View>

      <View style={{justifyContent: 'center'}}>
        <IconButton
          icon="exit-to-app"
          color={'white'}
          size={24}
          onPress={() => navigation.navigate('Çıkış')}
          style={{
            ...FONTS.h2,
            color: COLORS.white,
            fontWeight: '800',
          }}
        />
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
