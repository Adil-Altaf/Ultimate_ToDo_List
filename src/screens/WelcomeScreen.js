import React, { Component } from "react";
import { Text, Dimensions, View } from "react-native";
import { Button, Icon } from "native-base";
import { LinearGradient } from "expo";
const SCREEN_WIDTH = Dimensions.get("window").width;

class WelcomeScreen extends Component {
  static navigationOptions = {
    header: null
  };



  render() {
    return (
      <LinearGradient
        colors={["rgb(16, 193, 193)", "rgb(72, 68, 100)"]}
        style={styles.slideStyle}
      >
        <Icon
          name="alpha"
          type="MaterialCommunityIcons"
          style={{ color: "white", fontSize: 120 }}
        />
        <View style={{width: "auto"}}>
        <Text style={styles.textStyle}>ULTIMATE TODO APP</Text>
        
        <Text style={styles.smallTextStyle}>created by team alpha</Text>
        </View>
        <Button
          block
          style={styles.buttonStyle}
          onPress={() => this.props.navigation.navigate("TodoList")}
        >
          <Text style={styles.btnTextStyle}>Lets go</Text>
        </Button>
      </LinearGradient>
    );
  }
}

const styles = {
  slideStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH
  },
  smallTextStyle: {
    width: "auto",
    height: "auto",
    fontFamily: "TamilSangamMN",
    fontSize: 12,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#ffffff",
    marginTop: 2,
    // marginRight: -75,
    textAlign: "right"
  },
  textStyle: {
    width: "auto",
    height: "auto",
    margin: "auto",
    fontFamily: "TamilSangamMN",
    fontSize: 20,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 24,
    letterSpacing: 0,
    color: "#ffffff",
    textAlign: "center"
  },
  buttonStyle: {
    borderRadius: 8,
    backgroundColor: "#ffffff",
    shadowColor: "#484464",
    width: 200,
    shadowOffset: {
      width: 0,
      height: 3
    },
    // width: 200,
    shadowRadius: 6,
    shadowOpacity: 1,
    marginTop: 25,
    marginLeft: "auto",
    marginRight: "auto"
  },
  btnTextStyle: {
    // width: 50,
    height: 18,
    fontFamily: "TamilSangamMN",
    fontSize: 16,
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: "left",
    color: "#10c1c1"
  }
};

export default WelcomeScreen;
