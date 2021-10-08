import React from 'react';
import {StyleSheet, View} from 'react-native';
import TopBar from '../topBar';
import {SafeAreaView} from 'react-native-safe-area-context';
import User from '../dataScrapping/mod';
const Profile = () => {
  return (
    <SafeAreaView style={style.container}>
      {TopBar('Profil')}
      <View style={{flex: 1}}>
        <User />
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    marginTop: 222,
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 4,
  },
  status: {
    padding: 10,
    textAlign: 'center',
  },
});

export default Profile;
