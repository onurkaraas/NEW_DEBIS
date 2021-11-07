import React from 'react';

import {View} from 'react-native';
import PdfFunc from './pdfScreens/PdfFunc';

const TranscriptScreen = () => {
  const uri =
    'https://debis.deu.edu.tr/OgrenciIsleri/Rapor/ogrenci_bazli_listeler/en_yeni_transcript/transcript.php';

  return <View style={{flex: 1}}>{PdfFunc({uri}, 'Transcript')}</View>;
};

export default TranscriptScreen;
