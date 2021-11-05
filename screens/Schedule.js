import React, {useEffect, useState} from 'react';

import {ScrollView, Text, View} from 'react-native';
import TopBar from '../topBar';
import {COLORS} from '../constants/theme';
const cheerio = require('cheerio');
const request = require('superagent');
const superagent = request.agent();
const Schedule = () => {
  const [c, setC] = useState('');
  useEffect(() => {
    (async () => {
      let schedule = await superagent
        .get(
          'https://debis.deu.edu.tr/OgrenciIsleri/Ogrenci/DersProgrami/index.php',
        )
        .end(async (err, res) => {
          if (err) {
            console.log(err, 'ERRRRRRORRRRRRRRRRRRRRRRRRR');
          }

          const $ = cheerio.load(res.text);
          const hours = $(
            'body > table:nth-child(4) > tbody > tr:nth-child(2) > td:nth-child(2) > table:nth-child(4) > tbody > tr:nth-child(2)',
          );
        });
    })();
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: COLORS.primary}}>
      {TopBar('Ders Programı')}
      <ScrollView style={{flex: 1}}>
        <Text>{c}</Text>
      </ScrollView>
    </View>
  );
};

export default Schedule;
