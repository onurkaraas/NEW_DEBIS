import React, {useState, useEffect, useContext} from 'react';
import {Text, FlatList, View, RefreshControl, StyleSheet} from 'react-native';
import {COLORS, FONTS, LAYOUT} from '../constants/theme';
import {TouchableOpacity} from 'react-native-gesture-handler';
import resultModal from './resultModal';
import {AuthContext} from '../context/AuthContext';

const superagent = require('superagent').agent();
const cheerio = require('cheerio');

const Classes = id => {
  const [refreshing, setRefreshing] = useState(false);
  const [database, setDatabase] = useState([]);
  const {toggleModal2} = useContext(AuthContext);
  const [press, setTimesPressed] = useState('');

  const refresh = () => {
    setRefreshing(!refreshing);
  };
  useEffect(() => {
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
            console.log(err, 'Error while get lessons');
          }
          const pickSemesterData = await res.text;
          const $ = await cheerio.load(`${pickSemesterData}`);
          const classValue = await $("select[id='ders'] > option");
          let lessonsObj = [];
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
            setDatabase(lessonsObj);
          }
        });
    })();
    return setRefreshing(false);
  }, [id, refreshing]);
  const clicked = value => {
    toggleModal2();
    setTimesPressed(value);
  };
  const Item = ({title, value, code}) => (
    <TouchableOpacity onPress={() => clicked(value)}>
      <View style={styles.container}>
        <View style={styles.flexDirectionColumn}>
          <View style={LAYOUT.alignCenter}>
            <Text style={styles.codeTextStyle}>{code}</Text>
            <Text style={styles.titleStyle}>{title}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
  const renderItem = ({item}) => (
    <Item code={item.lessonCode} title={item.title} value={item.value} />
  );

  return (
    <View style={LAYOUT.marginBottomNavigator}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={database}
        renderItem={renderItem}
        keyExtractor={item => item.value}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
      />
      {resultModal(`${press}`, `${id}`)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.secondary,
    borderRadius: 25,
    marginHorizontal: 12,
    marginBottom: 18,
    paddingVertical: 18,
    justifyContent: 'center',
  },
  flexDirectionColumn: {
    flexDirection: 'column',
  },
  codeTextStyle: {
    color: COLORS.red,
    ...FONTS.body3,
    marginBottom: 6,
  },
  titleStyle: {
    color: COLORS.white,
    ...FONTS.body3,
    textAlign: 'center',
  },
});
export default Classes;
