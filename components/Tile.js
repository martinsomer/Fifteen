import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

type Props = {};
export default class Tile extends Component<Props> {
    render() {
        return (
            <TouchableOpacity activeOpacity={0.45} style={styles.tile} onPress={this.props.onPress}>
                <Text style={styles.tileNumber}>{this.props.id}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    tile: {
        flex: 1,
        aspectRatio: 1,
        borderRadius: 5,
        margin: 2.5,
        backgroundColor: '#00BFA5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tileNumber: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 50,
    }
});
