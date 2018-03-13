import React, { Component } from 'react';

import { Screen, Spinner, Overlay } from '@shoutem/ui';
import { stringify as queryString } from 'query-string';

import RecommendationsMap from '..//components/RecommendationsMap';
import { OverlayTopics, BottomTopics } from '..//components/Topics';

const CLIENT_ID = '4VMVDF0DJLP4DKSFNW210VFMEL1OJ3P5HAAQJGOC4YFYIOJ2';
const CLIENT_SECRET = 'ZXA5FEE4GJY4S525PBWUDM22R3FTNTOHKQ0FMJNV0GGBTYBU';
const FOURSQUARE_ENDPOINT = 'https://api.foursquare.com/v2/venues/explore';
const API_DEBOUNCE_TIME = 2000;

import styles from '..//components/RcStyles';


export default class App extends Component {
    state = {
        mapRegion: null,
        gpsAccuracy: null,
        recommendations: [ ],
        lookingFor: null,
        headerLocation: null,
        last4sqCall: null
}
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
                longitude: 60.169856,
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
            {enableHighAccuracy: true, timeout: 2000, maximumAge: 1000 })
        
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

    fetchVenues(region, lookingFor) {
        if (!this.shouldFetchVenues(lookingFor)) return;

        const query = this.venuesQuery(region, lookingFor);

        fetch(`${FOURSQUARE_ENDPOINT}?${query}`)
            .then(fetch.throwErrors)
            .then(res => res.json())
            .then(json => {
                if (json.response.groups) {
                    this.setState({
                        recommendations: json.response.groups.reduce(
                            (all, g) => all.concat(g ? g.items : []), []
                        ),
                        headerLocation: json.response.headerLocation,
                        last4sqCall: new Date()
                    });
                }
            })
            .catch(err => console.log(err));
}

    shouldFetchVenues(lookingFor) {
        return lookingFor != this.state.lookingFor
             || this.state.last4sqCall === null
             || new Date() - this.state.last4sqCall > API_DEBOUNCE_TIME;
}

    venuesQuery({ latitude, longitude }, lookingFor) {
        return queryString({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            v: 20170101,
            ll: `${latitude}, ${longitude}`,
            llAcc: this.state.gpsAccuracy,
            section: lookingFor || this.state.lookingFor || 'food',
            limit: 5,
            openNow: 1,
            venuePhotos: 1
        });
}

    onTopicSelect(lookingFor) {
        this.fetchVenues(this.state.mapRegion, lookingFor);

        this.setState({
            lookingFor: lookingFor
        });
}

    render() {
        const { mapRegion, lookingFor } = this.state;

        if (mapRegion) {
            return (
                <Screen>
                    <RecommendationsMap {...this.state} onRegionChange={this.onRegionChange.bind(this)} />

                    {!lookingFor ? <OverlayTopics onTopicSelect={this.onTopicSelect.bind(this)} />
                                 : <BottomTopics onTopicSelect={this.onTopicSelect.bind(this)} /> 
                    } 
                    
                    </Screen>
            );
    }else {
            return (
                <Screen style={styles.centered}>
                    <Spinner styleName="large" />
                </Screen>
            );
        }
};
};
