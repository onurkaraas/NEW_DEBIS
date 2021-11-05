import React from 'react';

import {View} from 'react-native';
import PdfFunc from './PdfFunc';

const VeganMenu = () => {
  const uri =
    'https://sks.deu.edu.tr/wp-content/uploads/2021/10/VEGAN-11KASIM-AYI-YEMEK-KALORISI.pdf';

  return <View style={{flex: 1}}>{PdfFunc({uri}, 'Vegan Menu')}</View>;
};

export default VeganMenu;
