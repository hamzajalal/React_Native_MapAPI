import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import {
    Text,
    View,
    StyleSheet,
} from 'react-native';

import Home from './my/pages/Home.js';
import Login from './my/pages/Login.js';
import Map from './my/pages/Map.js';
import MainRc from './my/pages/MainRc.js';
import SignupPage from './my/pages/SignupPage.js';

const HamzaApp = StackNavigator({
    Login: { screen: Login },
    Home: { screen: Home },
    SignupPage: { screen: SignupPage },
    Map: { screen: Map },
    MainRc: { screen: MainRc },
});
    
export default HamzaApp;