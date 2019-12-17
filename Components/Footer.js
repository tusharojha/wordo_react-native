import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
class Footer extends Component {
  render() {
    return (
      <View style={styles.box}>
        <Text style={styles.instructions}>
          Designed &amp; Developed by{" "}
          <Text style={{ color: "royalblue" }}>Tushar Ojha</Text>
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  box: {
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 20,
    textAlign: "center"
  },
  instructions: {
    textAlign: "center",
    marginBottom: 5,
    color: "grey"
  }
});
export default Footer;
