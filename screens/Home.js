import React, {useContext, useState} from 'react';
import {View, StyleSheet, Dimensions,Button} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Modal from 'react-native-modal';

import {AuthContext} from '../context/AuthContext';
import {COLORS, LAYOUT} from '../constants/theme';
import {TopBar, infoTable, homeButton, RenderPdf} from '../components';

import {
  LoadingScreen,
  TranscriptScreen,
  LessonResultScreen,
  Schedule,
  ModalPdf,
} from '../screens';

const Home = () => {
  const {isModalVisible, toggleModal, isModalVisible3, toggleModal3,signOut} =
    useContext(AuthContext);

  const uri =
    'https://sks.deu.edu.tr/wp-content/uploads/2021/10/11KASIM-AYI-YEMEK-KALORISI-1.pdf';
  const uriCalendar =
    'https://ogrenci.deu.edu.tr/wp-content/uploads/2021/08/2021-2022-Akademik-Takvim.pdf';

  return (
    <SafeAreaView style={styles.container}>
      {TopBar('Hoşgeldiniz')}
      <View style={styles.tableView}>{infoTable()}</View>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonFlexStyle}>
          {homeButton('calendar', 'Akademik Takvim')}
          {homeButton('calendar-remove', 'Devamsizlik', RenderPdf)}
          {homeButton('calendar-check', 'Ders Programi', Schedule)}
        </View>

        <View style={styles.buttonFlexStyle}>
          {homeButton('food', 'Yemek Menusu')}
          {homeButton('message-draw', 'Mesajlar', LoadingScreen)}
          {homeButton('alpha-a-box', 'Not Bilgisi', LessonResultScreen)}
        </View>
<Button onPress={() => signOut()} title={'qeqweqw'}>qwe</Button>
        <Modal
          hideModalContentWhileAnimating={true}
          isVisible={isModalVisible}
          backdropOpacity={0.6}
          onBackdropPress={toggleModal}>
          <View style={{...LAYOUT.setFlex1, ...LAYOUT.justifyCenter}}>
            {ModalPdf({uri}, 'Yemek Menusu', toggleModal)}
          </View>
        </Modal>

        <Modal
          hideModalContentWhileAnimating={true}
          isVisible={isModalVisible3}
          backdropOpacity={0.6}
          onBackdropPress={toggleModal3}>
          <View style={{...LAYOUT.setFlex1, ...LAYOUT.justifyCenter}}>
            {ModalPdf(
              {
                uri: 'https://ogrenci.deu.edu.tr/wp-content/uploads/2021/08/2021-2022-Akademik-Takvim.pdf',
              },
              'Akademik Takvim',
              toggleModal3,
            )}
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
