/**
 * Harassment Tracker
 * https://github.com/tijptjik/htracker
 * @tijptjik
 */

// React
import React, { Component } from 'react';
import { AppRegistry, View, Text, TextInput, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon } from 'native-base';


// Maps
import MapView from 'react-native-maps';
import HarassMaps from "./components/google/maps";
import DisplayLatLng from "./components/google/DisplayLatLng";

// Views
import LoginScreen from "./components/views/login";
import SignupScreen from "./components/views/signup";

// Experiment

AppRegistry.registerComponent('HarassmentTracker', () => LoginScreen);
