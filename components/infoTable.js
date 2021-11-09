import React, {useContext} from 'react';
import {Dimensions, Text, View, StyleSheet} from 'react-native';
import {FONTS} from '../constants/theme';
import {AuthContext} from '../context/AuthContext';

export const infoTable = () => {
  const {studentInfo} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.flexContainer}>
        <View style={styles.flexDirectionStyle}>
          <View style={styles.spaceBetween}>
            <Text style={styles.titleStyle}>ÖĞRENCİ NO:</Text>
          </View>
          <View>
            <Text style={styles.infoTextStyle}>
              {studentInfo.studentNumber}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.flexContainer}>
        <View style={styles.flexDirectionStyle}>
          <View style={styles.spaceBetween}>
            <Text style={styles.titleStyle}>SINIF:</Text>
          </View>
          <View>
            <Text style={styles.infoTextStyle}>{studentInfo.year}</Text>
          </View>
        </View>
      </View>
      <View style={styles.flexContainer}>
        <View style={styles.flexDirectionStyle}>
          <View style={styles.spaceBetween}>
            <Text style={styles.titleStyle}>BÖLÜM:</Text>
          </View>
          <View>
            <Text style={styles.infoTextStyle}>{studentInfo.department}</Text>
          </View>
        </View>
      </View>
      <View style={styles.flexContainer}>
        <View style={styles.flexDirectionStyle}>
          <View style={styles.spaceBetween}>
            <Text style={styles.titleStyle}>DANIŞMAN:</Text>
          </View>
          <View>
            <Text style={styles.infoTextStyle}>{studentInfo.advisor}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height * 0.25,
    width: Dimensions.get('window').width * 0.9,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 25,
    padding: 12,
  },
  flexContainer: {
    justifyContent: 'center',
    flex: 0.3,
  },
  flexDirectionStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 12,
  },
  spaceBetween: {justifyContent: 'space-between'},
  titleStyle: {...FONTS.h3, fontWeight: '800'},
  infoTextStyle: {...FONTS.h3, color: 'black', fontWeight: '700'},
});
