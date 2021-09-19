import React, { useRef } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { FONTS } from "../constants/theme";
import { Button, ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProfilePosts from "./ProfilePosts";
import ProfileTaggedPosts from "./ProfileTaggedPosts";
import { ScrollView } from "react-native-gesture-handler";
import BottomSheet from "react-native-simple-bottom-sheet";

const TabProf = createMaterialTopTabNavigator();
const Profile = ({ color }) => {
  const panelRef = useRef(null);

  function renderProfileTop() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
        }}
      >
        <View
          style={{
            flex: 1,
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../assets/images/ben.png")}
            style={{
              height: "80%",
              width: "70%",
              borderRadius: 1111,
              borderColor: "gray",
              borderWidth: 0.4,
            }}
            resizeMode={"cover"}
          />
        </View>

        <View
          style={{
            flex: 1,
            height: "100%",
            width: "75%",
            left: "30%",
            flexDirection: "row",
            position: "absolute",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 45,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text style={{ ...FONTS.h3 }}>14</Text>
            <Text>Post</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ ...FONTS.h3 }}>200</Text>
            <Text>Follower</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ ...FONTS.h3 }}>234</Text>
            <Text>Follow</Text>
          </View>
        </View>
      </View>
    );
  }
  function profileName() {
    return (
      <View
        style={{
          flex: 1,
          left: "5%",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <Text style={{ ...FONTS.h3, fontSize: 14 }}>Onur Karaas</Text>
        <Text style={{ ...FONTS.body4, fontSize: 14 }}>DEU</Text>
      </View>
    );
  }
  function renderProfileButtons() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 3,
        }}
      >
        <View style={{ flex: 8, marginHorizontal: 5 }}>
          <Button
            buttonStyle={{
              height: 30,

              borderColor: "gray",
            }}
            title="Edit Profile"
            type="outline"
            titleStyle={{ color: "black" }}
          />
        </View>
        <View style={{ flex: 1, marginHorizontal: 5 }}>
          <Button
            buttonStyle={{
              height: 30,
              borderColor: "gray",
            }}
            title=""
            icon={<Icon name="chevron-down" size={14} color="black" />}
            type="outline"
            titleStyle={{ color: "black" }}
          />
        </View>
      </View>
    );
  }

  function renderProfileHighlights() {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          flex: 1,
        }}
      >
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={{ paddingHorizontal: 8 }}>
            <TouchableOpacity>
              <Image
                resizeMode={"cover"}
                source={require("../assets/images/ben.png")}
                style={styles.photos}
              />
            </TouchableOpacity>
            <Text>karaasonur</Text>
          </View>

          <View style={{ paddingHorizontal: 8 }}>
            <TouchableOpacity>
              <Image
                resizeMode={"cover"}
                source={require("../assets/images/ben2.png")}
                style={styles.photos}
              />
            </TouchableOpacity>
            <Text>karaasonur</Text>
          </View>

          <View style={{ paddingHorizontal: 8, alignItems: "center" }}>
            <TouchableOpacity>
              <MaterialCommunityIcons
                style={{
                  alignItems: "center",
                  height: 65,
                  width: 65,
                  borderRadius: 100,
                  borderWidth: 2,
                  borderColor: "gray",
                }}
                name="plus"
                size={65}
                color={color}
              />
            </TouchableOpacity>
            <Text>New</Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  function MyTabs() {
    return (
      <TabProf.Navigator
        screenOptions={{
          lazy: true,
          scrollEnabled: true,
          swipeEnabled: true,

          tabStyle: {
            width: "auto",
          },
        }}
      >
        <TabProf.Screen
          name="w"
          component={ProfilePosts}
          options={{
            tabBarLabel: () => {
              return null;
            },
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="table-large"
                color={color}
                size={20}
              />
            ),
          }}
        />
        <TabProf.Screen
          name="e"
          component={ProfileTaggedPosts}
          options={{
            tabBarLabel: () => {
              return null;
            },
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="account-box-multiple"
                color={color}
                size={20}
              />
            ),
          }}
        />
      </TabProf.Navigator>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ height: "18%" }}>{renderProfileTop()}</View>
          <View style={{ height: "8%" }}>{profileName()}</View>
          <View style={{ height: "5%" }}>{renderProfileButtons()}</View>
          <View style={{ height: "20%", paddingHorizontal: 3 }}>
            {renderProfileHighlights()}
          </View>

          <View style={{ flexGrow: 1 }}>{MyTabs()}</View>
          <BottomSheet
            ref={(ref) => (panelRef.current = ref)}
            sliderMinHeight={0}
            isOpen={false}
          >
            <ListItem style={{ flex: 1 }}>
              <View style={{ flex: 1, flexDirection: "column" }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    margin: 4,
                  }}
                >
                  <MaterialCommunityIcons
                    style={{ marginRight: 10 }}
                    name="cog-outline"
                    color={color}
                    size={26}
                  />
                  <Text style={FONTS.body3}>Settings</Text>
                </View>

                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    margin: 4,
                  }}
                >
                  <MaterialCommunityIcons
                    style={{ marginRight: 10 }}
                    name="history"
                    color={color}
                    size={26}
                  />
                  <Text style={FONTS.body3}>Archive</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    margin: 4,
                  }}
                >
                  <MaterialCommunityIcons
                    style={{ marginRight: 10 }}
                    name="timelapse"
                    color={color}
                    size={26}
                  />
                  <Text style={FONTS.body3}>Your Activity</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    margin: 4,
                  }}
                >
                  <MaterialCommunityIcons
                    style={{ marginRight: 10 }}
                    name="qrcode-scan"
                    color={color}
                    size={26}
                  />
                  <Text style={FONTS.body3}>QR Code</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    margin: 4,
                  }}
                >
                  <MaterialCommunityIcons
                    style={{ marginRight: 10 }}
                    name="bookmark-outline"
                    color={color}
                    size={26}
                  />
                  <Text style={FONTS.body3}>Saved</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    margin: 4,
                  }}
                >
                  <MaterialCommunityIcons
                    style={{ marginRight: 10 }}
                    name="card-account-details-star"
                    color={color}
                    size={26}
                  />
                  <Text style={FONTS.body3}>Close Friends</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    margin: 4,
                  }}
                >
                  <MaterialCommunityIcons
                    style={{ marginRight: 10 }}
                    name="account-heart-outline"
                    color={color}
                    size={26}
                  />
                  <Text style={FONTS.body3}>COVID-19 Information Center</Text>
                </View>
              </View>
            </ListItem>
            <View />
          </BottomSheet>
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
    height: 65,
    width: 65,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "gray",
  },
});

export default Profile;
