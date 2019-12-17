import React, { Component } from "react";
import {
  View,
  Text,
  CheckBox,
  TouchableNativeFeedback,
  StyleSheet,
  Alert
} from "react-native";

class TodoItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false
    };
    this.updateCheck = this.updateCheck.bind(this);
  }
  updateCheck() {
    let prevstate = this.state.isChecked;
    this.setState({
      isChecked: !prevState
    });
    this.props.checked(this.state.isChecked, this.props.data[0]);
  }
  render() {
    return (
      <TouchableNativeFeedback
        onLongPress={e => {
          Alert.alert("Description", this.props.data[4]);
        }}
      >
        <View style={styles.item}>
          <CheckBox
            value={this.state.isChecked}
            onValueChange={() => {
              this.updateCheck;
            }}
          />
          <View style={styles.content}>
            <Text style={{ fontSize: 20 }}>{this.props.data[1]}</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <Text style={{ color: "green" }}>{this.props.data[2]}</Text>
              <Text
                style={
                  this.props.data[3] === "0"
                    ? { color: "red" }
                    : { color: "green" }
                }
              >
                {this.props.data[3] === "0" ? "pending" : "completed"}
              </Text>
            </View>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  }
}
const styles = StyleSheet.create({
  item: {
    width: "100%",
    flexDirection: "row",
    padding: 10,
    alignItems: "center"
  },
  content: {
    flexDirection: "column",
    marginLeft: 10,
    flex: 1
  }
});
export default TodoItemList;
