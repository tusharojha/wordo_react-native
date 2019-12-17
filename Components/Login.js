import React, { Component } from "react";

import {
  View,
  Dimensions,
  TextInput,
  StyleSheet,
  Text,
  Image,
  Button,
  Alert
} from "react-native";
class Login extends Component {
  constructor() {
    super();

    /**
     * Returns true if the screen is in portrait mode
     */
    
    const isPortrait = () => {
      const dim = Dimensions.get("screen");
      return dim.height >= dim.width;
    };
    this.state = {
      username: "",
      password: "",
      message: "",
      isLoading: false,
      orientation: isPortrait() ? "portrait" : "landscape"
    };
    // Event Listener for orientation changes
    Dimensions.addEventListener("change", () => {
      this.setState({
        orientation: isPortrait() ? "portrait" : "landscape"
      });
    });

    this.login = this.login.bind(this);
    this.checklogin = this.checklogin.bind(this);
    this.componentd = this.componentd.bind(this);
  }
  componentDidMount() {
    this.componentd();
  }
  login() {
    if (this.state.username !== "") {
      if (this.state.password !== "") {
        let username = this.state.username;
        let password = this.state.password;

        this.setState({ isLoading: true });

        fetch(
          "http://kaptonohome.000webhostapp.com/wordo/login.php?username=" +
            username +
            "&password=" +
            password
        )
          .then(response => response.json())
          .then(data => {
            this.checklogin(data);
          })
          .catch(error => {
            Alert.alert("Error", "Unable to Connect to Internet");

            this.setState({ isLoading: false });
          });
      } else {
        Alert.alert("Error", "Password is Required!");
      }
    } else {
      Alert.alert("Error", "Username is Required!");
    }
  }
  checklogin(data) {
    if (data.status === 400) {
      this.setState({ isLoading: false });

      this.props.data(data);
    } else {
      Alert.alert("Error", "Wrong Credentials!");
      this.setState({ isLoading: false });
    }
  }
  componentd() {
    const isPortrait = () => {
      const dim = Dimensions.get("screen");
      return dim.height >= dim.width;
    };
    this.setState({
      orientation: isPortrait() ? "portrait" : "landscape"
    });
  }
  render() {
    if (this.state.orientation === "portrait") {
      return (
        <View style={styles.box}>
          <Text style={styles.login}>Login</Text>

          <View style={styles.cn}>
            <View style={styles.input_d}>
              <View style={styles.img}>
                <Image
                  style={styles.user_img}
                  source={require("./img/user.png")}
                />
              </View>
              <TextInput
                value={this.state.username}
                onChangeText={text => {
                  this.setState({ username: text });
                }}
                style={{
                  fontSize: 22,
                  borderWidth: 1,
                  width: 250,
                  textAlign: "center"
                }}
                placeholder="Username"
              />
              <TextInput
                value={this.state.password}
                secureTextEntry={true}
                onChangeText={text => {
                  this.setState({ password: text });
                }}
                style={{
                  marginBottom: 15,
                  fontSize: 22,
                  borderWidth: 1,
                  width: 250,
                  marginTop: 20,
                  textAlign: "center"
                }}
                placeholder="Password"
              />
              <Button
                disabled={this.state.isLoading ? true : false}
                onPress={() => {
                  this.login();
                }}
                title={this.state.isLoading ? "Loading..." : "Login Now"}
              />
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.box}>
          <Text style={styles.login}>Login</Text>
          <View style={styles.cn_landscape}>
            <View style={{ flexDirection: "column" }}>
              <TextInput
                value={this.state.username}
                onChangeText={text => {
                  this.setState({ username: text });
                }}
                style={{
                  fontSize: 22,
                  borderWidth: 1,
                  width: 250,
                  textAlign: "center"
                }}
                placeholder="Username"
              />
              <TextInput
                value={this.state.password}
                secureTextEntry={true}
                onChangeText={text => {
                  this.setState({ password: text });
                }}
                style={{
                  marginBottom: 15,
                  fontSize: 22,
                  borderWidth: 1,
                  width: 250,
                  marginTop: 20,
                  textAlign: "center"
                }}
                placeholder="Password"
              />
            </View>
            <View style={styles.ic_landscape}>
              <View style={styles.img}>
                <Image
                  style={styles.user_img_landscape}
                  source={require("./img/user.png")}
                />
              </View>
              <Button
                disabled={this.state.isLoading ? true : false}
                onPress={() => {
                  this.login();
                }}
                title={this.state.isLoading ? "Loading..." : "Login Now"}
              />
            </View>
          </View>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  box: {
    flex: 1,
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: 10,
    padding: 10
  },
  login: {
    fontSize: 40,
    color: "salmon"
  },
  cn: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  profile_icon: {
    flex: 1
  },
  input_d: {
    padding: 10
  },
  img: {
    alignItems: "center",
    marginBottom: 0,
    marginTop: 0
  },
  user_img: {
    height: 120,
    resizeMode: "contain"
  },
  user_img_landscape: {
    height: 80,
    marginTop: -10,
    resizeMode: "contain"
  },
  cn_landscape: {
    width: "100%",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  ic_landscape: {
    marginLeft: 100
  }
});
export default Login;
