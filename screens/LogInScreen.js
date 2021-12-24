import React, {useState, useContext, useRef, useEffect} from 'react';
import {Button, Switch, Input} from 'react-native-elements';
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform, Dimensions,
} from 'react-native';
import Animated, {
  Easing,

  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import {TouchableOpacity} from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useKeyboard, useDimensions} from '@react-native-community/hooks';
import {COLORS, FONTS, LAYOUT, SHADOWS} from '../constants/theme';
import {AuthContext} from '../context/AuthContext';
import {TopBar} from '../components';

const LogInScreen = () => {
  const {signIn, states} = useContext(AuthContext);
  const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);
  const {width, height} = useDimensions().window;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const keyboard = useKeyboard();
  const scale = useSharedValue(1);
  const scaleView = useSharedValue(1);

  const saveUserSwitch = () =>
    states.setSaveUser(previousState => !previousState);
  const secureTextToggle = () => setSecureText(previousState => !previousState);

  // animate
  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(scale.value),
        },
      ],
    };
  }, [keyboard.keyboardShown]);

  const reanimatedView = useAnimatedStyle(() => {
    return {
      flex: scaleView.value,
    };
  }, []);
  useEffect(() => {
    scaleView.value = withDelay(
      0,
      withTiming(keyboard.keyboardShown ? 0.35 : 1, {
        duration: 200,
        easing: Easing.inOut(Easing.linear),
      }),
    );
    scale.value = withDelay(
      0,
      withTiming(keyboard.keyboardShown ? 0.625 : 1, {
        duration: 0,
        easing: Easing.inOut(Easing.circle),
      }),
    );
  }, [keyboard.keyboardShown]);
  const {
    container,
    inputContainer,
    inputContainerStyle,
    inputUsernameIcon,
    inputPasswordIcon,
    saveText,
    inputContainerStyle2,
    inputStyle,
      buttonStyle
  } = styles;

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={1}
      enabled={false}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={container}>
      <View
        style={{
          flex: keyboard.keyboardShown ? 0 : 0.1,
          height: keyboard.keyboardShown ? 0 : height * 0.1,
        }}>
        {TopBar('Lütfen Giriş Yapınız')}
      </View>
      <View style={{...LAYOUT.alignCenter, flex: 1}}>
        <Animated.View
          style={[{flex: 1, ...LAYOUT.justifyCenter}, reanimatedView]}>
          <AnimatedFastImage
            style={[
              {
                width: width * 0.7,
                height: width * 0.7,
              },
              reanimatedStyle,
            ]}
            source={{
              uri: 'https://cdn.freelogovectors.net/wp-content/uploads/2020/03/Dokuz_Eylul_Universitesi_Logo.png',
              priority: FastImage.priority.normal,
            }}
            resizeMode={'stretch'}
          />
        </Animated.View>
        <View style={{...inputContainer}}>
          <Input
            onChangeText={setUsername}
            defaultValue={username}
            value={username}
            inputStyle={{color: COLORS.white}}
            inputContainerStyle={inputContainerStyle}
            containerStyle={inputContainerStyle2}
            style={inputStyle}
            leftIcon={
              <View style={inputUsernameIcon}>
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
            inputContainerStyle={inputContainerStyle}
            containerStyle={inputContainerStyle2}
            style={inputStyle}
            leftIcon={
              <View style={inputPasswordIcon}>
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
            <Button
              title={'Giriş Yap'}
              buttonStyle={buttonStyle}
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
          <View style={{alignItems: 'flex-end', padding: 12}}>
            <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
              <Text style={saveText}>Beni Hatırla</Text>
              <Switch
                style={{transform: [{scaleX: 1.4}, {scaleY: 1.4}]}}
                value={states.saveUser}
                color={COLORS.green2}
                onValueChange={saveUserSwitch}
              />
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: COLORS.primary},
  inputContainer: {flex: 0.85, flexDirection: 'column'},
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
    fontWeight: '600',
    marginRight: 12,
  },
  inputContainerStyle2 :{
    marginBottom: 8,
    borderRadius: 12,
    ...SHADOWS.input,
    backgroundColor: COLORS.primary,
    height:  Dimensions.get('screen').height * 0.095,
    width:  Dimensions.get('screen').width * 0.925,
  },
  inputStyle:{
    height: height * 0.095,
    width: width * 0.925,
    flex: 1,
    borderRadius: 12,
    padding: 8,
    ...FONTS.body3,
  },
  buttonStyle: {
    backgroundColor: COLORS.green,
    borderRadius: 10,
    height: Dimensions.get('screen').height * 0.07,
    width:  Dimensions.get('screen').width * 0.7,
  }
});

export default LogInScreen;
