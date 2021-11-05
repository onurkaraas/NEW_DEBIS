import React from 'react';

import {View} from 'react-native';
import PdfFunc from './PdfFunc';

const MealMenu = () => {
  const uri =
    'https://sks.deu.edu.tr/wp-content/uploads/2021/10/11KASIM-AYI-YEMEK-KALORISI-1.pdf';

  return <View style={{flex: 1}}>{PdfFunc({uri}, 'Yemek Menusu')}</View>;
};

export default MealMenu;
