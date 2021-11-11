import React, {useContext} from 'react';
import {Dimensions, Text, View, StyleSheet} from 'react-native';
import {FONTS} from '../constants/theme';
import {AuthContext} from '../context/AuthContext';

export const infoTable = () => {
  const {states} = useContext(AuthContext);
  const {
    container,
    flexContainer,
    flexDirectionStyle,
    spaceBetween,
    titleStyle,
    infoTextStyle,
  } = styles;
  return (
    <View style={container}>
      <View style={flexContainer}>
        <View style={flexDirectionStyle}>
          <View style={spaceBetween}>
            <Text style={titleStyle}>ÖĞRENCİ NO:</Text>
          </View>
          <View>
            <Text style={infoTextStyle}>
              {states.studentInfo.studentNumber}
            </Text>
          </View>
        </View>
      </View>
      <View style={flexContainer}>
        <View style={flexDirectionStyle}>
          <View style={spaceBetween}>
            <Text style={titleStyle}>SINIF:</Text>
          </View>
          <View>
            <Text style={infoTextStyle}>{states.studentInfo.year}</Text>
          </View>
        </View>
      </View>
      <View style={flexContainer}>
        <View style={flexDirectionStyle}>
          <View style={spaceBetween}>
            <Text style={titleStyle}>BÖLÜM:</Text>
          </View>
          <View>
            <Text style={infoTextStyle}>
              {states.studentInfo.departmentName}
            </Text>
          </View>
        </View>
      </View>
      <View style={flexContainer}>
        <View style={flexDirectionStyle}>
          <View style={spaceBetween}>
            <Text style={titleStyle}>DANIŞMAN:</Text>
          </View>
          <View>
            <Text style={infoTextStyle}>
              {states.studentInfo.advisor}
            </Text>
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
