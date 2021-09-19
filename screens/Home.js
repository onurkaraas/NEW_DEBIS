import React from "react";
import { List } from "react-native-paper";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS, FONTS } from "../constants/theme";
import { useNavigation } from "@react-navigation/native";
export const renderTopBar = () => {
  return (
    <View
      style={{
        backgroundColor: COLORS.secondary,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        flex: 0.5,
      }}
    >
      <View
        style={{
          padding: 5,
          flexDirection: "row",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "SF-Pro-Display-Medium",
              fontSize: 20,
              marginLeft: 12,
            }}
          >
            Hoşgeldiniz
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            alignItems: "flex-end",
            marginRight: 12,
          }}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "SF-Pro-Display-Bold",
              fontSize: 20,
            }}
          >
            Onur KARAAŞ
          </Text>
          <Text
            style={{
              color: "white",
              fontFamily: "SF-Pro-Display-Regular",
              fontSize: 14,
            }}
          >
            Yön.Bil.Sistemleri
          </Text>
        </View>
      </View>
    </View>
  );
};
const Home = ({ color }) => {
  const navigation = useNavigation();

  function renderAcc() {
    const [expanded, setExpanded] = React.useState(true);

    const handlePress = () => setExpanded(!expanded);

    return (
      <List.Section style={{ backgroundColor: COLORS.secondary }}>
        <List.Accordion
          style={{
            backgroundColor: COLORS.secondary,
            height: 65,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            width: 375,
          }}
          titleStyle={{ color: "#fff", ...FONTS.body3 }}
          title="Son Duyurular"
          description={"15.09.2021"}
          descriptionStyle={{ color: "#fff", ...FONTS.body4 }}
          left={(props) => (
            <View
              style={{
                height: 10,
                width: 18,
                backgroundColor: COLORS.red,
                borderRadius: 6,
                marginLeft: 12,
              }}
            />
          )}
        >
          <List.Item
            style={{
              backgroundColor: COLORS.secondary,
            }}
            title="First item"
          />
          <List.Item
            style={{
              backgroundColor: COLORS.secondary,
            }}
            title="Second item"
          />
        </List.Accordion>

        <List.Accordion
          style={{
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
            backgroundColor: COLORS.secondary,
            height: 65,
          }}
          titleStyle={{ color: "#fff", ...FONTS.body3 }}
          title="Günün Menüsü"
          description={"15.09.2021"}
          descriptionStyle={{ color: "#fff", ...FONTS.body4 }}
          left={(props) => (
            <View
              style={{
                height: 10,
                width: 18,
                backgroundColor: COLORS.yellow,
                borderRadius: 6,
                marginLeft: 12,
              }}
            />
          )}
          onPress={handlePress}
        >
          <List.Item
            style={{
              backgroundColor: COLORS.secondary,
            }}
            title="First item"
          />
          <List.Item
            style={{
              backgroundColor: COLORS.secondary,
              borderBottomLeftRadius: 25,
              borderBottomRightRadius: 25,
            }}
            title="Second item"
          />
        </List.Accordion>
      </List.Section>
    );
  }

  function renderIcons(name, category) {
    return (
      <View
        style={{
          flex: 1,

          alignItems: "center",
        }}
      >
        <View
          style={{
            marginTop: 20,
            backgroundColor: COLORS.green,
            height: 90,
            alignItems: "center",
            width: 90,
            borderRadius: 25,
          }}
        >
          <View style={{ flex: 1, justifyContent: "center" }}>
            <MaterialCommunityIcons
              name={name}
              color={COLORS.white}
              size={60}
            />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            height: 10,
            width: 95,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              flex: 1,

              color: COLORS.white,
              fontSize: 17,
              fontFamily: "SF-Pro-Display-Bold",
            }}
          >
            {category}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.primary,
      }}
    >
      {renderTopBar()}
      <View style={{ flex: 3, flexDirection: "column" }}>
        <View style={{ alignItems: "center" }}>{renderAcc()}</View>

        <View style={{ flex: 0.65, flexDirection: "row" }}>
          {renderIcons("calendar", "Akademik Takvim")}
          {renderIcons("calendar-check", "Ders Programi")}
          {renderIcons("message-draw", "Mesajlar")}
        </View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          {renderIcons("calendar-remove", "Devamsizlik")}
          {renderIcons("food", "Yemek Menusu")}
          {renderIcons("signal-hspa-plus", "Not Bilgisi")}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  photos: {
    height: 75,
    width: 75,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "red",
  },
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    paddingTop: 30,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "300",
    marginBottom: 20,
  },
  header: {
    backgroundColor: "#F5FCFF",
    padding: 10,
  },
  headerText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
  content: {
    padding: 20,
    backgroundColor: "#fff",
  },
  active: {
    backgroundColor: "rgba(255,255,255,1)",
  },
  inactive: {
    backgroundColor: "rgba(245,252,255,1)",
  },
  selectors: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  selector: {
    backgroundColor: "#F5FCFF",
    padding: 10,
  },
  activeSelector: {
    fontWeight: "bold",
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: "500",
    padding: 10,
    textAlign: "center",
  },
  multipleToggle: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 30,
    alignItems: "center",
  },
  multipleToggle__title: {
    fontSize: 16,
    marginRight: 8,
  },
});

export default Home;
