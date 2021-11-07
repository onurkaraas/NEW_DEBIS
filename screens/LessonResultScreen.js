import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../constants/theme';
import {View} from 'react-native';
import Classes from '../dataScrapping/classes';
import TopBar from '../topBar';
import {AuthContext} from '../context/AuthContext';
import RNPickerSelect from 'react-native-picker-select';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const LessonResultScreen = () => {
  const {selectedLanguage, setSelectedLanguage, semesterValue} =
    useContext(AuthContext);
  const [pickerData, setPickerData] = useState([]);
  const placeholder = {
    label: 'Ders Seçiniz',
    value: 0,
    key: 0,
  };

  useEffect(() => {
    const data = semesterValue.map((item, index) => ({
      label: item[1],
      value: item[0],
      key: (index + 1),
    }));
    setPickerData(data);
    console.log(pickerData);
  }, []);
  // );
  return (
    <View style={styles.container}>
      {TopBar('Not Bilgileri')}
      <View style={styles.pickerContainer}>
        <View style={styles.pickerView}>
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
                  style={styles.iconContainer}
                />
              );
            }}
            useNativeAndroidPickerStyle={false}
            selectedValue={selectedLanguage}
            onValueChange={itemValue => setSelectedLanguage(itemValue)}
            items={pickerData}
            textInputProps={styles.pickerStyle}
            placeholder={placeholder}
          />
        </View>
      </View>
      <View style={{flex: 6}}>{Classes(`${selectedLanguage}`)}</View>
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
