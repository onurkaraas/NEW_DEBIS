import React from "react";

import { StyleSheet, View, Text } from "react-native";

import { Dimensions } from "react-native";

import Pdf from "react-native-pdf";
import { COLORS } from "../constants/theme";

class PDFExample extends React.Component {
  render() {
    const source = {
      uri: "https://debis.deu.edu.tr/OgrenciIsleri/Rapor/ogrenci_bazli_listeler/en_yeni_transcript/transcript.php",
      cache: true,
    };

    return (
      <View style={styles.container}>
        <Pdf
          source={source}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`current page: ${page}`);
          }}
          onError={(error) => {
            console.log(error);
          }}
          onPressLink={(uri) => {
            console.log(`Link presse: ${uri}`);
          }}
          style={styles.pdf}
        />
      </View>
    );
  }
}

const TranscriptScreen = () => {
  return <PDFExample />;
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.secondary,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default TranscriptScreen;
