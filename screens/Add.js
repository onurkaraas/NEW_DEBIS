import React, { useState, Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import {
  Table,
  Row,
  Rows,
  Col,
  TableWrapper,
} from "react-native-table-component";
import CollapsibleView from "@eliav2/react-native-collapsible-view";
import { COLORS, FONTS } from "../constants/theme";

export class ExampleThree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: [
        "Sinav Turu",
        "Ilan Tarihi",
        "Sinif Ort.",
        "ORT2*",
        "Notunuz",
      ],
      tableTitle: [
        "Arasinav",
        "Y.yilici Notu",
        "Y.yilsonu Sinavi",
        "Basari Notu",
      ],
      tableData: [
        ["15/20/21", "23", "", "34"],
        ["15/20/21", "54", "", "23"],
        ["15/20/21", "23", "", "43"],
        ["15/20/21", "", "34", "FF"],
      ],
    };
  }

  render() {
    const state = this.state;
    return (
      <View style={styles.container2}>
        <Table
          borderStyle={{
            borderRadius: 25,
            borderBottomWidth: 1,
            borderColor: "#c8e1ff",
          }}
        >
          <Row
            data={state.tableHead}
            flexArr={[1, 1, 1, 1, 1]}
            style={styles.head}
            textStyle={styles.text}
          />
          <TableWrapper style={styles.wrapper}>
            <Col
              data={state.tableTitle}
              style={styles.title}
              heightArr={[45, 45]}
              textStyle={styles.text}
            />
            <Rows
              data={state.tableData}
              flexArr={[1, 1, 1, 1]}
              style={styles.row}
              textStyle={styles.text}
            />
          </TableWrapper>
        </Table>
      </View>
    );
  }
}
const Add = () => {
  const [controlledValue, setControlledValue] = useState(false);

  return (
    <CollapsibleView
      title={
        <Text
          style={{
            color: COLORS.white,
            ...FONTS.h1,
            padding: 20,
          }}
        >
          Istatistik II
        </Text>
      }
      style={{
        borderWidth: 0,
        backgroundColor: COLORS.secondary,
        borderRadius: 25,
      }}
      arrowStyling={{
        size: 45,
        thickness: 6,
        color: "white",
      }}
    >
      <ExampleThree />
    </CollapsibleView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "center",
    justifyContent: "center",
  },

  container2: {
    flex: 1,
    backgroundColor: "#2A3C44",
    textAlign: "center",
  },
  head: {
    borderBottomWidth: 2,
    borderColor: "white",
    padding: 6,
    borderRadius: 25,
  },
  wrapper: { flexDirection: "row" },
  title: { flex: 1, backgroundColor: "#2A3C44", borderRadius: 25 },
  row: { height: 45 },
  text: {
    color: "white",

    ...FONTS.body4,
    marginHorizontal: 4,
    textAlign: "center",
    borderRadius: 25,
  },
});
export default Add;
