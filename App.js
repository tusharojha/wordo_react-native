import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar
} from "react-native";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Login from "./Components/Login";
import TodoList from "./Components/TodoList";
class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      id: null,
      name: "",
      token: "WorDo_conect@25082001_1970_1947"
    };
    this.lgstate = this.lgstate.bind(this);
  }
  lgstate(data) {
    this.setState({
      isLoggedIn: true,
      id: data.id,
      name: data.name
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header />
        {this.state.isLoggedIn ? (
          <TodoList user_id={this.state.id} user_name={this.state.name} />
        ) : (
          <Login data={this.lgstate} />
        )}
        <Footer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});

export default App;
