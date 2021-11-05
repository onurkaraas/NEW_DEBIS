import React, {useContext, useEffect, useState} from 'react';

import {
  Button,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';

import {Dimensions} from 'react-native';

import Pdf from 'react-native-pdf';
import {COLORS, FONTS} from '../constants/theme';
import TopBar from '../topBar';
import {AuthContext} from '../context/AuthContext';

const ModalPdf = (uri, head) => {
  const [source, setSource] = useState({});
  const {toggleModal} = useContext(AuthContext);
  useEffect(() => {
    const sour = {cache: false, ...uri};
    setSource(sour);
  }, []);

  return (
    <View style={{flex: 0.65}}>
      <View style={styles.container}>
        <View style={{width: '100%', alignItems: 'center'}}>
          <View style={{marginBottom:12}}>
            <Text
              style={{
                ...FONTS.h1,
                color: COLORS.green,
                fontWeight: '800',
                textAlign: 'center',
              }}>
              Yemek Menusu
            </Text>
          </View>
        </View>
        <Pdf fitWidth={true} source={source} style={styles.pdf} />
        <TouchableOpacity
          onPress={toggleModal}
          style={{
            alignItems: 'center',
            height: 50,
            width: 50,
            borderRadius: 100,
            borderWidth: 2,
            borderColor: COLORS.red,
            justifyContent: 'center',
            backgroundColor: COLORS.primary,
            marginTop: 12,
          }}>
          <Text
            style={{
              ...FONTS.h2,
              color: COLORS.red,
              fontWeight: '800',
              textAlign: 'center',
            }}>
            X
          </Text>
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
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width * 0.98,
    height: Dimensions.get('window').height,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    borderWidth: 2,
    borderColor: COLORS.green,
  },
});

export default ModalPdf;
