import React, {useContext, useEffect, useReducer} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDimensions} from '@react-native-community/hooks';
import {showMessage} from 'react-native-flash-message';
import {COLORS, FONTS, LAYOUT} from '../../constants/theme';
import Modal from 'react-native-modal';
import {Col, Row, Table, TableWrapper} from 'react-native-table-component';
import {AuthContext} from '../../context/AuthContext';

const cheerio = require('cheerio');
const request = require('superagent');
const superagent = request.agent();

const ACTIONS = {
  CALL_API: 'call-api',
  SUCCESS: 'success',
  ERROR: 'error',
};

const userDetailsReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.CALL_API: {
      return {
        loading: true,
      };
    }
    case ACTIONS.SUCCESS: {
      return {
        ...state,
        datas: action.data,
        result: action.res,
        name: action.name,
        loading: false,
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
        datas: [''],
      };
    }
  }
};

const initialState = {
  datas: [''],
  tableHead: ['Sinav', 'Sinif Ort.', 'ORT2*', 'Notunuz'],
  result: '',
  name: '',
  loading: null,
  error: null,
};

const resultModal = (selectClass, id) => {
  const [state, dispatch] = useReducer(userDetailsReducer, initialState);
  const {datas, tableHead, result, name, loading} = state;
  const {modalVisibility, toggleModals} = useContext(AuthContext);
  const {width, height} = useDimensions().window;
  const visible = () => {
    toggleModals.toggleModalLessonResult();
    dispatch({type: ACTIONS.DONE});
  };

  const resultModals = async () => {
    await dispatch({type: ACTIONS.CALL_API});

    await superagent
      .post(
        'https://debis.deu.edu.tr/OgrenciIsleri/Ogrenci/OgrenciNotu/index.php',
      )
      .send({
        ders: selectClass,
        ogretim_donemi_id: id,
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
          const examName = $$$(tds[0]).text();
          const listingDate = $$$(tds[1]).text();
          const classAverage = $$$(tds[2]).text();
          const finalAverage = $$$(tds[3]).text();
          const studentResult = $$$(tds[4]).text();
          examNames.push(examName);
          classAverages.push(classAverage);
          finalAverages.push(finalAverage);
          studentResults.push(studentResult);
        });
        $$$(lessonName).each((index, element) => {
          const tds = $$$(element).find('td');
          const lessonNameee = $$$(tds[0]).text();
          lessonsNames.push(lessonNameee);
        });
        $$$(result).each((index, element) => {
          const tds = $$$(element);
          const ress = $$$(tds[0]).text();
          reso.push(ress);
        });
        dispatch({
          type: ACTIONS.SUCCESS,
          data: [examNames, classAverages, finalAverages, studentResults, reso],
          res: reso,
          name: lessonsNames,
        });
      });
  };
  useEffect(() => {
    if (selectClass.length !== 0) {
      resultModals();
    }
    dispatch({type: ACTIONS.DONE});
  }, [selectClass]);

  const modalStyles = {
    colStyle: {
      marginBottom: 6,
      width: width * 0.2,
      height: height * (datas[0].length * 0.06),
    },
    tableView: {
      width: width * 0.9,
      height:
        datas[0].length === 0
          ? height * 0.5
          : datas[0].length <= 4
          ? height * (datas[0].length * 0.09)
          : height * (datas[0].length * 0.08),
      justifyContent: 'center',
    },
  };
  const {
    container,
    head,
    headName,
    wrapper,
    text,
    textNames,
    text1,
    text2,
    modalView,
    modalGreen,
    modalRed,
    openButton,
    buttonGreen,
    buttonRed,
    textStyle,
    textGreen,
    textRed,
  } = styles;

  return (
    <View style={{flex: 1}}>
      {loading ? (
        <View style={{...LAYOUT.setFlex1, ...LAYOUT.justifyCenter}}>
          <Modal
            useNativeDriver={true}
            hideModalContentWhileAnimating={true}
            useNativeDriverForBackdrop={true}
            backdropOpacity={0.4}
            isVisible={true}>
            <ActivityIndicator color={'red'} size={'large'} />
          </Modal>
        </View>
      ) : modalVisibility.isModalVisible2 ? (
        <Modal
          useNativeDriver={true}
          useNativeDriverForBackdrop={true}
          hideModalContentWhileAnimating={true}
          backdropOpacity={0.4}
          onBackdropPress={toggleModals.toggleModalLessonResult}
          isVisible={modalVisibility.isModalVisible2}>
          <View>
            <View
              style={[
                modalView,
                result[0] === 'BAŞARISIZ'
                  ? modalRed
                  : result[0] === 'BAŞARILI'
                  ? modalGreen
                  : modalView,
              ]}>
              <View style={container}>
                <View style={modalStyles.tableView}>
                  <Table
                    borderStyle={{
                      borderBottomWidth: 1,
                      borderColor: '#c8e1ff',
                    }}>
                    <Row
                      data={name}
                      style={headName}
                      textStyle={[
                        text2,
                        result[0] === 'BAŞARISIZ'
                          ? textRed
                          : result[0] === 'BAŞARILI'
                          ? textGreen
                          : text2,
                      ]}
                    />
                    <Row data={tableHead} style={head} textStyle={text} />
                    <TableWrapper
                      style={{
                        ...wrapper,
                      }}>
                      <Col
                        data={datas[0]}
                        style={modalStyles.colStyle}
                        textStyle={textNames}
                      />
                      <Col
                        data={datas[2]}
                        style={modalStyles.colStyle}
                        textStyle={text}
                      />
                      <Col
                        data={datas[1]}
                        style={modalStyles.colStyle}
                        textStyle={text}
                      />

                      <Col
                        data={datas[3]}
                        style={modalStyles.colStyle}
                        textStyle={text1}
                      />
                    </TableWrapper>
                  </Table>
                </View>
              </View>
            </View>
            <View style={LAYOUT.alignCenter}>
              <TouchableOpacity
                style={[
                  openButton,
                  result[0] === 'BAŞARISIZ' ? buttonRed : buttonGreen,
                ]}
                onPress={visible}>
                <Text
                  style={[
                    textStyle,
                    result[0] === 'BAŞARISIZ'
                      ? textRed
                      : result[0] === 'BAŞARILI'
                      ? textGreen
                      : textStyle,
                  ]}>
                  {result[0]}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2A3C44',
    textAlign: 'center',
    borderRadius: 25,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  head: {
    borderBottomWidth: 2,
    borderColor: 'white',
    padding: 12,
    marginBottom: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  headName: {
    borderBottomWidth: 2,
    borderColor: 'white',
    padding: 12,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },

  wrapper: {
    flexDirection: 'row',
    paddingHorizontal: 6,
  },

  text: {
    color: 'white',
    ...FONTS.body4,
    marginHorizontal: 8,
    textAlign: 'center',
  },
  textNames: {
    color: 'white',
    ...FONTS.body4,
    marginHorizontal: 2,
    textAlign: 'center',
    fontWeight: '800',
    borderBottomColor: 'white',
    borderBottomWidth: 0.5,
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
    ...FONTS.h3,
    fontSize: 20,
    marginHorizontal: 4,
    fontWeight: 'bold',
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
    justifyContent: 'center',
  },
  modalGreen: {
    backgroundColor: COLORS.green,
  },
  modalRed: {
    backgroundColor: COLORS.red,
  },
  openButton: {
    width: Dimensions.get('window').width * 0.5,
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
export default resultModal;
