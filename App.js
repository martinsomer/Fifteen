import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Tile from './components/Tile';

// Array for holding all tiles
const tiles = [];

// Object for tile
const tile = {
    index: null,
    pos_x: null,
    pos_y: null,
    isEmpty: false,
}

type Props = {};
export default class App extends Component<Props> {
    
    // Create tiles when component starts
    constructor(props) {
        super(props);
        
        let index = 0;
        
        for (let i=0; i<4; i++) {
            const children = [];
            
            for (let j=0; j<4; j++) {
                const t = Object.create(tile);
                t.index = index;
                t.pos_x = i;
                t.pos_y = j;
                index === 15 ? t.isEmpty = true : t.isEmpty = false; // Last tile is empty
                children.push(t);
                
                index++;
            }
            tiles.push(children);
        }
    }
    
    // Create the table for rendering
    createTable = () => {
        let table = [];

        // Outer loop to create parent
        for (let i=0; i<4; i++) {
            let children = [];
            
            // Inner loop to create children
            for (let j=0; j<4; j++) {
                
                // Check if a tile exists at this table index
                if (!tiles[i][j].isEmpty) {
                    children.push(<Tile key={tiles[i][j].index} onPress={() => this.tileTapped(tiles[i][j])} id={tiles[i][j].index + 1}></Tile>);
                } else {
                    children.push(<View style={styles.tableCell}></View>);
                }
            }
            
            // Create the parent and add the children
            table.push(<View style={styles.tableRow}>{children}</View>);
        }
        return table;
    }
    
    // Respond to touches
    tileTapped(tile) {
        alert(tile.index);
    }
    
    // Main render function
    render() {
        return (
            <View style={styles.container}>
                {this.createTable()}
            </View>
        );
    }
}

// Stylesheet
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    tableRow: {
        flexDirection: "row",
    },
    tableCell: {
        flex: 1,
        aspectRatio: 1,
        backgroundColor: 'darkgray',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
