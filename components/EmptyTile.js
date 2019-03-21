import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

type Props = {};
export default class EmptyTile extends Component<Props> {
    render() {
        return (
            <View style={styles.emptyTile} />
        );
    }
}

const styles = StyleSheet.create({
    emptyTile: {
        flex: 1,
        aspectRatio: 1,
        margin: 5,
        marginRight: 2.5,
        marginLeft: 2.5,
        backgroundColor: 'transparent',
    },
});