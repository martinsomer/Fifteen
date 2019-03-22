import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

type Props = {};
export default class Moves extends Component<Props> {
    
    constructor(props) {
        super(props);
        
        this.state = {
            moves: 0,
        };
    }
    
    increaseMoveCount() {
        this.setState({
           moves: this.state.moves + 1,
        });
    }
    
    resetMovesCount() {
        this.setState({
           moves: 0,
        });
    }
    
    win() {
        alert("You won with " + this.state.moves + " moves!");
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.movesText}>MOVES: {this.state.moves}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
    },
    movesText: {
        color: '#00BFA5',
        fontSize: 35,
        fontWeight: 'bold',
    }
});