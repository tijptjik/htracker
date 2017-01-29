
// React
import React, { Component } from 'react';
import {
  AppRegistry,
  ScrollView,
  StyleSheet,
  Button,
  Text,
  View
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

// Firebase
import * as firebase from "firebase";
import Firebase from "./components/firebase/firebase";

// GeoFire
const geofire = require('geofire');

// Maps
import MapView from 'react-native-maps';
import HarassMaps from "./components/google/maps";
import DisplayLatLng from "./components/google/DisplayLatLng";

// Views
import Home from "./components/views/home";
import Login from "./components/views/login";

// class LoginScreen extends React.Component {
//   render() {
//     const {navigate} = this.props.navigation;

//     return (
//       <View>
//         <Text>This is the home screen of the app</Text>
//         <Button
//           onPress={() => navigate('Home', {name: 'Brent'})}
//           title="Go to Brent's profile"
//         />
//       </View>
//      )
//    }
// }



class WelcomeScreen extends Component {

  constructor(props) {
    super(props);

    // this.getInitialView();

    // this.state = {
      // userLoaded: false,
      // initialView: null
    // };

    this.getInitialView = this.getInitialView.bind(this);

  }

  static getInitialView() {

    firebase.auth().onAuthStateChanged((user) => {

      let initialView = user ? "Home" : "Login";

      this.setState({
        userLoaded: true,
        initialView: initialView
      })
    });

  }

  static navigationOptions = {
    title: 'Harassment Tracker',
    header: {visible:false},
    headerMode: 'none'
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>Sign up / Log In!</Text>
        <Button
          title="Login"
          onPress={() => navigate({
            type: 'Navigate',
            routeName: 'MainScreenNavigator',
            action: {
              type: 'Navigate',
              routeName: 'Personal',
              }
            })
          }
        />
      </View>
    );
  }
}

class MainScreen extends Component {

  static navigationOptions = {
    header: {visible:false},
    // Nav options can be defined as a function of the navigation prop:
    title: ({ state }) => `Chat with ${state.params.user}`,
  };

  render() {
    // The screen's current route is passed in to `props.navigation.state`:
    const { params } = this.props.navigation.state;
    return (
      <View>
        <Text>Chat with {params.user}</Text>
      </View>
    );
  }
}

class MyInstancesScreen extends React.Component {
  render() {
     return (
        <Text>List of all contacts</Text>,
        <Button
          onPress={() => this.props.navigation.navigate('InstanceScreen', { user: 'Z' })}
          title="Chat with Z"
          />
      )  
  }
}

class AllInstancesScreen extends React.Component {
  render() {
    return (
      <Text>List of all contacts</Text>,
      <Button
        onPress={() => this.props.navigation.navigate('InstanceScreen', { user: 'X' })}
        title="Chat with X"
      />
    )
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <Text>Settings</Text>,
      <Button
        onPress={() => this.props.navigation.navigate('InstanceScreen', { user: 'Y' })}
        title="Chat with Y"
      />
    )
  }
}


class InstanceScreen extends React.Component {
  static navigationOptions = {
    title: ({ state }) => {
      if (state.params.mode === 'info') {
        return `${state.params.user}'s Contact Info`;
      }
      return `Chat with ${state.params.user}`;
    },
    header: ({ state, setParams }) => {
      // The navigation prop has functions like setParams, goBack, and navigate.
      let right = (
        <Button
          title={`${state.params.user}'s info`}
          onPress={() => setParams({ mode: 'info' })}
        />
      );
      if (state.params.mode === 'info') {
        right = (
          <Button
            title="Done"
            onPress={() => setParams({ mode: 'none' })}
          />        
        );
      }
      return { right };
    },
  }
}

const MainScreenNavigator = TabNavigator({
  Personal: { screen: MyInstancesScreen },
  All: { screen: AllInstancesScreen },
});

// App Logic

class Main extends Component {

  static renderScene(route, navigator) {

    switch (route.name) {

      case "Home":
        return (<Home navigator={navigator} />);
        break;

      case "Login":
        return (<Login navigator={navigator} />);
        break;

    }

  }

  static configureScene(route) {

    if (route.sceneConfig) {
      return (route.sceneConfig);
    } else {
      return ({
        ...Navigator.SceneConfigs.HorizontalSwipeJump,
        gestures: {}
      });
    }

  }

  render() {

    if (this.state.userLoaded) {

      return (
          <Navigator
              initialRoute={{name: this.state.initialView}}
              renderScene={App.renderScene}
              configureScene={App.configureScene}
          />);
    } else {
      return null;
    }

  }

}

//   render() {
//     return (
//       <View style={styles.container}>
//         <ScrollView
//             style={StyleSheet.absoluteFill}
//             contentContainerStyle={styles.scrollview}
//             showsVerticalScrollIndicator={false}
//           >
//             <DisplayLatLng/>
//           </ScrollView>
//       </View>
//     )
//   }
// }




// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   scrollview: {
//     alignItems: 'center',
//     paddingVertical: 40,
//     height: 656,
//   },
//   button: {
//     flex: 1,
//     marginTop: 10,
//     backgroundColor: 'rgba(220,220,220,0.7)',
//     paddingHorizontal: 18,
//     paddingVertical: 12,
//     borderRadius: 20,
//   },
//   back: {
//     position: 'absolute',
//     top: 20,
//     left: 12,
//     backgroundColor: 'rgba(255,255,255,0.4)',
//     padding: 12,
//     borderRadius: 20,
//     width: 80,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

const App = StackNavigator({
  Welcome: { screen: WelcomeScreen }
});