import React, {useState, useContext} from 'react';
import {Button, Switch, Input} from 'react-native-elements';
import {Text, View, Animated, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useKeyboard, useDimensions} from '@react-native-community/hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS, FONTS, LAYOUT, SHADOWS} from '../constants/theme';
import {AuthContext} from '../context/AuthContext';
import {TopBar} from '../components';

const LogInScreen = () => {
  const {signIn, saveUser, setSaveUser} = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const saveUserSwitch = () => setSaveUser(previousState => !previousState);
  const secureTextToggle = () => setSecureText(previousState => !previousState);
  const {width, height} = useDimensions().window;
  const keyboard = useKeyboard();

  return (
    <SafeAreaView style={styles.container}>
      {TopBar('Lütfen Giriş Yapınız')}
      <View style={{...LAYOUT.setFlex1, ...LAYOUT.alignCenter}}>
        <Animated.View style={{...LAYOUT.setFlex1, ...LAYOUT.justifyCenter}}>
          <FastImage
            style={{
              width: keyboard.keyboardShown ? width * 0.55 : width * 0.7,
              height: keyboard.keyboardShown ? width * 0.55 : width * 0.7,
            }}
            source={{
              uri: 'https://cdn.freelogovectors.net/wp-content/uploads/2020/03/Dokuz_Eylul_Universitesi_Logo.png',
              priority: FastImage.priority.normal,
            }}
            resizeMode={'stretch'}
          />
        </Animated.View>

        <View style={styles.inputContainer}>
          <Input
            onChangeText={setUsername}
            defaultValue={username}
            value={username}
            inputStyle={{color: COLORS.white}}
            inputContainerStyle={styles.inputContainerStyle}
            containerStyle={{
              marginBottom: 8,
              borderRadius: 12,
              ...SHADOWS.input,
              backgroundColor: COLORS.primary,
              height: keyboard.keyboardShown ? height * 0.1 : height * 0.095,
              width: keyboard.keyboardShown ? width * 0.95 : width * 0.925,
            }}
            style={{
              height: keyboard.keyboardShown ? height * 0.1 : height * 0.095,
              width: keyboard.keyboardShown ? width * 0.95 : width * 0.925,
              flex: 1,
              borderRadius: 12,
              padding: 8,
              ...FONTS.body3,
            }}
            leftIcon={
              <View style={styles.inputUsernameIcon}>
                <MaterialCommunityIcons
                  name={'account'}
                  color={COLORS.yellow}
                  size={30}
                />
              </View>
            }
            placeholder="Kullanıcı Adınız"
          />
          <Input
            value={password}
            onChangeText={setPassword}
            defaultValue={password}
            inputContainerStyle={styles.inputContainerStyle}
            containerStyle={{
              marginBottom: keyboard.keyboardShown ? 8 : 16,
              ...SHADOWS.input,
              borderRadius: 12,
              height: keyboard.keyboardShown ? height * 0.1 : height * 0.095,
              width: keyboard.keyboardShown ? width * 0.95 : width * 0.925,
              backgroundColor: COLORS.primary,
            }}
            style={{
              height: keyboard.keyboardShown ? height * 0.095 : height * 0.1,
              width: keyboard.keyboardShown ? width * 0.925 : width * 0.95,
              flex: 1,
              borderRadius: 12,
              padding: 8,
              ...FONTS.body3,
            }}
            leftIcon={
              <View style={styles.inputPasswordIcon}>
                <MaterialCommunityIcons
                  name={'lock'}
                  color={COLORS.red}
                  size={30}
                />
              </View>
            }
            rightIcon={
              <TouchableOpacity onPress={secureTextToggle}>
                <MaterialCommunityIcons
                  style={{marginRight: 8}}
                  name={'eye'}
                  color={COLORS.secondary}
                  size={32}
                />
              </TouchableOpacity>
            }
            secureTextEntry={secureText}
            placeholder="*******"
            inputStyle={{color: COLORS.white}}
          />
          <View
            style={{
              marginTop: 10,
              alignItems: 'center',
            }}>
            <View>
              <Button
                title={'Giriş Yap'}
                buttonStyle={{
                  backgroundColor: COLORS.green,
                  borderRadius: 10,
                  height: height * 0.07,
                  width: width * 0.7,
                }}
                titleStyle={{
                  ...FONTS.h2,
                  fontWeight: 'bold',
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
              <Text style={styles.saveText}>Beni Hatırla</Text>
              <Switch
                style={{transform: [{scaleX: 1.4}, {scaleY: 1.4}]}}
                value={saveUser}
                color={COLORS.green2}
                onValueChange={saveUserSwitch}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: COLORS.primary},
  inputContainer: {flex: 1, flexDirection: 'column'},
  inputContainerStyle: {
    borderBottomWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputUsernameIcon: {
    backgroundColor: '#625B39',
    height: 48,
    width: 38,
    flexDirection: 'column',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputPasswordIcon: {
    backgroundColor: '#623A42',
    height: 48,
    width: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveText: {
    color: COLORS.white,
    ...FONTS.body3,
    fontWeight: 'bold',
    marginRight: 12,
  },
});

export default LogInScreen;
