import React, {useState, useEffect, useRef, useLayoutEffect} from 'react';
import {Text, FlatList, View, useWindowDimensions} from 'react-native';
import {COLORS, FONTS} from '../constants/theme';
import {TouchableOpacity} from 'react-native-gesture-handler';
import User from '../dataScrapping/mod';

const superagent = require('superagent').agent();
const cheerio = require('react-native-cheerio');
const Classes = (id, id1) => {
  const window = useWindowDimensions();

  const [databases, setDatabases] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [press, setTimesPressed] = useState('');
  useLayoutEffect(() => {
    (async function asd() {
      await superagent
        .post(
          'https://debis.deu.edu.tr/OgrenciIsleri/Ogrenci/OgrenciNotu/index.php',
        )
        .send({
          ogretim_donemi_id: id,
        })
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .end(async (err, res) => {
          if (err) {
            console.log(err, 'ERRRRRRORRRRRRRRRRRRRRRRRRR');
          }
          const pickSemesterData = await res.text;
          const $ = await cheerio.load(`${pickSemesterData}`);
          const classValue = await $("select[id='ders'] > option");
          let lessonsObj = [];
          const values = [];
          for (let i = 1; i < classValue.length; i++) {
            let item = classValue.eq(i);
            let lessonCode = item.text().slice(0, 8).trim();
            let title = item.text().slice(8).trim();
            let value = item.attr('value');

            lessonsObj.push({
              value,
              lessonCode,
              title,
            });
            values.push(value);
            setDatabases(lessonsObj);
            setClicked(true);
          }
        });
    })();

    // console.log(databases);
  }, [id, id1]);

  const Item = ({title, value, code}) => (
    <TouchableOpacity onPress={() => setTimesPressed(value)}>
      <View
        style={{
          borderWidth: 0,
          backgroundColor: COLORS.secondary,
          borderRadius: 25,
          marginHorizontal: 12,
          marginBottom: 18,
          paddingVertical: 18,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  color: COLORS.red,
                  ...FONTS.body3,
                  marginBottom: 6,
                }}>
                {code}
              </Text>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.body3,
                  textAlign: 'center',
                }}>
                {title}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
  const renderItem = ({item}) => (
    <Item code={item.lessonCode} title={item.title} value={item.value} />
  );

  return (
    <View style={{marginBottom: window.height * 0.1}}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={databases}
        renderItem={renderItem}
        keyExtractor={item => item.value}
      />
      {User(`${press}`, `${id1}`)}
    </View>
  );
};

export default Classes;
