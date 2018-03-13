import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import { 
    View,
    Text,
    StyleSheet,
    Image,
    ImageBackground,
    
} from 'react-native';

import LaplandOverlay from './LaplandOverlay';
import CustomImage from './CustomImage';
import OuluOverlay from './OuluOverlay';

export default class HelPlaces extends Component {
    render() {
        return (
            <View style={styles.city2}>
            
                <ImageBackground style={styles.col1} source={require('..//images/lapland.jpg')}>
                    <LaplandOverlay />
                </ImageBackground>

                <ImageBackground style={styles.col1} source={require('..//images/Oulu.jpg')}>
                    <OuluOverlay />
                                                             
                    </ImageBackground>
            
                <View style={styles.contentLow}>
                    <CustomImage imageSource={require('..//images/tampere.jpg')}
                    />
                </View>                           
                <View style={styles.col1}>
                    <CustomImage imageSource={require('..//images/Vantaa.jpg')}
                    />
                </View>
                <View style={styles.col2}>
                    <CustomImage imageSource={require('..//images/Turku.jpg')}
                    />
                    </View>
            
            </View>
        );
    }
}

const styles = StyleSheet.create({
    city2: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 5,
},
    col1: {
        flex: 1,
        padding: 5,
    },
     col2: {
        flex: 2,
        padding: 5,
    },
     contentLow: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },
});
