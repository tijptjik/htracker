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

const { width, height } = Dimensions.get("window");

const background = require('../../img/impressed.png');

class SignupScreen extends Component {

  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      wrapperHeight: { marginTop: 160 }
    }
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
      wrapperHeight: {marginTop: 160}
    })
  }


  render() {
    return (
      <View style={styles.container}>
        <Image source={background} style={styles.background} resizeMode="cover">

          <View style={styles.headerContainer}>

            <View style={styles.headerTitleView}>
              <Text style={styles.titleViewText}>Sign Up</Text>
            </View>

          </View>

          <View style={styles.inputsContainer}>

            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Icon name="ios-mail" style={styles.inputIcon}/>
              </View>
              <TextInput
                style={[styles.input, styles.whiteFont]}
                placeholder="Email"
                placeholderTextColor="#FFF" 
              />
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Icon name="ios-lock" style={styles.inputIcon}/>
              </View>
              <TextInput
                secureTextEntry={true}
                style={[styles.input, styles.whiteFont]}
                placeholder="Password"
                placeholderTextColor="#FFF" 
              />
            </View>

          </View>

          <View style={styles.footerContainer}>

            <TouchableOpacity activeOpacity={.8}>
              <View style={styles.signup}>
                <Text style={styles.joinFont}>Join</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={.8}>
              <View style={styles.signin}>
                <Text style={styles.greyFont}>Already have an account?<Text style={styles.whiteFont}> Sign In</Text></Text>
              </View>
            </TouchableOpacity>
          </View>
        </Image>
      </View>
    );
  }
}



let styles = StyleSheet.create({
  container: {
    flex: 3,
  },
  background: {
    width,
    height,
  },
  headerContainer: {
    flex: 1,
    backgroundColor: "#D0D0D0CC"
  },
  inputsContainer: {
    flex: 1.5,
    backgroundColor: "#D0D0D0CC",
    marginTop: 0,
  },
  footerContainer: {
    backgroundColor: "#D0D0D0CC",
    flex: 2.5
  },
  headerIconView: {
    marginLeft: 10,
    backgroundColor: 'transparent'
  },
  headerTitleView: {
    backgroundColor: 'transparent',
    marginTop: 65,
    marginLeft: 25,
  },
  titleViewText: {
    fontSize: 40,
    color: '#fff',
  },
  inputs: {
    paddingVertical: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderBottomColor: '#CCC',
    borderColor: 'transparent',
    flexDirection: 'row',
    height: 75,
  },
  iconContainer: {
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputIcon: {
    width: 30,
    height: 30,
  },
  input: {
    flex: 1,
    fontSize: 20,
  },
  signup: {
    backgroundColor: '#FF3366',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  signin: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginHorizontal: 40,
    paddingVertical: 10,
    backgroundColor: '#717171',
  },
  greyFont: {
    color: '#D8D8D8'
  },
  whiteFont: {
    color: '#FFF'
  },
  joinFont: {
    fontSize: 24,
    color: '#FFF'
  }
})

module.exports = SignupScreen;