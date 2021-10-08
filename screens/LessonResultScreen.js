import React, {useContext, useEffect, useLayoutEffect} from 'react';
import {useWindowDimensions} from 'react-native';
import {COLORS, FONTS} from '../constants/theme';
import {useState} from 'react';
import {View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Classes from '../dataScrapping/classes';
import {SafeAreaView} from 'react-native-safe-area-context';
import TopBar from '../topBar';
import {AuthContext} from '../context/AuthContext';

const LessonResultScreen = () => {
  const window = useWindowDimensions();
  const {
    selectedLanguage,
    setSelectedLanguage,
    semesterValue,
    setSemesterValue,
  } = useContext(AuthContext);

  return (
    <View
      renderToHardwareTextureAndroid={true}
      style={{
        backgroundColor: COLORS.primary,
        flex: 1,
        ...FONTS.h2,
      }}>
      {TopBar('Not Bilgileri')}
      <View style={{alignItems: 'center', padding: 22}}>
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 25,
            height: 45,
            width: window.width * 0.9,
            justifyContent: 'center',
            textAlign: 'center',
          }}>
          <Picker
            itemStyle={{
              textAlign: 'center',
              alignItems: 'center',
            }}
            style={{
              ...FONTS.h2,
            }}
            selectedValue={selectedLanguage}
            onValueChange={itemValue => setSelectedLanguage(itemValue)}>
            {semesterValue.map((item, index) => {
              return (
                <Picker.Item
                  style={{
                    ...FONTS.h2,
                  }}
                  label={item[1]}
                  value={item[0]}
                  key={index}
                />
              );
            })}
          </Picker>
        </View>
      </View>
      <View style={{flex: 6}}>
        {Classes(`${selectedLanguage}`, `${selectedLanguage}`)}
      </View>
    </View>
  );
};

export default LessonResultScreen;
