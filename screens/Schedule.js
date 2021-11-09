import React, {useEffect, useState} from 'react';

import {ScrollView, Text, View} from 'react-native';
import {TopBar} from '../components';
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
          'https://debis.deu.edu.tr/OgrenciIsleri/Ogrenci/OgrenciHarc/index.php',
        )

        .end((err, res) => {
          console.log(res.text);
        });

      const exp = schedule.text;
      const $ = cheerio.load(exp);
      const hours = $('option:nth-child(1)');
      console.log(hours.text());
    })();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: COLORS.primary}}>
      {TopBar('Ders Programı')}
      <ScrollView style={{flex: 1}}>
        <Text style={{color: 'white'}}>{c}</Text>
      </ScrollView>
    </View>
  );
};

export default Schedule;
