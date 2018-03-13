import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import {
    FlatList,
    StyleSheet,
    Text,
    ImageBackground,
    Image,
    Alert,
    Platform,
    TouchableOpacity,
    Dimensions,
    TextInput,
    KeyboardAvoidingView
} from 'react-native';
import firebase from 'react-native-firebase';

export default class Login extends Component {
    static navigationOptions = {
        title: 'Sign Up'
    };

    constructor(props) {
        super(props);
        this.unsubscriber = null;
        this.state = {
            isAuthenticated: false,
            typedEmail: '',
            typedPassword: '',
            user: null,
        };
    }
    componentDidMount() {
        this.unsubscriber = firebase.auth().onAuthStateChanged((changedUser) => {
            console.log(`changed User : ${JSON.stringify(changedUser.toJSON())}`);
            this.setState({ user: changedUser });
        });
    }
    componentWillUnmount() {
        if (this.unsubscriber) {
            this.unsubscriber();
        }
    }
    onAnonymousLogin = () => {
        firebase.auth().signInAnonymously()
            .then(() => {
                console.log(`Login successfully`);
                this.setState({
                    isAuthenticated: true,
                });
            })
            .catch((error) => {
                console.log(`Login failed. Error = ${error}`);
            });
    }
    onRegister = () => {
        firebase.auth().createUserWithEmailAndPassword(this.state.typedEmail, this.state.typedPassword)
            .then((loggedInUser) => {
                this.setState({ user: loggedInUser })
                console.log(`Register with user : ${JSON.stringify(loggedInUser.toJSON())}`);
            }).catch((error) => {
                console.log(`Register fail with error: ${error}`);
            });
    }
    onLogin = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.typedEmail, this.state.typedPassword)
            .then((loggedInUser) => {
                console.log(`Login with user : ${JSON.stringify(loggedInUser.toJSON())}`);
            }).catch((error) => {
                console.log(`Login fail with error: ${error}`);
            });
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.key}>
            
            <ImageBackground style={styles.photo} source={require('..//images/LoginBack.png')}>
             <Text style={styles.header}> Sign Up </Text>

                <TouchableOpacity style={styles.button} onPress={this.onAnonymousLogin} 
                        onPress={() => navigate('Home')}>
                    <Text style={styles.buttontext}>Login Anonymous </Text>
                    </TouchableOpacity>
                <Text style={{ margin: 20, fontSize: 15, }}> {this.state.isAuthenticated == true ? 'Logged in anonymous' : ''} </Text>
                <TextInput
                    style={styles.textInput}
                    underlineColorIOS={'transparent'}
                    keyboardType='email-address'
                    placeholder='Enter your email'
                    autoCapitalize='none'
                    onChangeText={
                        (text) => {
                            this.setState({ typedEmail: text });
                        }
                    }
                />
                <TextInput
                    style={styles.textInput}
                    underlineColorIOS={'transparent'}
                    keyboardType='default'
                    placeholder='Enter your password'
                    secureTextEntry={true}
                    onChangeText={
                        (text) => {
                            this.setState({ typedPassword: text });
                        }
                    }
                />
                    <TouchableOpacity style={styles.button} onPress={this.onLogin} 
                        >
                    <Text style={styles.buttontext}>Login</Text>
                    </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={this.onRegister}
                        onPress={() => navigate('Home')}>
                    <Text style={styles.buttontext}>Register</Text>
                 </TouchableOpacity>        
                    

               </ImageBackground>
        </KeyboardAvoidingView>
        );
    }
}

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