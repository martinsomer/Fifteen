import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';

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
        alert("You beat the game in " + this.state.moves + " moves!");
    }
    
    render() {
        return (
            <Text style={styles.movesText}>{this.state.moves} MOVES</Text>
        );
    }
}

const styles = StyleSheet.create({
    movesText: {
        textAlign: 'center',
        alignSelf: 'stretch',
        color: '#00BFA5',
        fontSize: 30,
        fontWeight: 'bold',
    }
});
