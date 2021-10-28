// user component using useReducer
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useReducer,
  useState,
} from 'react';
const cheerio = require('react-native-cheerio');
const request = require('superagent');
const superagent = request.agent();
import {showMessage} from 'react-native-flash-message';
import {COLORS, FONTS} from '../constants/theme';
import Modal from 'react-native-modal';
import {Col, Row, Table, TableWrapper} from 'react-native-table-component';

const ACTIONS = {
  CALL_API: 'call-api',
  SUCCESS: 'success',
  ERROR: 'error',
};

const userDetailsReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.CALL_API: {
      return {
        ...state,
        loading: true,
      };
    }
    case ACTIONS.SUCCESS: {
      return {
        ...state,
        loading: false,
        modalVisible: action.x,
        datas: action.data,
      };
    }
    case ACTIONS.ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case ACTIONS.DONE: {
      return {
        ...state,
        loading: false,
        datas: [''],
      };
    }
  }
};

const initialState = {
  datas: [''],
  tableHead: ['Sinav', 'Sinif Ort.', 'ORT2*', 'Notunuz'],
  loading: false,
  error: null,
  modalVisible: false,
};

const User = (presse, id1) => {
  const [state, dispatch] = useReducer(userDetailsReducer, initialState);
  const {datas, loading, error, modalVisible, tableHead} = state;
  const window = useWindowDimensions();

  useLayoutEffect(() => {
    console.log(presse);

    if (presse.length === 0) {
    } else {
      (async () => {
        await dispatch({type: ACTIONS.CALL_API});

        await superagent
          .post(
            'https://debis.deu.edu.tr/OgrenciIsleri/Ogrenci/OgrenciNotu/index.php',
          )
          .send({
            ders: presse,
            ogretim_donemi_id: id1,
          })
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .end((err, res) => {
            if (err) {
              showMessage({
                type: 'danger',
                message: 'Debis Sisteminden Veri Alinirken Hata Olustu.',
              });
            }
            const pickLessonData = res.text;
            const $$$ = cheerio.load(pickLessonData);
            const result = $$$(
              'body > table:nth-child(4) > tbody > tr:nth-child(2) > td:nth-child(2) > table:nth-child(3) > tbody > tr:nth-child(3) > td > table:nth-child(1) > tbody > tr:nth-child(4) > td > b',
            );
            const lessons = $$$(
              'body > table:nth-child(4) > tbody > tr:nth-child(2) > td:nth-child(2) > table:nth-child(3) > tbody > tr:nth-child(3) > td > table:nth-child(1) > tbody > tr:nth-child(3) > td:nth-child(2) > table > tbody > tr',
            );
            const lessonName = $$$(
              'body > table:nth-child(4) > tbody > tr:nth-child(2) > td:nth-child(2) > table:nth-child(3) > tbody > tr:nth-child(3) > td > table:nth-child(1) > tbody > tr:nth-child(1)',
            );
            const reso = [];
            const examNames = [];
            const classAverages = [];
            const finalAverages = [];
            const studentResults = [];
            const lessonsNames = [];

            const scrapeLessons = $$$(lessons).each((index, element) => {
              if (index === 0) return true;
              const tds = $$$(element).find('td');
              const examName = $$$(tds[0]).text().slice(0, 14);
              const listingDate = $$$(tds[1]).text();
              const classAverage = $$$(tds[2]).text();
              const finalAverage = $$$(tds[3]).text();
              const studentResult = $$$(tds[4]).text();
              examNames.push(examName);
              classAverages.push(classAverage);
              finalAverages.push(finalAverage);
              studentResults.push(studentResult);
            });
            const scrapeLessonNamee = $$$(lessonName).each((index, element) => {
              const tds = $$$(element).find('td');
              const lessonNameee = $$$(tds[0]).text();
              lessonsNames.push(lessonNameee);
            });
            const scrapeLessonNameee = $$$(result).each((index, element) => {
              const tds = $$$(element);
              const ress = $$$(tds[0]).text();
              reso.push(ress);
            });
            dispatch({
              type: ACTIONS.SUCCESS,
              data: [
                examNames,
                classAverages,
                finalAverages,
                studentResults,
                reso,
                lessonsNames,
              ],
              x: true,
            });
          });
      })();
    }

    return () => dispatch({type: ACTIONS.DONE});
  }, [presse, id1]);

  return (
    <View style={{flex: 1}}>
      {loading ? (
        <View style={{flex: 1}}>
          <ActivityIndicator size={'large'} color={'red'} />
        </View>
      ) : (
        <View>
          <Modal
            backdropOpacity={0.4}
            hideModalContentWhileAnimating={true}
            onBackdropPress={() => dispatch({type: ACTIONS.DONE})}
            isVisible={modalVisible}
            style={{textAlign: 'center', alignItems: 'center'}}>
            <View
              style={[
                styles.modalView,
                datas[4] === 'BAŞARISIZ'
                  ? {...styles.modalRed}
                  : datas[4] === 'BAŞARILI'
                  ? {...styles.modalGreen}
                  : {...styles.modalView},
              ]}>
              <View style={styles.container2}>
                <View
                  style={{
                    width: window.width * 0.9,
                    height: window.height * 0.57,
                    justifyContent: 'center',
                  }}>
                  <Table
                    borderStyle={{
                      borderBottomWidth: 1,
                      borderColor: '#c8e1ff',
                    }}>
                    <Row
                      data={datas[5]}
                      style={styles.head}
                      textStyle={[
                        styles.text2,
                        datas[4] === 'BAŞARISIZ'
                          ? {...styles.textRed}
                          : datas[4] === 'BAŞARILI'
                          ? {...styles.textGreen}
                          : {...styles.text2},
                      ]}
                    />
                    <Row
                      data={tableHead}
                      style={styles.head}
                      textStyle={styles.text}
                    />
                    <TableWrapper style={styles.wrapper}>
                      <Col
                        data={datas[0]}
                        style={{
                          width: window.width * 0.2,
                          height: window.height * 0.35,
                        }}
                        textStyle={styles.text}
                      />
                      <Col
                        data={datas[2]}
                        style={{
                          width: window.width * 0.2,
                          height: window.height * 0.35,
                        }}
                        textStyle={styles.text}
                      />
                      <Col
                        data={datas[1]}
                        style={{
                          width: window.width * 0.2,
                          height: window.height * 0.35,
                        }}
                        textStyle={styles.text}
                      />
                      <Col
                        data={datas[3]}
                        style={{
                          width: window.width * 0.2,
                          height: window.height * 0.35,
                        }}
                        textStyle={styles.text1}
                      />
                    </TableWrapper>
                  </Table>
                </View>
              </View>
            </View>
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                style={[
                  {
                    width: window.width * 0.5,
                    backgroundColor: '#fff',
                  },
                  styles.openButton,

                  datas[4] === 'BAŞARISIZ'
                    ? {...styles.buttonRed}
                    : datas[4] === 'BAŞARILI'
                    ? {...styles.buttonGreen}
                    : {...styles.openButton},
                ]}
                onPress={() => dispatch({type: ACTIONS.DONE})}>
                <Text
                  style={[
                    styles.textRed,
                    datas[4] === 'BAŞARISIZ'
                      ? {...styles.textRed}
                      : datas[4] === 'BAŞARILI'
                      ? {...styles.textGreen}
                      : {...styles.textStyle},
                  ]}>
                  {datas[4]}
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
  },

  container2: {
    backgroundColor: '#2A3C44',
    textAlign: 'center',
    borderRadius: 25,
    flexDirection: 'column',
  },
  head: {
    borderBottomWidth: 2,
    borderColor: 'white',
    padding: 12,
    borderRadius: 25,
  },

  wrapper: {
    flexDirection: 'row',
    paddingHorizontal: 6,
    height: 260,
  },

  text: {
    color: 'white',
    ...FONTS.body4,
    marginHorizontal: 4,
    marginVertical: 6,
    textAlign: 'center',
  },
  text1: {
    color: 'white',
    ...FONTS.body4,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text2: {
    color: 'white',
    ...FONTS.h2,
    fontSize: 20,
    marginHorizontal: 4,
    textAlign: 'center',
  },
  modalView: {
    backgroundColor: COLORS.gray,
    borderRadius: 25,
    padding: 8,
    alignItems: 'center',
    shadowColor: COLORS.secondary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalGreen: {
    backgroundColor: COLORS.green,
  },
  modalRed: {
    backgroundColor: COLORS.red,
  },
  openButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    marginTop: 10,
    elevation: 2,
    borderColor: COLORS.gray,
    borderWidth: 3,
  },
  buttonGreen: {
    borderColor: COLORS.green,
  },
  buttonRed: {
    borderColor: COLORS.red,
  },
  textStyle: {
    ...FONTS.body3,
    color: COLORS.gray,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textGreen: {
    color: COLORS.green,
  },
  textRed: {
    color: COLORS.red,
  },
});
export default User;
