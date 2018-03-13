import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { StackNavigator } from 'react-navigation';

import {
    Platform,
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

export default class Map extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initialPosition: {
                latitude: 24.938379,
                longitude: 60.169856,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            markerPosition: {
                latitude: 24.938379,
                longitude: 60.169856
            }
        }
}
    
    watchID: null

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            var lat = parseFloat(position.coords.latitude)
            var long = parseFloat(position.coords.longitude)
            
            var initialRegion = {
                latitude: lat,
                longitude: long,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            }
            
            this.setState({initialPosition: initialRegion})
            this.setState({markerPosition: initialRegion})
        },
            (error) => alert(JSON.stringify(error)),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 })
        
        this.watchID = navigator.geolocation.watchPosition((position) => {
            var lat = parseFloat(position.coords.latitude)
            var long = parseFloat(position.coords.longitude)
            
            var lastRegion = {
                latitude: lat,
                longitude: long,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            }
            
            this.setState({initialPosition: lastRegion})
            this.setState({markerPosition: lastRegion})
            })
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID)
    }

    render() {
        return (
        <View style= {styles.container}>
            <MapView 
                style={styles.map}
                region={this.state.initialPosition}>
            
            <MapView.Marker 
                coordinate={this.state.markerPosition}>
                <View style={styles.radius}>
                    <View style={styles.marker}>
                </View>
                    </View>
            </MapView.Marker>
            </MapView>
        </View>
        );
    }
    
};

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    marker: {
        height: 20,
        width: 20,
        borderWidth: 3,
        borderColor: 'white',
        borderRadius: 20 / 2,
        overflow: 'hidden',
        backgroundColor: '#007AFF'
    },
    radius: {
        height: 50,
        width: 50,
        borderWidth: 1,
        borderColor: 'rgba(0, 122, 255, 0.3)',
        borderRadius: 50 / 2,
        overflow: 'hidden',
        backgroundColor: 'rgba(0, 122, 255, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute'
    },
    
})