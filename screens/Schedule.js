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
        .post('https://online.deu.edu.tr/portal/xlogin')
        .send({
          eid: '2015469025@ogr.deu.edu.tr',
          pw: '080103003On',
          submit: 'Giriş'
        }).set('Content-Type', 'application/x-www-form-urlencoded')

        .end((err, res) => {
          console.log(res);
          console.log(err);


        });

      const exp = schedule.text;
      const $ = cheerio.load(exp);
      const hours = $('option:nth-child(1)');
      console.log(exp);
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
