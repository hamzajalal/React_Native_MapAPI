import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import firebase from 'react-native-firebase';

import {
    Text,
    View,
    StyleSheet,
} from 'react-native';
import HamzaApp from './ScreenManager.js';

export default class App extends Component {
   
    render() {
        return (
            <HamzaApp />
        
    );
};
};