/**
 * @class Home
 */

import React, {Component} from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableWithoutFeedback
} from "react-native";

import * as firebase from "firebase";


import Button from "apsl-react-native-button";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import {Kohana} from "react-native-textinput-effects";

import CommonStyle from "../styles/common.css";
import Database from "../firebase/database";
import DismissKeyboard from "dismissKeyboard";

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            uid: "",
            mobile: "",
            mobileForm: "",
            busForm: ""
        };

        this.logout = this.logout.bind(this);
        this.saveMobile = this.saveMobile.bind(this);

    }

    async logout() {

        try {

            await firebase.auth().signOut();

            this.props.navigator.push({
                name: "Login"
            })

        } catch (error) {
            console.log(error);
        }

    }

    async componentDidMount() {

        try {

            // Get User Credentials
            let user = await firebase.auth().currentUser;

            // Listen for Mobile Changes
            Database.listenUserMobile(user.uid, (mobileNumber) => {
                this.setState({
                    mobile: mobileNumber,
                    mobileForm: mobileNumber,
                    busForm: mobileNumber,
                });
            });

            this.setState({
                uid: user.uid
            });

        } catch (error) {
            console.log(error);
        }

    }

    saveMobile() {

        // Set Mobile
        if (this.state.uid && this.state.mobileForm) {
            Database.setUserMobile(this.state.uid, this.state.mobileForm);
            DismissKeyboard();
        }

    }

    render() {

        return (
            <TouchableWithoutFeedback onPress={() => {DismissKeyboard()}}>
                <View style={CommonStyle.container}>
                    <Text style={styles.heading}>Hello UserId: {this.state.uid}</Text>
                    <Text style={styles.heading}>Mobile Number (From Database): {this.state.mobile}</Text>
                    <Kohana
                        style={{ backgroundColor: '#f9f5ed' }}
                        label={'Line'}
                        iconClass={FontAwesomeIcon}
                        iconName={'bus'}
                        iconColor={'#f4d29a'}
                        labelStyle={{ color: '#91627b' }}
                        inputStyle={{ color: '#91627b' }}
                        value={this.state.busForm}
                        onChangeText={(busForm) => this.setState({busForm})}
                      />
                    <Kohana
                        style={[styles.input, { backgroundColor: '#f9f5ed' }]}
                        label={'Phone'}
                        iconClass={FontAwesomeIcon}
                        iconName={'phone'}
                        iconColor={'#ddd'}
                        iconColor={'#f4d29a'}
                        labelStyle={{ color: '#91627b' }}
                        inputStyle={{ color: '#91627b' }}
                        value={this.state.mobileForm}
                        onChangeText={(mobileForm) => this.setState({mobileForm})}
                      />
                        <Button onPress={this.saveMobile} style={CommonStyle.buttons} textStyle={{fontSize: 18}}>
                            Save
                        </Button>
                    <View style={styles.logout}>
                        <Button onPress={this.logout} style={CommonStyle.buttons} textStyle={{fontSize: 18}}>
                            Logout
                        </Button>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({

    heading: {
        textAlign: "center"
    },

    logout: {
        padding: 50
    },

    form: {
        paddingTop: 50
    }

});

module.exports = Home;