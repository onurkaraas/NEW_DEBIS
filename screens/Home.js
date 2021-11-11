import React, {useContext, useState} from 'react';
import {View, StyleSheet, Dimensions, Button} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Modal from 'react-native-modal';

import {AuthContext} from '../context/AuthContext';
import {COLORS, LAYOUT} from '../constants/theme';
import {TopBar, infoTable, homeButton, renderPdf} from '../components';

import {
  LoadingScreen,
  TranscriptScreen,
  LessonResultScreen,
  Schedule,
  ModalPdf,
} from '../screens';

const Home = () => {
  const {toggleModals, modalVisibility, signOut} = useContext(AuthContext);
  const {container, tableView, buttonContainer, buttonFlexStyle} = styles;
  const uri =
    'https://sks.deu.edu.tr/wp-content/uploads/2021/10/11KASIM-AYI-YEMEK-KALORISI-1.pdf';

  return (
    <SafeAreaView style={container}>
      {TopBar('Hoşgeldiniz')}
      <View style={tableView}>{infoTable()}</View>

      <View style={buttonContainer}>
        <View style={buttonFlexStyle}>
          {homeButton('calendar', 'Akademik Takvim')}
          {homeButton('calendar-remove', 'Devamsizlik', renderPdf)}
          {homeButton('calendar-check', 'Ders Programi', Schedule)}
        </View>

        <View style={buttonFlexStyle}>
          {homeButton('food', 'Yemek Menusu')}
          {homeButton('message-draw', 'Mesajlar', LoadingScreen)}
          {homeButton('alpha-a-box', 'Not Bilgisi', LessonResultScreen)}
        </View>
        <Button onPress={() => signOut()} title={'qeqweqw'} />
        <Modal
          hideModalContentWhileAnimating={true}
          isVisible={modalVisibility.isModalVisible}
          backdropOpacity={0.6}
          onBackdropPress={toggleModals.toggleModal}>
          <View style={{...LAYOUT.setFlex1, ...LAYOUT.justifyCenter}}>
            {ModalPdf({uri}, 'Yemek Menusu', toggleModals.toggleModal)}
          </View>
        </Modal>

        <Modal
          hideModalContentWhileAnimating={true}
          isVisible={modalVisibility.isModalVisible3}
          backdropOpacity={0.6}
          onBackdropPress={toggleModals.toggleModal3}>
          <View style={{...LAYOUT.setFlex1, ...LAYOUT.justifyCenter}}>
            {ModalPdf(
              {
                uri: 'https://ogrenci.deu.edu.tr/wp-content/uploads/2021/08/2021-2022-Akademik-Takvim.pdf',
              },
              'Akademik Takvim',
              toggleModals.toggleModal3,
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
