import React from 'react';

import {View} from 'react-native';
import RenderPdf from '../../components/renderPdf';

const MealMenu = () => {
  const uri =
    'https://sks.deu.edu.tr/wp-content/uploads/2021/10/11KASIM-AYI-YEMEK-KALORISI-1.pdf';

  return <View style={{flex: 1}}>{RenderPdf({uri}, 'Yemek Menusu')}</View>;
};

export default MealMenu;
