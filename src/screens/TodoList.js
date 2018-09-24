import React, { Component } from "react";
import { Dimensions, Modal, View, ListView, findNodeHandle, Platform } from "react-native";
import {
  fetchTodos,
  postTodo,
  deleteTodo,
  doneTodo,
  updateTodo
} from "../store/actions/index";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
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
  ListItem
} from "native-base";
import { LinearGradient } from "expo";

const SCREEN_WIDTH = Dimensions.get("screen").width;

class TodoListScreen extends Component {
  static navigationOptions = {
    header: null
  };

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
    // setInterval(() => {
    //   this.props.fetchTodos();
    // }, 1000)
    this.props.fetchTodos();
  }

  handleDeleteTodo(todoId, secId, rowId, rowMap) {
    try {
      this.props.deleteTodo(todoId);
      rowMap[`${secId}${rowId}`].props.closeRow();
    } catch (err) {
      console.log(err);
    }
  }

  handleCheckTodo(todoId, todoDone, secId, rowId, rowMap) {
    this.props.doneTodo(todoId, todoDone);
    rowMap[`${secId}${rowId}`].props.closeRow();
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

  submitTodo() {
    if (this.state.title !== "" && this.state.description !== "") {
      this.props.postTodo(
        this.state.title,
        this.state.description,
        this.state.chosenDate
      );
      // this.setState({ Spinner })
      this.props.fetchTodos();
      this.setState({
        modalVisible: false,
        title: "",
        description: "",
        error: "",
        listVisible: true,
      });
    } else if (this.state.title === "" && this.state.description === "") {
      this.setState({ error: "Please enter all fields" });
    } else if (this.state.title === "") {
      this.setState({ error: "Please enter title" });
    } else {
      this.setState({ error: "Please enter description" });
    }
  }

  formatDate(date) {
    const d = new Date(date);
    const dateStr = d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();
    console.log(dateStr);
  }



  _scrollToInput = (reactNode) => {
    // Add a 'scroll' ref to your ScrollView
    this.scroll.props.scrollToFocusedInput(reactNode)
  }

  render() {
    const { todos } = this.props;
    // console.log("TOdos emty: ", todos);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    return (
      <LinearGradient
        style={styles.slideStyle}
        colors={["rgb(16, 193, 193)", "rgb(72, 68, 100)"]}
      >
        <Header transparent style={{ marginTop: 20, width: "auto" }}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("Welcome")}
            >
              <Icon
                name="arrow-back"
                style={{ color: "white" }}
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
                style={{ color: "white" }}
              />
            </Button>
          </Right>
        </Header>
        <Text style={styles.dateText}>{this.dateStr}</Text>
        <Content style={{ marginTop: 20 }}>
          {todos === null ? (
            <Spinner color="white" />
          ) : todos.length === 0 ? (
            <Text style={{ color: "white", textAlign: "center" }}>
              You haven't any todo in List
            </Text>
          ) : this.state.listVisible ? (
            <List
              style={{ margin: 12, borderRadius: 5 }}
              leftOpenValue={75}
              rightOpenValue={-75}
              dataSource={this.ds.cloneWithRows(todos)}
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
                  style={{
                    backgroundColor: todo.done ? "#D3CCE3" : "#E9E4F0",
                    paddingRight: 18
                  }}
                >
                  <Body>
                    {this.formatDate(todo.timestamp)}
                    <Text>{todo.title}</Text>
                    <Text note>{todo.description}</Text>
                  </Body>
                </ListItem>
              )}
              renderLeftHiddenRow={(todo, secId, rowId, rowMap) => (

                <Button
                  full
                  onPress={() => this.handleDeleteTodo(todo.id, secId, rowId, rowMap)}
                  style={{ backgroundColor: "red" }}
                >
                  <Icon active name="delete" type="MaterialCommunityIcons" />
                </Button>
              )}
              renderRightHiddenRow={(todo, secId, rowId, rowMap) => (
                <Button
                  full
                  style={{ backgroundColor: todo.done ? "red" : "green" }}
                  onPress={() => this.handleCheckTodo(todo.id, todo.done, secId, rowId, rowMap)}
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
              <KeyboardAwareScrollView
                extraHeight={10}
                innerRef={ref => { this.scroll = ref }}
                scrollEnabled>
                <View
                  style={{
                    marginTop: 130,
                    marginBottom: "auto",
                    width: 300,
                    height: "auto",
                    borderRadius: 5
                  }}
                >
                  <Card>
                    <CardItem header>
                      <Left>
                        <Text>{this.state.isUpdate ? "Update Task" : "Create New Task"}</Text>
                      </Left>
                      <Right>
                        <Button
                          transparent
                          onPress={() =>
                            this.setState({
                              modalVisible: false,
                              listVisible: true,
                              title: "",
                              description: "",
                              error: ""
                            })
                          }
                        >
                          <Icon
                            name="close"
                            type="MaterialCommunityIcons"
                            style={{ color: "#10c1c1", paddingLeft: 10, fontSize: 20 }}
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
                            onChangeText={text =>
                              this.setState({ title: text })
                            }
                            onFocus={(event) => {
                              // `bind` the function if you're using ES6 classes
                              this._scrollToInput(findNodeHandle(event.target))
                            }}
                          />
                        </Item>
                        <Item stackedLabel style={styles.inputStyle}>
                          <Label>Description</Label>

                          <Textarea
                            style={{ marginLeft: -17, width: 250 }}
                            rowSpan={5}
                            autoCorrect={false}
                            value={this.state.description}
                            onChangeText={text =>
                              this.setState({ description: text })
                            }
                            onFocus={(event) => {
                              // `bind` the function if you're using ES6 classes
                              this._scrollToInput(findNodeHandle(event.target))
                            }}
                          />
                        </Item>

                      </Form>
                    </CardItem>
                    <Text style={styles.errorStyle}>{this.state.error}</Text>
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
                          <Text>
                            {this.state.isUpdate ? "Update" : "Create"}
                          </Text>
                        </Button>
                      </Right>
                    </CardItem>
                  </Card>
                </View>
              </KeyboardAwareScrollView>
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
    width:250,
    marginLeft: -15,
    textAlign: "center",
    height: "auto",
    fontFamily: "TamilSangamMN",
    fontSize: 20,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#ffffff",
  },
  errorStyle: {
    color: "red",
    marginLeft: 20
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
