import React, {useState, useEffect, useContext} from 'react';
import {Text, FlatList, View, RefreshControl, StyleSheet} from 'react-native';
import {COLORS, FONTS, LAYOUT} from '../../constants/theme';
import {TouchableOpacity} from 'react-native-gesture-handler';
import resultModal from './resultModal';
import {AuthContext} from '../../context/AuthContext';
import {useNavigation} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';

const superagent = require('superagent').agent();
const cheerio = require('cheerio');

const Classes = id => {
  const [refreshing, setRefreshing] = useState(false);
  const [database, setDatabase] = useState([]);
  const {toggleModals, states} = useContext(AuthContext);
  const [selectedClass, setSelectedClass] = useState('');
  const navigation = useNavigation();

  const {container, flexDirectionColumn, codeTextStyle, titleStyle} = styles;
  const refresh = () => {
    setRefreshing(!refreshing);
  };
  useEffect(() => {
    states.auth
      ? (async () => {
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
                showMessage({
                  message: 'Hata',
                  description: 'Beklenmedik bir hata oluştu.',
                  type: 'danger',
                });
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
        })()
      : navigation.navigate('LogInScreen');

    return setRefreshing(false);
  }, [id, refreshing]);
  const clicked = value => {
    toggleModals.toggleModalLessonResult();
    setSelectedClass(value);
  };
  const Item = ({title, value, code}) => (
    <TouchableOpacity onPress={() => clicked(value)}>
      <View style={container}>
        <View style={flexDirectionColumn}>
          <View style={LAYOUT.alignCenter}>
            <Text style={codeTextStyle}>{code}</Text>
            <Text style={titleStyle}>{title}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
  const renderItem = ({item}) => (
    <Item code={item.lessonCode} title={item.title} value={item.value} />
  );

  return (
    <View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={database}
        renderItem={renderItem}
        keyExtractor={item => item.value}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
      />
      {resultModal(`${selectedClass}`, `${id}`)}
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
