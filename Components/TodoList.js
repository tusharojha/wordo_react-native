import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Button,
  Dimensions,
  Modal,
  TouchableHighlight
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import TodoListItem from "./TodoListItem";
class TodoList extends Component {
  constructor(props) {
    super(props);
    const isPortrait = () => {
      const dim = Dimensions.get("screen");
      return dim.height >= dim.width;
    };
    this.state = {
      token: "WorDo_conect@25082001_1970_1947",
      message: "",
      user_name: "",
      data: [],
      isList: true,
      Listcount: 0,
      modalVisible: false,
      isLoadingAdd: false,
      wordo_title: "",
      wordo_description: "",
      orientation: isPortrait() ? "portrait" : "landscape"
    };

    // Event Listener for orientation changes
    Dimensions.addEventListener("change", () => {
      this.setState({
        orientation: isPortrait() ? "portrait" : "landscape"
      });
    });
    this.updateWordoList = this.updateWordoList.bind(this);
    this.updateWordoListItem = this.updateWordoListItem.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.create = this.create.bind(this);
    this.data_create = this.data_create.bind(this);
    this.refresh = this.refresh.bind(this);
    this.componentd = this.componentd.bind(this);
    this.updatelistcheck = this.updatelistcheck.bind(this);
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  updateWordoList() {
    this.setState({ data: [] });
    fetch(
      "http://kaptonohome.000webhostapp.com/wordo/load_wordoList.php?user_id=" +
        this.props.user_id +
        "&token=" +
        this.state.token
    )
      .then(response => response.json())
      .then(responseData => {
        this.updateWordoListItem(responseData);
      });
  }
  updateWordoListItem(responseData) {
    if (responseData.status === 400) {
      let count = 0;
      let data = responseData.data;
      while (count < responseData.count) {
        let id_i = data[count].id;
        let name = data[count].name;
        let timestamp = data[count].timestamp;
        let checked = data[count].checked;
        let description = data[count].description;
        this.state.data.push([[id_i, name, timestamp, checked, description]]);

        count++;
      }
      this.setState({ message: "", Listcount: count });
    } else {
      this.setState({ message: "No WorDos: Create A New Now", Listcount: 0 });
    }
  }
  componentDidMount() {
    this.componentd();
    this.setState({ message: "Loading WorDOs..." });
    this.updateWordoList();
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
    return (
      <View style={styles.contain}>
        <View style={styles.profile_details}>
          <Text style={styles.welcome}>Welcome {this.props.user_name}</Text>
        </View>

        {this.state.message === "" ? null : (
          <Text style={styles.message}>{this.state.message}</Text>
        )}
        <View
          style={
            this.state.orientation === "portrait"
              ? { flexDirection: "column" }
              : { flexDirection: "row" }
          }
        >
          {this.state.orientation === "portrait" ? (
            <View style={styles.options}>
              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(true);
                }}
              >
                <Icon style={styles.icon} name="add" size={25} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon style={styles.icon} name="create" size={25} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon style={styles.icon} name="delete" size={25} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.refresh();
                }}
              >
                <Icon style={styles.icon} name="refresh" size={25} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.options_landscape}>
              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(true);
                }}
                style={{ flexDirection: "row" }}
              >
                <Icon style={styles.icon} name="add" size={25} />
                <Text style={{ fontSize: 18, marginTop: 10 }}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ flexDirection: "row" }}>
                <Icon style={styles.icon} name="create" size={25} />
                <Text style={{ fontSize: 18, marginTop: 10 }}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ flexDirection: "row" }}>
                <Icon style={styles.icon} name="delete" size={25} />
                <Text style={{ fontSize: 18, marginTop: 10 }}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={() => {
                  this.refresh();
                }}
              >
                <Icon style={styles.icon} name="refresh" size={25} />
                <Text style={{ fontSize: 18, marginTop: 10 }}>Refresh</Text>
              </TouchableOpacity>
            </View>
          )}
          <ScrollView>{this.state.isList ? this.todolist() : null}</ScrollView>
        </View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}
        >
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 25
              }}
            >
              <Text style={{ fontSize: 25 }}>
                Add WorDo {this.state.isList ? "List" : null}
              </Text>

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              >
                <Icon name="clear" size={25} />
              </TouchableHighlight>
            </View>
            <View style={{ alignItems: "center" }}>
              <View
                style={{
                  margin: 25,
                  width: 250
                }}
              >
                <TextInput
                  style={{
                    fontSize: 22,
                    borderWidth: 1,
                    width: 250,
                    paddingTop: 5,
                    textAlign: "center"
                  }}
                  value={this.state.wordo_title}
                  onChangeText={text => {
                    this.setState({ wordo_title: text });
                  }}
                  placeholder="Wordo Title"
                />
                <TextInput
                  style={{
                    fontSize: 20,
                    borderWidth: 1,
                    marginTop: 10,
                    width: 250,
                    paddingTop: 5,
                    textAlign: "center",
                    marginBottom: 10
                  }}
                  value={this.state.wordo_description}
                  onChangeText={text => {
                    this.setState({ wordo_description: text });
                  }}
                  editable={true}
                  multiline={true}
                  placeholder="Description"
                  maxLength={40}
                />
                <Button
                  disabled={this.state.isLoadingAdd ? true : false}
                  onPress={() => {
                    this.create();
                  }}
                  title={this.state.isLoadingAdd ? "Loading..." : "Add Now"}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
  refresh() {
    this.setState({ message: "Refreshing..." });
    setTimeout(() => {
      this.setState({ message: "" });
    }, 2000);

    this.updateWordoList();
  }
  create() {
    this.setState({ isLoadingAdd: true });
    if (this.state.wordo_title !== "") {
      if (this.state.wordo_description !== "") {
        fetch(
          "http://kaptonohome.000webhostapp.com/wordo/add_wordoList.php?user_id=" +
            this.props.user_id +
            "&token=" +
            this.state.token +
            "&wordo=" +
            this.state.wordo_title +
            "&description=" +
            this.state.wordo_description
        )
          .then(response => response.json())
          .then(responseData => {
            this.data_create(responseData);
          });
      } else {
        Alert.alert("Alert!", "Add a Wordo Description");
        this.setState({ isLoadingAdd: false });
      }
    } else {
      Alert.alert("Alert!", "Add a Wordo Title");
      this.setState({ isLoadingAdd: false });
    }
  }
  data_create(responseData) {
    if (responseData.status === 400) {
      this.setState({ isLoadingAdd: false });
      this.setModalVisible(false);
      this.setState({ wordo_title: "", wordo_description: "" });
      this.updateWordoList();
    } else {
      Alert.alert("Error", "Unable to Connect!");
      this.setState({ wordo_title: "", wordo_description: "" });
      this.setState({ isLoadingAdd: false });
      this.setModalVisible(true);
      this.updateWordoList();
    }
  }
  updatelistcheck(isChecked, item_id) {
    if (isChecked === true) {
      let newData = this.state.data.map(d => {
        d.id_i === item_id ? (d.checked = 1) : d;
      });
      this.setState({ data: newData });
    } else {
      let newData = this.state.data.map(d => {
        d.id_i === item_id ? (d.checked = 0) : d;
      });
      this.setState({ data: newData });
    }
  }
  todolist() {
    if (this.state.Listcount > 0) {
      let items = [];
      this.state.data.map(item => {
        items.push(
          <TodoListItem
            checked={this.updatelistcheck}
            key={item[0][0]}
            data={item[0]}
          />
        );
      });
      return items;
    } else {
      return null;
    }
  }
}
const styles = StyleSheet.create({
  contain: {
    flex: 10,
    width: "100%",
    justifyContent: "flex-start"
  },
  welcome: {
    color: "#20af68",
    fontSize: 18
  },
  profile_details: {},
  message: {
    color: "green",
    fontSize: 25,
    marginTop: 20,
    width: "100%",
    textAlign: "center"
  },
  options: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10
  },
  options_landscape: {
    flexDirection: "column",
    marginTop: 10,
    marginBottom: 10,
    paddingRight: 5,
    borderRightWidth: 0.5,
    borderRightColor: "grey"
  },
  icon: {
    paddingRight: 10,
    paddingTop: 10,
    color: "grey"
  }
});
export default TodoList;
