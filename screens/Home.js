import React, {useContext, useEffect, useState} from 'react';
import {Text, useWindowDimensions, View, Pressable} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, FONTS} from '../constants/theme';
import LogInScreen from './LogInScreen';
import {Button, Switch} from 'react-native-elements';

import LessonResultScreen from './LessonResultScreen';
import Profile from './Profile';
import PdfFunc from './PdfFunc';
import {SafeAreaView} from 'react-native-safe-area-context';
import TopBar from '../topBar';
import {AuthContext} from '../context/AuthContext';
import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';

import Schedule from './Schedule';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TranscriptScreen from './TranscriptScreen';
import ModalPdf from './ModalPdf';
import SplashScreen from 'react-native-splash-screen';

const Home = () => {
  const window = useWindowDimensions();
  const navigation = useNavigation();
  const {
    studentNumber,
    department,
    year,
    advisor,
    isModalVisible,
    toggleModal,
  } = useContext(AuthContext);

  const uri =
    'https://sks.deu.edu.tr/wp-content/uploads/2021/10/11KASIM-AYI-YEMEK-KALORISI-1.pdf';
  function renderStudentInfo() {
    return (
      <View
        style={{
          height: window.height * 0.25,
          width: window.width * 0.9,
          backgroundColor: 'white',
          justifyContent: 'center',
          borderRadius: 25,
          padding: 12,
        }}>
        <View
          style={{
            justifyContent: 'center',
            flex: 0.3,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 12,
            }}>
            <View style={{justifyContent: 'space-between'}}>
              <Text style={{...FONTS.h3, fontWeight: '800'}}>ÖĞRENCİ NO:</Text>
            </View>
            <View>
              <Text style={{...FONTS.h3, color: 'black', fontWeight: '700'}}>
                {studentNumber}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'center',
            flex: 0.3,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 12,
            }}>
            <View style={{justifyContent: 'space-between'}}>
              <Text style={{...FONTS.h3, fontWeight: '800'}}>SINIF:</Text>
            </View>
            <View>
              <Text style={{...FONTS.h3, color: 'black', fontWeight: '700'}}>
                {year}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'center',
            flex: 0.3,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 12,
            }}>
            <View style={{justifyContent: 'space-between'}}>
              <Text style={{...FONTS.h3, fontWeight: '800'}}>BÖLÜM:</Text>
            </View>
            <View>
              <Text style={{...FONTS.h3, color: 'black', fontWeight: '700'}}>
                {department}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'center',
            flex: 0.3,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 12,
            }}>
            <View style={{justifyContent: 'space-between'}}>
              <Text style={{...FONTS.h3, fontWeight: '800'}}>DANIŞMAN:</Text>
            </View>
            <View>
              <Text style={{...FONTS.h3, color: 'black', fontWeight: '700'}}>
                {advisor}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  function renderIcons(name, category, navigate) {
    const window = useWindowDimensions();

    return (
      <Pressable
        style={{
          flex: 1,
          alignItems: 'center',
        }}
        onPress={
          category !== 'Yemek Menusu'
            ? () => navigation.navigate(navigate)
            : toggleModal
        }>
        {/*onPress={() => signOut()}>*/}
        <View
          style={{
            backgroundColor: COLORS.green,
            height: window.height * 0.135,
            alignItems: 'center',
            width: window.height * 0.135,
            borderRadius: 25,
          }}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <MaterialCommunityIcons
              name={name}
              color={COLORS.white}
              size={60}
            />
          </View>
        </View>
        <View
          style={{
            width: window.height * 0.135,
            height: window.height * 0.075,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: COLORS.white,
              fontSize: 17,
              fontFamily: 'SF-Pro-Display-Bold',
              fontWeight: 'bold',
            }}>
            {category}
          </Text>
        </View>
      </Pressable>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.primary,
        flexDirection: 'column',
      }}>
      {TopBar('Hoşgeldiniz')}
      <View
        style={{
          flex: 0.4,
          marginVertical: window.height * 0.05,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {renderStudentInfo()}
      </View>

      <View
        style={{
          flexDirection: 'column',
          flex: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            flex: 0.41,
            alignItems: 'center',
          }}>
          {renderIcons('calendar', 'Akademik Takvim', TranscriptScreen)}
          {renderIcons('calendar-remove', 'Devamsizlik', PdfFunc)}
          {renderIcons('calendar-check', 'Ders Programi', Schedule)}
        </View>

        <View
          style={{
            flexDirection: 'row',
            flex: 0.41,
            alignItems: 'center',
          }}>
          {renderIcons('food', 'Yemek Menusu')}
          {renderIcons('message-draw', 'Mesajlar', Profile)}
          {renderIcons('alpha-a-box', 'Not Bilgisi', LessonResultScreen)}
        </View>
        <Modal
          hideModalContentWhileAnimating={true}
          isVisible={isModalVisible}
          backdropOpacity={0.6}
          onBackdropPress={toggleModal}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            {ModalPdf({uri}, 'Yemek Menusu')}
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default Home;
