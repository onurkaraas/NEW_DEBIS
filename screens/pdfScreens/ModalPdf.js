import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Dimensions} from 'react-native';
import Pdf from 'react-native-pdf';
import {COLORS, FONTS, LAYOUT} from '../../constants/theme';
import {AuthContext} from '../../context/AuthContext';

const ModalPdf = (uri, title, toggle) => {
  const [source, setSource] = useState({});
  const {toggleModal} = useContext(AuthContext);

  useEffect(() => {
    const sour = {cache: false, ...uri};
    setSource(sour);
  }, []);

  return (
    <View style={{flex: 0.65}}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <View style={{marginBottom: 12}}>
            <Text style={styles.headerTitle}>{title}</Text>
          </View>
        </View>
        <Pdf fitWidth={true} source={source} style={styles.pdf} />
        <TouchableOpacity onPress={toggle} style={styles.touchableStyle}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  headerTitle: {
    ...FONTS.h1,
    color: COLORS.green,
    fontWeight: '800',
    textAlign: 'center',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width * 0.98,
    height: Dimensions.get('window').height,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    borderWidth: 2,
    borderColor: COLORS.green,
  },
  touchableStyle: {
    alignItems: 'center',
    height: 50,
    width: 50,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: COLORS.red,
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    marginTop: 12,
  },
  closeButtonText: {
    ...FONTS.h2,
    color: COLORS.red,
    fontWeight: '800',
    textAlign: 'center',
  },
  titleContainer: {width: '100%', ...LAYOUT.alignCenter},
});

export default ModalPdf;
