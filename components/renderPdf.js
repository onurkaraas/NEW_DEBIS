import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import Pdf from 'react-native-pdf';
import {COLORS} from '../constants/theme';
import {TopBar} from './index';

const RenderPdf = (uri, head) => {
  const [source, setSource] = useState({});

  useEffect(() => {
    const source = {cache: false, ...uri};
    setSource(source);
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

export default RenderPdf;
