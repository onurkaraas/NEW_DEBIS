import React, {useState, useEffect, useContext} from 'react';
import {Input} from 'react-native-elements';
import {
  Keyboard,
  Text,
  useWindowDimensions,
  View,
  Animated,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, FONTS} from '../constants/theme';
import FastImage from 'react-native-fast-image';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, Switch} from 'react-native-elements';
import {AuthContext} from '../context/AuthContext';
import {useKeyboard} from '@react-native-community/hooks';

import TopBar from '../topBar';
const LogInScreen = () => {
  const {signIn, signOut, saveUser, setSaveUser, auth} =
    useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const window = useWindowDimensions();
  const toggleSwitch = () => setSaveUser(previousState => !previousState);
  const keyboard = useKeyboard();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.primary}}>
      {TopBar('Lütfen Giriş Yapınız')}
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Animated.View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FastImage
            style={{
              width: keyboard.keyboardShown ? 200 : 300,
              height: keyboard.keyboardShown ? 200 : 300,
            }}
            source={{
              uri: 'https://cdn.freelogovectors.net/wp-content/uploads/2020/03/Dokuz_Eylul_Universitesi_Logo.png',
              priority: FastImage.priority.normal,
            }}
            resizeMode={'stretch'}
          />
        </Animated.View>

        <View style={{flex: 1, flexDirection: 'column'}}>
          <Input
            onChangeText={setUsername}
            defaultValue={username}
            value={username}
            inputStyle={{color: COLORS.white}}
            containerStyle={{
              marginBottom: 8,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },

              shadowOpacity: 0.27,
              shadowRadius: 12,
              borderRadius: 12,
              elevation: 5,
              height: keyboard.keyboardShown
                ? window.height * 0.1
                : window.height * 0.095,
              width: keyboard.keyboardShown
                ? window.width * 0.95
                : window.width * 0.925,
              backgroundColor: COLORS.primary,
            }}
            style={{
              height: keyboard.keyboardShown
                ? window.height * 0.1
                : window.height * 0.095,
              width: keyboard.keyboardShown
                ? window.width * 0.95
                : window.width * 0.925,
              flex: 1,
              borderRadius: 12,
              padding: 8,
              ...FONTS.body3,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            leftIcon={
              <View
                style={{
                  backgroundColor: '#625B39',
                  height: 48,
                  width: 38,
                  flexDirection: 'column',
                  borderRadius: 12,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <MaterialCommunityIcons
                  name={'account'}
                  color={COLORS.yellow}
                  size={30}
                />
              </View>
            }
            placeholder="Kullanıcı Adınız"
            inputContainerStyle={{
              borderBottomWidth: 0,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
          <Input
            value={password}
            onChangeText={setPassword}
            defaultValue={password}
            inputContainerStyle={{
              borderBottomWidth: 0,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            containerStyle={{
              marginBottom: keyboard.keyboardShown ? 8 : 16,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              height: keyboard.keyboardShown
                ? window.height * 0.1
                : window.height * 0.095,
              width: keyboard.keyboardShown
                ? window.width * 0.95
                : window.width * 0.925,
              shadowOpacity: 0.27,
              shadowRadius: 12,
              borderRadius: 12,
              elevation: 5,
              backgroundColor: COLORS.primary,
            }}
            style={{
              height: keyboard.keyboardShown
                ? window.height * 0.095
                : window.height * 0.1,
              width: keyboard.keyboardShown
                ? window.width * 0.925
                : window.width * 0.95,
              flex: 1,
              borderRadius: 12,
              padding: 8,
              ...FONTS.body3,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            leftIcon={
              <View
                style={{
                  backgroundColor: '#623A42',
                  height: 48,
                  width: 38,
                  borderRadius: 12,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <MaterialCommunityIcons
                  name={'lock'}
                  color={COLORS.red}
                  size={30}
                />
              </View>
            }
            rightIcon={
              <MaterialCommunityIcons
                style={{marginRight: 8}}
                name={'eye'}
                color={COLORS.secondary}
                size={30}
              />
            }
            placeholder="*******"
            inputStyle={{color: COLORS.white}}
          />

          <View
            style={{
              marginTop: 10,
              alignItems: 'center',
            }}>
            <View style={{justifyContent: 'center'}}>
              <Button
                title={'Giriş Yap'}
                buttonStyle={{
                  justifyContent: 'center',
                  backgroundColor: COLORS.green2,
                  height: keyboard.keyboardShown
                    ? window.height * 0.07
                    : window.height * 0.07,
                  width: keyboard.keyboardShown
                    ? window.width * 0.85
                    : window.width * 0.85,
                  borderRadius: 10,
                }}
                titleStyle={{
                  ...FONTS.h2,
                }}
                icon={
                  <MaterialCommunityIcons
                    name={'arrow-right'}
                    color={COLORS.white}
                    size={26}
                    style={{padding: 8}}
                  />
                }
                iconPosition={'right'}
                onPress={() => signIn({username, password})}
              />
            </View>
          </View>
          <View style={{alignItems: 'flex-end', padding: 12}}>
            <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.body3,
                  fontWeight: 'bold',
                  marginRight: 12,
                }}>
                Beni Hatirla
              </Text>
              <Switch
                style={{transform: [{scaleX: 1.4}, {scaleY: 1.4}]}}
                value={saveUser}
                color={COLORS.green2}
                onValueChange={toggleSwitch}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LogInScreen;
