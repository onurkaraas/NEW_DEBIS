import React, {useEffect, useState} from 'react';

import {StyleSheet, View} from 'react-native';

import {Dimensions} from 'react-native';

import Pdf from 'react-native-pdf';
import {COLORS} from '../constants/theme';
import TopBar from '../topBar';

const PdfFunc = (uri, head) => {
  const [source, setSource] = useState({});

  useEffect(() => {
    const sour = {cache: false, ...uri};
    setSource(sour);
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: COLORS.primary, borderRadius: 25}}>
      {TopBar(head)}
      <View style={styles.container}>
        <Pdf fitWidth={true} source={source} style={styles.pdf} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
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
  },
});

export default PdfFunc;
