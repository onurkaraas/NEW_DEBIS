import React, { useState, useEffect, useContext } from "react";
import { Input } from "react-native-elements";
import { Keyboard, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS } from "../constants/theme";
// import FastImage from "react-native-fast-image";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Button, Switch } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { Context as AuthContext } from "../context/AuthContext";
import TopBar from "../topBar";
const LogInScreen = () => {
  const { signIn, signOut } = useContext(AuthContext);
  const [isEnabled, setIsEnabled] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const window = useWindowDimensions();
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus(1);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  // const YourImage = () => (
  //   <View
  //     style={{
  //       shadowColor: "#000",
  //       flex: 1,
  //       shadowOffset: {
  //         width: 0,
  //         height: 2,
  //       },
  //       shadowOpacity: 0.27,
  //       borderRadius: 200,
  //       elevation: 10,
  //
  //       marginVertical: 12,
  //     }}
  //   >
  //     <FastImage
  //       style={{
  //         flex: 1,
  //         width: setKeyboardStatus ? 300 : 600,
  //         height: setKeyboardStatus ? 300 : 600,
  //       }}
  //       source={{
  //         uri: "https://cdn.freelogovectors.net/wp-content/uploads/2020/03/Dokuz_Eylul_Universitesi_Logo.png",
  //         priority: FastImage.priority.normal,
  //       }}
  //       resizeMode={"contain"}
  //     />
  //   </View>
  // );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <StatusBar
        backgroundColor={keyboardStatus ? COLORS.secondary : COLORS.secondary}
      />
        {TopBar('Lütfen Giriş Yapınız')}
      <View style={{ flex: 1, alignItems: "center" }}>
        {/*{YourImage()}*/}

        <View style={{ flex: 1 }}>
          <Input
            onChangeText={setUsername}
            defaultValue={username}
            value={username}
            inputStyle={{ color: COLORS.white }}
            containerStyle={{
              marginBottom: 8,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },

              shadowOpacity: 0.27,
              shadowRadius: 12,
              borderRadius: 12,
              elevation: 5,
              height: keyboardStatus
                ? window.height * 0.1
                : window.height * 0.095,
              width: keyboardStatus
                ? window.width * 0.95
                : window.width * 0.925,
              backgroundColor: COLORS.primary,
            }}
            style={{
              height: keyboardStatus
                ? window.height * 0.1
                : window.height * 0.095,
              width: keyboardStatus
                ? window.width * 0.95
                : window.width * 0.925,
              flex: 1,
              borderRadius: 12,
              padding: 8,
              ...FONTS.body3,
              justifyContent: "center",
              alignItems: "center",
            }}
            leftIcon={
              <View
                style={{
                  backgroundColor: "#625B39",
                  height: 48,
                  width: 38,
                  flexDirection: "column",
                  borderRadius: 12,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MaterialCommunityIcons
                  name={"account"}
                  color={COLORS.yellow}
                  size={30}
                />
              </View>
            }
            placeholder="Kullanıcı Adınız"
            inputContainerStyle={{
              borderBottomWidth: 0,
              alignItems: "center",
              justifyContent: "center",
            }}
          />
          <Input
            value={password}
            onChangeText={setPassword}
            defaultValue={password}
            inputContainerStyle={{
              borderBottomWidth: 0,
              alignItems: "center",
              justifyContent: "center",
            }}
            containerStyle={{
              marginBottom: keyboardStatus ? 8 : 16,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              height: keyboardStatus
                ? window.height * 0.1
                : window.height * 0.095,
              width: keyboardStatus
                ? window.width * 0.95
                : window.width * 0.925,
              shadowOpacity: 0.27,
              shadowRadius: 12,
              borderRadius: 12,
              elevation: 5,
              backgroundColor: COLORS.primary,
            }}
            style={{
              height: keyboardStatus
                ? window.height * 0.095
                : window.height * 0.1,
              width: keyboardStatus
                ? window.width * 0.925
                : window.width * 0.95,
              flex: 1,
              borderRadius: 12,
              padding: 8,
              ...FONTS.body3,
              justifyContent: "center",
              alignItems: "center",
            }}
            leftIcon={
              <View
                style={{
                  backgroundColor: "#623A42",
                  height: 48,
                  width: 38,
                  borderRadius: 12,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MaterialCommunityIcons
                  name={"lock"}
                  color={COLORS.red}
                  size={30}
                />
              </View>
            }
            rightIcon={
              <MaterialCommunityIcons
                style={{ marginRight: 8 }}
                name={"eye"}
                color={COLORS.secondary}
                size={30}
              />
            }
            placeholder="*******"
            inputStyle={{ color: COLORS.white }}
          />

          <View
            style={{
              width: window.width * 0.9,
              marginTop: keyboardStatus ? 0 : 10,
              flexDirection: keyboardStatus ? "row" : "column",
              alignItems: keyboardStatus ? "center" : "stretch",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <Button
                  title={"Giriş Yap"}
                  buttonStyle={{
                    backgroundColor: COLORS.green2,
                    height: keyboardStatus
                      ? window.height * 0.06
                      : window.height * 0.07,
                    width: keyboardStatus
                      ? window.width * 0.75
                      : window.width * 0.65,
                    borderRadius: 10,
                  }}
                  titleStyle={{
                    ...FONTS.h2,
                  }}
                  icon={
                    <MaterialCommunityIcons
                      name={"arrow-right"}
                      color={COLORS.white}
                      size={26}
                      style={{ padding: 8 }}
                    />
                  }
                  iconPosition={"right"}
                  onPress={() => signIn({ username, password })}
                />
                <Button
                  title={"Cikis"}
                  buttonStyle={{
                    backgroundColor: COLORS.green2,
                    height: keyboardStatus
                      ? window.height * 0.06
                      : window.height * 0.07,
                    width: keyboardStatus
                      ? window.width * 0.75
                      : window.width * 0.65,
                    borderRadius: 10,
                  }}
                  titleStyle={{
                    ...FONTS.h2,
                  }}
                  icon={
                    <MaterialCommunityIcons
                      name={"arrow-right"}
                      color={COLORS.white}
                      size={26}
                      style={{ padding: 8 }}
                    />
                  }
                  iconPosition={"right"}
                  onPress={() => signOut()}
                />
              </View>
              <View style={{ justifyContent: "flex-end" }}>
                <Switch
                  style={{ transform: [{ scaleX: 1.4 }, { scaleY: 1.4 }] }}
                  value={isEnabled}
                  color={COLORS.green2}
                  onValueChange={toggleSwitch}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LogInScreen;
