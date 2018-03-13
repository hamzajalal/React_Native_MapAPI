//@flow
import React, { Component } from 'react';
import * as firebase from 'firebase';

  const config = {
    apiKey: "AIzaSyBfOksVAp_Yo9FCusVeBQT5klvrHy_flZM",
    authDomain: "travelapp-11e4d.firebaseapp.com",
    databaseURL: "https://travelapp-11e4d.firebaseio.com",
    projectId: "travelapp-11e4d",
    storageBucket: "travelapp-11e4d.appspot.com",
    messagingSenderId: "99815309732"
  };


export default class Firebase extends Component {
    
    static auth;
    static registrationInfo = {
        userName: "",
        email: "",
    };
    
    static init() {
        firebase.initializeApp(config);
        Firebase.auth = firebase.auth();
    }
}