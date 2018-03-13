import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import {
    Text,
    View,
    StyleSheet,
    ImageBackground,
    Image,
    KeyboardAvoidingView,
    TouchableOpacity,
    TextInput
} from 'react-native';
import autobind from 'autobind-decorator';
import Spinner from '@shoutem/ui';

import Firebase from '..//components/Firebase';

export default class SignupPage extends Component {
    static navigationOptions = {
        title: 'Sign Up'
    };

    state = { username: '', email: '', password: '', loading: false };


    render() {
        const { navigate } = this.props.navigation;
        return (
        <KeyboardAvoidingView behavior='padding' style={styles.key}>
            
            <ImageBackground style={styles.photo} source={require('../images/LoginBack.png')}>
            
            <Text style={styles.header}> Sign Up </Text>

            <TextInput
                    placeholder= 'Username'
                    style={styles.textInput}
                    autoCapitalize='none'
                    autoCorrect={false}
                    returnKeyType='next'
                    value={this.state.username}
                    onChangeText={username => this.setState({ username })}
                    underlineColorIOS={'transparent'}
/>

            <TextInput
                    placeholder= 'Email'
                    style={styles.textInput}
                    underlineColorIOS={'transparent'}
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
/>
            
            <TextInput
                    placeholder= 'Password'
                    secureTextEntry={true}
                    style={styles.textInput}
                    underlineColorIOS={'transparent'}
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
/>            
            
            <TouchableOpacity style={styles.button} onPress={() => navigate('Home')} >
                
                    <Text style={styles.buttontext}>Create</Text>
                </TouchableOpacity>

            </ImageBackground>
        </KeyboardAvoidingView>
        );
    }
};
    
const styles = StyleSheet.create({
    key: {
     flex: 1,
     alignSelf: 'stretch',
    },
    
    photo: {
        flex: 1,
        width: null,
        alignSelf: 'stretch',
        height: null,
        justifyContent: 'center',
        alignItems: 'center'
    },
    
    header: {
        fontSize: 40,
        color: '#ffffff',
        fontWeight: 'bold',
        backgroundColor: 'rgba(0,0,0,0)',
        marginBottom: 60
    },
    
    textInput: {
        width: 280,
        height: 58,
        padding: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        marginBottom: 20,
        borderRadius: 25,
    },
    
    button: {
        width: 280,
        marginTop: 25,
        backgroundColor: 'rgba(0, 0, 0.1, 0.7)',
        alignItems: 'center',
        padding: 15,
        borderWidth: 1,
        borderRadius: 25,
    },
    signupbutton: {
        width: 280,
        marginTop: 25,
        backgroundColor: 'rgba(0, 0, 0.1, 0.9)',
        alignItems: 'center',
        padding: 15,
        borderRadius: 25,
    },
    buttontext: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fcf75f'
    }
            
});