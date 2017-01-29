import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  Button,
  TouchableOpacity,
  Keyboard,
  LayoutAnimation
} from 'react-native';

import { Icon } from 'native-base';
import DismissKeyboard from "dismissKeyboard";


// Firebase
import * as firebase from "firebase";
import Firebase from "../firebase/firebase";

const { width, height } = Dimensions.get("window");

const background = require('../../img/impressed.png');

class LoginScreen extends Component {

  constructor (props) {
    super(props)

    // Firebase.initialise();
    
    this.state = {
      email: "",
      password: "",
      response: "",
      userLoaded: false,
      initialView: null,
      wrapperHeight: { marginTop: 360 }
    }

    // this.getInitialView = this.getInitialView.bind(this);
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
  }

  static getInitialView() {

    firebase.auth().onAuthStateChanged((user) => {

      let initialView = user ? "Home" : "LoginScreen";

      this.setState({
        userLoaded: true,
        initialView: initialView
      })
    });
  }

  componentWillMount () {
    // Using keyboardWillShow/Hide looks 1,000 times better, but doesn't work on Android
    // TODO: Revisit this if Android begins to support - https://github.com/facebook/react-native/issues/3468
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  keyboardDidShow = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({
      wrapperHeight: {marginTop: 100}
    })
  }

  keyboardDidHide = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({
      wrapperHeight: {marginTop: 360}
    })
  }

   async signup() {

        DismissKeyboard();

        try {
            await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);

            this.setState({
                response: "account created"
            });

            setTimeout(() => {
                this.props.navigator.push({
                    name: "Home"
                })
            }, 1500);

        } catch (error) {
            this.setState({
                response: error.toString()
            })
        }

    }

    async login() {

        DismissKeyboard();

        try {
            await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);

            this.setState({
                response: "Logged In!"
            });

            setTimeout(() => {
                this.props.navigator.push({
                    name: "Home"
                })
            }, 1500);

        } catch (error) {
            this.setState({
                response: error.toString()
            })
        }

    }

  render() {
    return (
      <View style={styles.container}>
        <Image source={background} style={styles.background} resizeMode="cover">
          <View style={[styles.wrapper, this.state.wrapperHeight]}>
            <Text style={styles.title}>Harassment Tracker</Text>
            <View style={styles.inputWrap}>
              <View style={styles.iconWrap}>
                <Icon name="ios-mail" style={styles.inputIcon}/>
              </View>
              <TextInput 
                placeholder="Email" 
                placeholderTextColor="#333"
                style={styles.input}
                onChangeText={(email) => this.setState({email})}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            <View style={styles.inputWrap}>
              <View style={styles.iconWrap}>
                <Icon name="ios-lock" style={styles.inputIcon}/>
              </View>
              <TextInput
                label={"Password"}
                placeholderTextColor="#333"
                placeholder="Password" 
                style={styles.input} 
                secureTextEntry
                onChangeText={(password) => this.setState({password})}
                password={true}
                autoCapitalize="none"
              />
            </View>
            <TouchableOpacity activeOpacity={.8}>
              <View style={styles.button}>
                <Text onPress={this.login} style={styles.buttonText}>Sign In</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.response}>{this.state.response}</Text>
        </View>
          <View style={styles.container}>
            <View style={styles.signupWrap}>
              <Text style={styles.accountText}>Don't have an account?</Text>
              <TouchableOpacity activeOpacity={.8}>
                <View>
                  <Text style={styles.signupLinkText}>Sign Up</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width,
    height,
  },
  wrapper: {
    marginTop: 360,
    padding: 20,
    backgroundColor: "#4400369C",
  },
  inputWrap: {
    flexDirection: "row",
    marginVertical: 10,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC",
    backgroundColor: "#FFBDE7"
  },
  iconWrap: {
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    color: "#FFF",
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    textAlign:"center",
    fontWeight: "bold",
  },
  icon: {
    height: 20,
    width: 20,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    color: "black",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#FF3366",
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
  },
  forgotPasswordText: {
    color: "#D8D8D8",
    backgroundColor: "transparent",
    textAlign: "right",
    paddingRight: 15,
  },
  signupWrap: {
    backgroundColor: "#5F1B6C",
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  accountText: {
    color: "#D8D8D8"
  },
  signupLinkText: {
    color: "#FFF",
    marginLeft: 5,
    fontWeight: "700",
  }
});


module.exports = LoginScreen;