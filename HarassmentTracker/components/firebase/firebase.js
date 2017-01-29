import * as firebase from "firebase";
import Config from 'react-native-config';

const geofire = require('geofire');


class Firebase {

    // Initialize Firebase

    static initialise() {
        firebase.initializeApp({
            // apiKey: Config.FIREBASE_API_KEY,
            apiKey: "AIzaSyCP0_UgQuzD56TbuNy24LeryDbKG5IHbk0",
            authDomain: "harassmenttracker.firebaseapp.com",
            databaseURL: "https://harassmenttracker.firebaseio.com",
            storageBucket: "harassmenttracker.appspot.com"
        });
    }

    static geofire(){
        geofireRef = new geofire(this.database().ref())
    }

}

module.exports = Firebase;