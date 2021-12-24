import React, {useEffect, useState} from 'react';

import {ScrollView, Text, View} from 'react-native';
import {screenTopBar, TopBar} from '../components';
import {COLORS} from '../constants/theme';
const cheerio = require('cheerio');
const request = require('superagent');
const superagent = request.agent();
const Schedule = () => {
  useEffect(() => {
    (async () => {
      await superagent
        .post(
          'https://debis.deu.edu.tr/OgrenciIsleri/Ogrenci/DersProgrami/index.php',
        )
        .send({
          ogretim_donemi_id: '283',
          hafta: '29%2F11%2F2021-04%2F12%2F2021',
        })  .set('Content-Type', 'application/x-www-form-urlencoded')

        .end(async (err, res) => {
          // console.log(err);
          const exp = await res.text;
          const $$ = await  cheerio.load(exp);
          const reso = [];
          const hours = await $$(
            'body',
          );

        await  console.log(exp);
          $$(hours).each((index, element) => {
            const tds = $$(element).find('table tbody tr td ');
            //3 4 5
            const ress = $$(tds[0]).text();

            reso.push(ress);
          });
        });
    })();
  }, []);

  // parse HTML

  return (
    <View style={{flex: 1, backgroundColor: COLORS.primary}}>
      {screenTopBar('Ders Programı')}
      <ScrollView style={{flex: 1}}>
        <Text style={{color: 'white'}}>qwe</Text>
      </ScrollView>
    </View>
  );
};

export default Schedule;
