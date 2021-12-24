import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {COLORS, FONTS} from '../constants/theme';
import {View} from 'react-native';
import Classes from '../components/dataScrapingComponents/classes';
import {screenTopBar} from '../components';
import {AuthContext} from '../context/AuthContext';
import RNPickerSelect from 'react-native-picker-select';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDimensions, useKeyboard} from '@react-native-community/hooks';
import {Button, IconButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const LessonResultScreen = () => {
  const {states} = useContext(AuthContext);
  const {container, pickerView, pickerStyle, pickerContainer} = styles;
  const [pickerData, setPickerData] = useState([]);
  const navigation = useNavigation();

  const placeholder = {
    label: 'Ders Seçiniz',
    value: 0,
    key: 0,
  };
  useEffect(() => {
    const data = states.semesterValue.map((item, index) => ({
      label: item[1],
      value: item[0],
      key: index + 1,
    }));
    setPickerData(data);
  }, []);
  const keyboard = useKeyboard();
  const {width, height} = useDimensions().window;

  return (
    <View style={container}>
      {screenTopBar('Not Bilgisi')}
      <View style={pickerContainer}>
        <View style={pickerView}>
          <RNPickerSelect
            style={{
              iconContainer: {top: 11, right: 20},
            }}
            Icon={() => {
              return (
                <MaterialCommunityIcons
                  name="arrow-down"
                  color={'gray'}
                  size={28}
                />
              );
            }}
            useNativeAndroidPickerStyle={false}
            selectedValue={states.selectedID}
            onValueChange={itemValue => states.setSelectedID(itemValue)}
            items={pickerData}
            textInputProps={pickerStyle}
            placeholder={placeholder}
          />
        </View>
      </View>
      <View style={{flex: 6}}>{Classes(`${states.selectedID}`)}</View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    flex: 1,
  },
  pickerView: {
    backgroundColor: '#fff',
    borderRadius: 25,
    justifyContent: 'center',
  },
  pickerStyle: {
    ...FONTS.body2,
    color: COLORS.black,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  pickerContainer: {
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
});

export default LessonResultScreen;
