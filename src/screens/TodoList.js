import React, { Component } from "react";

import { Dimensions, Modal, View, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import { fetchTodos, postTodo } from "../store/actions/index";
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
  Textarea
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
      error: ""
    };

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
    //setInterval(()=>{
     this.props.fetchTodos();
    //},1000)
  }

  // componentDidUpdate(nextProps) {
  //   this.props.fetchTodos();
  // }

  static navigationOptions = {
    // title: "ULTIMATE TODO APP",
    // headerRight: (
    //   <Icon name="plus" type="MaterialCommunityIcons" style={{paddingLeft: 10}} />
    // ),
    // headerTitleStyle: {
    //    width: Dimensions.get("window").width,
    //    }
    header: null
  };

  submitTodo() {
    if (this.state.title !== "" && this.state.description) {
      this.props.postTodo(this.state.title, this.state.description)
      // this.setState({ Spinner })
      this.props.fetchTodos();
      this.setState({modalVisible: false, title: "", description: "", listVisible: true })

    } else if(this.state.title === ""){
      this.setState({error: "Title is empty!"})
    } else if(this.state.description === ""){
      this.setState({error: "Description is empty!"})
    }
      
    
  }

  render() {
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
              onPress={() => this.setState({ modalVisible: true, listVisible: false })}
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
        <Content style={{ marginTop: 30 }}>
          {this.props.todos === null ? (
            <Spinner color="white" />
          ) : (
            this.state.listVisible ? <List
            dataArray={this.props.todos}
            renderRow={todo => (
              <TouchableOpacity onPress={() => this.props.updateTodo(todoId)}>
              <Card style={styles.todo}>
                <CardItem header>
                  <Text>{todo.title}</Text>
                </CardItem>
                <CardItem>
                  <Body style={{ flexDirection: "row" }}>
                    <Text style={{ flex: 1 }}>{todo.description}</Text>
                    <Button transparent style={{ marginRight: -20 }}>
                      <Icon
                        name="check-circle-outline"
                        type="MaterialCommunityIcons"
                        style={{ color: "#10c1c1" }}
                      />
                    </Button>
                  </Body>
                </CardItem>
              </Card>
              </TouchableOpacity>
            )}
          /> : null
          )}
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
                        onPress={() => this.setState({ modalVisible: false, listVisible: true })}
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
                      <Button style={styles.btnStyle} onPress={() => this.submitTodo()
                      }>
                        <Text>Create</Text>
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
  todo: {
    borderRadius: 8,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 10
  },
  inputStyle: {
    width: 250,
    marginLeft: 7
  },
  btnStyle:  {
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
    todos: state.todos.todos
  };
};

export default connect(
  mapStateToProps,
  { fetchTodos, postTodo }
)(TodoListScreen);
