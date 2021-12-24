import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Dimensions, Text} from 'react-native';
import Pdf from 'react-native-pdf';
import {COLORS, FONTS} from '../constants/theme';
import {screenTopBar} from './index';
import {IconButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useDimensions, useKeyboard} from '@react-native-community/hooks';

const renderPdf = (uri, head) => {
  const [source, setSource] = useState({});
  const navigation = useNavigation();
  const {width, height} = useDimensions().window;
  const keyboard = useKeyboard();

  const {container, pdf} = styles;
  useEffect(() => {
    const source = {cache: false, ...uri};
    setSource(source);
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: COLORS.primary, borderRadius: 25}}>
      {screenTopBar('Transkript')}
      <View style={container}>
        <Pdf fitWidth={true} source={source} style={pdf} />
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

export default renderPdf;
