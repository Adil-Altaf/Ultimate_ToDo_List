import React, { Component } from "react";

import { Dimensions, Modal, View, ListView } from "react-native";
// import swal from 'sweetalert';
import {
  fetchTodos,
  postTodo,
  deleteTodo,
  doneTodo,
  updateTodo
} from "../store/actions/index";
import { connect } from "react-redux";
import {
  FormLabel,
  FormInput,
  FormValidationMessage
} from "react-native-elements";
import {
  Icon,
  Header,
  Left,
  Body,
  Right,
  Button,
  Title,
  Text,
  Card,
  CardItem,
  Content,
  List,
  Spinner,
  Form,
  Item,
  Input,
  Label,
  Textarea,
  ListItem,
  Toast
} from "native-base";
import { LinearGradient } from "expo";

const SCREEN_WIDTH = Dimensions.get("screen").width;

class TodoListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      title: "",
      description: "",
      listVisible: true,
      error: "",
      isUpdate: false,
      todoId: null
    };
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    const date = new Date();
    const monthArr = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    this.dateStr =
      monthArr[date.getMonth()] +
      " " +
      date.getDate() +
      ", " +
      date.getFullYear();
  }

  componentDidMount() {
    this.props.fetchTodos();
  }

  handleDeleteTodo(todoId) {
    try {
      this.props.deleteTodo(todoId);
    } catch (err) {
      console.log(err);
    }
  }

  handleCheckTodo(todoId, todoDone) {
    this.props.doneTodo(todoId, todoDone);
  }

  handleUpdateTodo() {
    const { todoId, title, description } = this.state;
    this.props.updateTodo(todoId, title, description);
    this.setState({
      modalVisible: false,
      title: "",
      description: "",
      listVisible: true,
      isUpdate: false
    });
  }

  static navigationOptions = {
    header: null
  };

  submitTodo() {
    if (this.state.title !== "" && this.state.description) {
      this.props.postTodo(this.state.title, this.state.description);
      // this.setState({ Spinner })
      this.props.fetchTodos();
      this.setState({
        modalVisible: false,
        title: "",
        description: "",
        listVisible: true
      });
    } else if (this.state.title === "") {
      this.setState({ error: "Title is empty!" });
    } else if (this.state.description === "") {
      this.setState({ error: "Description is empty!" });
    }
  }

  formatDate(date) {
    const d = new Date(date);
    const dateStr =
    d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();
    console.log(dateStr);
  }

  render() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    return (
      <LinearGradient
        style={styles.slideStyle}
        colors={["rgb(16, 193, 193)", "rgb(72, 68, 100)"]}
      >
        <Header transparent style={{ marginTop: 20 }}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("Welcome")}
            >
              <Icon
                name="arrow-back"
                style={{ color: "white", paddingLeft: 10 }}
              />
            </Button>
          </Left>
          <Body>
            <Title style={styles.titleHeader}>ULTIMATE TODO APP</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() =>
                this.setState({ modalVisible: true, listVisible: false })
              }
            >
              <Icon
                name="plus"
                type="MaterialCommunityIcons"
                style={{ color: "white", paddingLeft: 10 }}
              />
            </Button>
          </Right>
        </Header>
        <Text style={styles.dateText}>{this.dateStr}</Text>
        <Content style={{ marginTop: 20 }}>
          {this.props.todos === null ? (
            <Spinner color="white" />
          ) : this.state.listVisible ? (
            <List
              leftOpenValue={75}
              rightOpenValue={-75}
              dataSource={this.ds.cloneWithRows(this.props.todos)}
              renderRow={todo => (
                <ListItem
                  onLongPress={() =>
                    this.setState({
                      title: todo.title,
                      description: todo.description,
                      modalVisible: true,
                      todoId: todo.id,
                      listVisible: false,
                      isUpdate: true
                    })
                  }
                  thumbnail
                  style={{ backgroundColor: todo.done ? "#e5dbdb" : "white" }}
                >
                  <Body>
                    {this.formatDate(todo.timestamp)}
                    <Text>{todo.title}</Text>
                    <Text note numberOfLines={1}>
                      {todo.description}
                    </Text>
                  </Body>
                </ListItem>
              )}
              renderLeftHiddenRow={todo => (
                <Button
                  full
                  onPress={() => this.handleDeleteTodo(todo.id)}
                  style={{backgroundColor: 'red'}}
                >
                  <Icon active name="delete" type="MaterialCommunityIcons" />
                </Button>
              )}
              renderRightHiddenRow={todo => (
                <Button
                  full
                  style={{backgroundColor: todo.done ? 'red' : 'green'}}
                  onPress={() => this.handleCheckTodo(todo.id, todo.done)}
                >
                  <Icon
                    active
                    name={todo.done ? "close" : "check"}
                    type="MaterialCommunityIcons"
                  />
                </Button>
              )}
            />
          ) : null}
          <Modal
            transparent={true}
            animationType="slide"
            visible={this.state.modalVisible}
            onRequestClose={() => this.setState({ modalVisible: false })}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <View
                style={{
                  width: 300,
                  height: 300
                }}
              >
                <Card>
                  <CardItem header>
                    <Left>
                      <Text>Add New Task</Text>
                    </Left>
                    <Right>
                      <Button
                        transparent
                        onPress={() =>
                          this.setState({
                            modalVisible: false,
                            listVisible: true,
                            title: "",
                            description: ""
                          })
                        }
                      >
                        <Icon
                          name="close"
                          type="MaterialCommunityIcons"
                          style={{ color: "#10c1c1", paddingLeft: 10 }}
                        />
                      </Button>
                    </Right>
                  </CardItem>
                  <CardItem>
                    <Form>
                      <Item stackedLabel style={styles.inputStyle}>
                        <Label>Title</Label>
                        <Input
                          autoCorrect={false}
                          value={this.state.title}
                          onChangeText={text => this.setState({ title: text })}
                        />
                      </Item>
                      <Item stackedLabel style={styles.inputStyle}>
                        <Label>Description</Label>
                        <Textarea
                          rowSpan={5}
                          autoCorrect={false}
                          value={this.state.description}
                          onChangeText={text =>
                            this.setState({ description: text })
                          }
                        />
                      </Item>
                    </Form>
                  </CardItem>
                  <Text style={{ color: "red" }}>{this.state.error}</Text>
                  <CardItem footer>
                    <Left />
                    <Right>
                      <Button
                        style={styles.btnStyle}
                        onPress={
                          this.state.isUpdate
                            ? () => this.handleUpdateTodo()
                            : () => this.submitTodo()
                        }
                      >
                        <Text>{this.state.isUpdate ? "Update" : "Create"}</Text>
                      </Button>
                    </Right>
                  </CardItem>
                </Card>
              </View>
            </View>
          </Modal>
        </Content>
      </LinearGradient>
    );
  }
}

const styles = {
  slideStyle: {
    flex: 1,
    width: SCREEN_WIDTH
  },
  inputStyle: {
    width: 250,
    marginLeft: 7
  },
  btnStyle: {
    borderRadius: 5,
    backgroundColor: "#10c1c1"
  },
  titleHeader: {
    width: SCREEN_WIDTH - 50,
    height: 20,
    fontFamily: "TamilSangamMN",
    fontSize: 20,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 24,
    letterSpacing: 0,
    color: "#ffffff"
  },
  dateText: {
    height: 16,
    fontFamily: "TamilSangamMN",
    fontSize: 16,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 19,
    letterSpacing: 0,
    color: "#ffffff",
    marginTop: 15,
    marginLeft: 16
  }
};

const mapStateToProps = state => {
  return {
    todos: state.todos.todos,
    error: state.todos.error
  };
};

export default connect(
  mapStateToProps,
  { fetchTodos, postTodo, deleteTodo, doneTodo, updateTodo }
)(TodoListScreen);
