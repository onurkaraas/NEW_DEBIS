import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {COLORS, FONTS} from '../constants/theme';
import {homeButton} from '../components/homeButton';
import LessonResultScreen from './LessonResultScreen';
import LoadingScreen from './LoadingScreen';
import PdfFunc from './pdfScreens/PdfFunc';
import {SafeAreaView} from 'react-native-safe-area-context';
import TopBar from '../topBar';
import {AuthContext} from '../context/AuthContext';
import Modal from 'react-native-modal';
import {infoTable} from '../components/infoTable';
import Schedule from './Schedule';
import TranscriptScreen from './TranscriptScreen';
import ModalPdf from './pdfScreens/ModalPdf';
import {LAYOUT} from '../constants/theme';
const Home = () => {
  const {isModalVisible, toggleModal} = useContext(AuthContext);

  const uri =
    'https://sks.deu.edu.tr/wp-content/uploads/2021/10/11KASIM-AYI-YEMEK-KALORISI-1.pdf';

  return (
    <SafeAreaView style={styles.container}>
      {TopBar('Hoşgeldiniz')}
      <View style={styles.tableView}>{infoTable()}</View>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonFlexStyle}>
          {homeButton('calendar', 'Akademik Takvim', TranscriptScreen)}
          {homeButton('calendar-remove', 'Devamsizlik', PdfFunc)}
          {homeButton('calendar-check', 'Ders Programi', Schedule)}
        </View>

        <View style={styles.buttonFlexStyle}>
          {homeButton('food', 'Yemek Menusu')}
          {homeButton('message-draw', 'Mesajlar', LoadingScreen)}
          {homeButton('alpha-a-box', 'Not Bilgisi', LessonResultScreen)}
        </View>
        <Modal
          hideModalContentWhileAnimating={true}
          isVisible={isModalVisible}
          backdropOpacity={0.6}
          onBackdropPress={toggleModal}>
          <View style={{...LAYOUT.setFlex1, ...LAYOUT.justifyCenter}}>
            {ModalPdf({uri}, 'Yemek Menusu')}
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    flexDirection: 'column',
  },
  tableView: {
    flex: 0.4,
    marginVertical: Dimensions.get('window').height * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  buttonFlexStyle: {
    flexDirection: 'row',
    flex: 0.41,
    alignItems: 'center',
  },
});
export default Home;
