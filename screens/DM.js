import React from "react";
import {
  Button,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchBar } from "react-native-elements";
import { FONTS } from "../constants/theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import Home from "./Home";

function MyBackButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
      component={Home}
    >
      <MaterialCommunityIcons
        title="back"
        name="arrow-left"
        size={26}
        color={"black"}
      />
    </TouchableOpacity>
  );
}

function renderDMTop() {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 4,
        borderBottomWidth: 0.2,
        borderBottomColor: "lightgray",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 4,
        }}
      >
        <View style={{ padding: 4 }}>{MyBackButton()}</View>
        <View style={{ padding: 4 }}>
          <Text style={FONTS.h4}>karaasonur</Text>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "flex-end",
          padding: 4,
        }}
      >
        <View style={{ padding: 4 }}>
          <MaterialCommunityIcons
            name="camera-outline"
            size={26}
            color={"black"}
          />
        </View>
        <View style={{ padding: 4 }}>
          <MaterialCommunityIcons name="pen" size={26} color={"black"} />
        </View>
      </View>
    </View>
  );
}

function renderDMSearch() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <SearchBar
        placeholder="Search"
        inputStyle={{ backgroundColor: "lightgray", fontSize: 12 }}
        containerStyle={{
          width: "97.5%",
          backgroundColor: "white",
          borderBottomColor: "transparent",
          borderTopColor: "transparent",
          borderColor: "transparent",
        }}
        leftIconContainerStyle={{
          backgroundColor: "lightgray",
          padding: 4,
        }}
        inputContainerStyle={{ backgroundColor: "lightgray", height: 30 }}
      />
    </View>
  );
}
function renderDMRequests() {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 8,
        borderBottomWidth: 1,
        borderColor: "Black",
      }}
    >
      <View>
        <Text style={FONTS.h4}>Messages</Text>
      </View>
      <View>
        <TouchableOpacity>
          <Text style={{ color: "#2383f8", fontWeight: "bold" }}>
            0 Request
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function renderMessages() {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",

        borderBottomWidth: 1,
        borderBottomColor: "black",
      }}
    >
      <View style={{ padding: 5 }}>
        <Image
          style={styles.photos}
          source={require("../assets/images/ben.png")}
        />
      </View>

      <View
        style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
      >
        <View>
          <Text style={FONTS.h4}>username</Text>
        </View>
        <View>
          <Text>Messages</Text>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <MaterialCommunityIcons
          name="dots-vertical"
          size={30}
          color={"black"}
        />
      </View>
    </View>
  );
}

const DM = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {renderDMTop()}
      <View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderDMSearch()}
          {renderDMRequests()}
          {renderMessages()}
          {renderMessages()}
          {renderMessages()}
          {renderMessages()}
          {renderMessages()}
          {renderMessages()}
          {renderMessages()}
          {renderMessages()}
          {renderMessages()}
          {renderMessages()}
          {renderMessages()}
          {renderMessages()}
          {renderMessages()}
          {renderMessages()}
          {renderMessages()}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  photos: {
    height: 70,
    width: 70,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "red",
  },
});

export default DM;
