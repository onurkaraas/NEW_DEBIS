import React, {useContext} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {AuthContext} from '../context/AuthContext';

import {COLORS, LAYOUT} from '../constants/theme';
import Modal from 'react-native-modal';
import PdfFunc from './pdfScreens/PdfFunc';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TopBar, infoTable, homeButton} from '../components';
import Schedule from './Schedule';
import ModalPdf from './pdfScreens/ModalPdf';
import LessonResultScreen from './LessonResultScreen';
import LoadingScreen from './LoadingScreen';
import TranscriptScreen from './TranscriptScreen';

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
