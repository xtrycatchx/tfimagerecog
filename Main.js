

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import Camera from './Camera'
import Recognition from './Recognition'

const Navigator = StackNavigator({
    Camera: { screen: Camera },
    Recognition: { screen: Recognition },
});

export default class Main extends Component {
    render() {
        return (<Navigator />)
    }
}