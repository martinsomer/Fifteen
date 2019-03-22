import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

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
        margin: 2.5,
        backgroundColor: 'transparent',
    },
});