import React from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

const ProfilePosts = () => {
  const window = useWindowDimensions();

  function renderPhotos() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginBottom: 4,
          }}
        >
          <Image
            resizeMode={"contain"}
            style={{
              height: window.height / 5,
              width: window.width / 3,
            }}
            source={require("../assets/images/ben2.png")}
          />

          <Image
            resizeMode={"contain"}
            style={{ height: window.height / 5, width: window.width / 3 }}
            source={require("../assets/images/ben2.png")}
          />

          <Image
            resizeMode={"contain"}
            style={{ height: window.height / 5, width: window.width / 3 }}
            source={require("../assets/images/ben2.png")}
          />
        </View>
      </View>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {renderPhotos()}
        {renderPhotos()}
        {renderPhotos()}
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProfilePosts;
