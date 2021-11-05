import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {COLORS, FONTS} from '../constants/theme';
import {View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Classes from '../dataScrapping/classes';
import TopBar from '../topBar';
import {AuthContext} from '../context/AuthContext';
import RNPickerSelect from 'react-native-picker-select';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const LessonResultScreen = () => {
  const window = useWindowDimensions();
  const {selectedLanguage, setSelectedLanguage, semesterValue} =
    useContext(AuthContext);
  const placeholder = {key: '22', label: 'Lütfen Dönem Seçiniz', value: '33'};
  const [pickerData, setPickerData] = useState({});
  // setData(semesterValue.map((item, index) => [
  //   {label: item[1], value: item[0], key: index},
  // ]));
  // console.log(
  useEffect(() => {
    const data = semesterValue.map((item, index) => ({
      label: item[1],
      value: item[0],
      key: index,
    }));
    console.log(data);
    setPickerData(data);
  }, []);
  // );
  return (
    <View style={styles.container}>
      {TopBar('Not Bilgileri')}
      <View
        style={{
          paddingVertical: 16,
          paddingHorizontal: 12,
        }}>
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 25,
            justifyContent: 'center',
          }}>
          <RNPickerSelect
            style={{
              inputAndroid: {
                alignItems: 'center',
              },

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

      <View style={{flex: 6}}>
        {Classes(`${selectedLanguage}`, `${selectedLanguage}`)}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    flex: 1,
  },
  pickerStyle: {
    key: 'zxc',
    ...FONTS.body2,
    color: COLORS.black,

    alignSelf: 'center',
    justifyContent: 'center',
  },
});

export default LessonResultScreen;
