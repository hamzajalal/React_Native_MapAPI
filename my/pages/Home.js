import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import { 
    Platform,
    View,
    Text,
    StyleSheet,
    Image,
    ImageBackground,
    ScrollView,
    TouchableOpacity
} from 'react-native';

export default class Home extends Component {
    static navigationOptions ={
        title: 'Home',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
                <ScrollView contentContainerStyle={styles.contentContainer}>
                 <ImageBackground source= {require('..//images/current.jpg')} style={styles.location} >
                        <TouchableOpacity style={styles.topoverlayHeader} onPress={() => navigate ('Map')}>
                            <Text style={styles.topbuttontext}> Helsinki</Text>
                            <Text> Current Location </Text>
                        </TouchableOpacity>              
                </ImageBackground>

                 <ImageBackground style={styles.col1} source={require('..//images/lapland.jpg')}>
                    <TouchableOpacity style={styles.overlayHeader} onPress={() => navigate ('MainRc')}>
                        <Text style={styles.buttontext}> Lapland </Text>
                    </TouchableOpacity>
                </ImageBackground>

                <ImageBackground style={styles.col1} source={require('..//images/Oulu.jpg')}>
                    <TouchableOpacity style={styles.overlayHeader}>
                        <Text style={styles.buttontext}>Oulu</Text>
                    </TouchableOpacity>                                      
                </ImageBackground>
            
                <ImageBackground style={styles.contentLow} source={require('..//images/tampere.jpg')}>
                    <TouchableOpacity style={styles.overlayHeader}>
                        <Text style={styles.buttontext}>Tampere</Text>
                    </TouchableOpacity>
                </ImageBackground> 
                                                                   
                <ImageBackground style={styles.col1} source={require('..//images/Vantaa.jpg')}>
                    <TouchableOpacity style={styles.overlayHeader}>
                        <Text style={styles.buttontext}>Vantaa</Text>
                    </TouchableOpacity>
                </ImageBackground>
                                                             
                <ImageBackground style={styles.col1} source={require('..//images/Turku.jpg')}>
                    <TouchableOpacity style={styles.overlayHeader}>
                        <Text style={styles.buttontext}>Turku</Text>
                    </TouchableOpacity>
                </ImageBackground>
                </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    contentContainer: { 
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 5,
},
    location: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        height: 210,
        width: '100%',
        padding: 5,
},
    topoverlayHeader: {
        alignSelf: 'center',
        marginTop: 25,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        alignItems: 'center',
        padding: 10,
        borderRadius: 25,
},
    overlayHeader: {
        justifyContent: 'center',
        marginTop: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        alignItems: 'center',
        padding: 10,
        borderRadius: 25,
},  
    buttontext: {
        fontSize: 20,
},
    topbuttontext: {
        fontSize: 25,
        fontWeight: 'bold',
},
    col1: {
        flex: 2,
        padding: 5,
        height: 160,
        marginLeft: 1,
        marginRight: 1,
        marginTop: 1,
        alignItems: 'center',
},
     contentLow: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        height: 170,
        marginTop: 4,
        marginBottom: 4,
},
});