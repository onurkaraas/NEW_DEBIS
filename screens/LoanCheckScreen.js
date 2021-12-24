import React, {useEffect, useState} from 'react';

import {ScrollView, Text, View} from 'react-native';
import {screenTopBar, TopBar} from '../components';
import {COLORS} from '../constants/theme';
const cheerio = require('cheerio');
const request = require('superagent');
const superagent = request.agent();
const LoanCheckScreen = () => {
  useEffect(() => {
    (async () => {
      const gett = await superagent
        .post('https://pos.deu.edu.tr/page/login.php')
        .send({
          kullanici_posta: 'onur.karaas',
          kullanici_parola: '080103003On',
          kullanici_tip: 'O',
        })
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .end(async function x() {
          await superagent
            .get('https://pos.deu.edu.tr/page/index.php')
            .set('Content-Type', 'application/javascript');
        })
        .end(async function x() {
          await superagent
            .get(
              'https://pos.deu.edu.tr/app-assets/vendors/css/ui/prism.min.css',
            )
            .set('Content-Type', 'application/javascript');
        })
        .end(async function x() {
          await superagent
            .get(
              'https://pos.deu.edu.tr/app-assets/js/core/libraries/jquery.min.js',
            )
            .set('Content-Type', 'application/javascript');
        })
        .end(async function x() {
          await superagent
            .get(
              'https://pos.deu.edu.tr/app-assets/vendors/js/ui/tether.min.js',
            )
            .set('Content-Type', 'application/javascript');
        })
        .end(async function x() {
          await superagent
            .get(
              'https://pos.deu.edu.tr/app-assets/js/core/libraries/bootstrap.min.js',
            )
            .set('Content-Type', 'application/javascript');
        })
        .end(async function x() {
          await superagent.get(
            'https://pos.deu.edu.tr/app-assets/vendors/js/ui/perfect-scrollbar.jquery.min.js',
          );
        })
        .end(async function x() {
          await superagent
            .get(
              'https://pos.deu.edu.tr/app-assets/vendors/js/ui/unison.min.js',
            )
            .set('Content-Type', 'application/javascript');
        })
        .end(async function x() {
          await superagent
            .get(
              'https://pos.deu.edu.tr/app-assets/vendors/js/ui/blockUI.min.js',
            )
            .set('Content-Type', 'application/javascript');
        })
        .end(async function x() {
          await superagent
            .get(
              'https://pos.deu.edu.tr/app-assets/vendors/js/ui/jquery.matchHeight-min.js',
            )
            .set('Content-Type', 'application/javascript');
        })
        .end(async function x() {
          await superagent
            .get(
              'https://pos.deu.edu.tr/app-assets/vendors/js/ui/screenfull.min.js',
            )
            .set('Content-Type', 'application/javascript');
        })
        .end(async function x() {
          await superagent
            .get(
              'https://pos.deu.edu.tr/app-assets/vendors/js/extensions/pace.min.js',
            )
            .set('Content-Type', 'application/javascript');
        })
        .end(async function x() {
          await superagent
            .get('https://pos.deu.edu.tr/app-assets/vendors/js/ui/prism.min.js')
            .set('Content-Type', 'application/javascript');
        })
        .end(async function x() {
          await superagent
            .get('https://pos.deu.edu.tr/app-assets/js/core/app-menu.js')
            .set('Content-Type', 'application/javascript');
        })

        .end(async function x() {
          await superagent
            .get('https://pos.deu.edu.tr/app-assets/js/core/app.js')
            .set('Content-Type', 'application/javascript');
        })
        .end(async function x() {
          await superagent
            .get('https://pos.deu.edu.tr/app-assets/js/core/app-menu.js')
            .set('Content-Type', 'application/javascript');
        })
        .end((err, res) => {
          // console.log(err);
          const exp = res.text;

          const $$ = cheerio.load(exp);
          const reso = [];
          const hours = $$('body');
          console.log(exp);
        });

      const www = gett.text;
      console.log(www);
    })();
  }, []);

  // parse HTML

  return (
    <View style={{flex: 1, backgroundColor: COLORS.primary}}>
      {screenTopBar('Harç Borç Sorgulama')}
      <ScrollView style={{flex: 1}}>
        <Text style={{color: 'white'}}>qwe</Text>
      </ScrollView>
    </View>
  );
};

export default LoanCheckScreen;
