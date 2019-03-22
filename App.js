import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Tile from './components/Tile';
import EmptyTile from './components/EmptyTile';

// Constructor for tile
function tile(index, isEmpty) {
    this.index = index;
    this.isEmpty = isEmpty;
}

type Props = {};
export default class App extends Component<Props> {
    
    // Create and scramble tiles when component starts
    constructor(props) {
        super(props);
        
        this.state = {
            tiles: [],
        };
        
        this.generateTiles();
        this.scrambleTiles();
    }
    
    // Generate tiles into 2D array
    generateTiles() {
        let index = 0;
        const tiles = [];
        
        for (let i=0; i<4; i++) {
            const children = [];
            
            for (let j=0; j<4; j++) {
                children.push(new tile(index, index === 15 ? true : false));
                index++;
            }
            
            tiles.push(children);
        }
        
        // Save generated tiles
        this.state = {
            tiles: tiles,
        };
    }
    
    // Randomize indexes of tiles
    scrambleTiles() {
        
        // Create a copy of tiles
        const tiles = this.state.tiles;
        
        // Scarmble array of random numbers (leave last item same)
        const randomNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        for (let i=0; i<randomNumbers.length - 1; i++) {
            const randomNum = Math.floor(Math.random()*14) + 1;
            [randomNumbers[i], randomNumbers[randomNum]] = [randomNumbers[randomNum], randomNumbers[i]]
        }
        
        // Assign array items to tile indexes
        let index = 0;
        for (let i=0; i<4; i++) {
            for (let j=0; j<4; j++) {
                tiles[i][j].index = randomNumbers[index];
                index++;
            }
        }
        
        // Save new position of tiles
        this.state = {
            tiles: tiles,
        };
    }
    
    // Create the table for rendering
    createTable() {
        
        // Create a copy of tiles
        const tiles = this.state.tiles;
        
        // Generate 2D array for tiles
        const table = [];
        for (let i=0; i<4; i++) {
            const children = [];
            for (let j=0; j<4; j++) {
                // Check if a tile at this index is empty
                if (!tiles[i][j].isEmpty) {
                    children.push(<Tile key={tiles[i][j].index} onPress={() => this.tileTapped(i, j)} id={tiles[i][j].index + 1}></Tile>);
                } else {
                    children.push(<EmptyTile key={tiles[i][j].index}></EmptyTile>);
                }
            }
            table.push(<View key={i} style={styles.tableRow}>{children}</View>);
        }
        return table;
    }
    
    // Respond to touches
    tileTapped(tile_x, tile_y) {
        
        // Create a copy of tiles
        const tiles = this.state.tiles;
        
        //find empty tile's position
        let emptyTile_x;
        let emptyTile_y;
        
        for (let i=0; i<4; i++) {
            for (let j=0; j<4; j++) {
                if (tiles[i][j].isEmpty === true) {
                    emptyTile_x = i;
                    emptyTile_y = j;
                    i = j = 4;
                    break;
                }
            }
        }
        
        if ((
            // Tiles are adjacent on X axis and on the same Y axis
            (tile_x+1 === emptyTile_x ||
            tile_x-1 === emptyTile_x
            ) && tile_y === emptyTile_y
        ) || ((
            // Tiles are adjacent on Y axis and on the same X axis
            tile_y+1 === emptyTile_y ||
            tile_y-1 === emptyTile_y
            ) && tile_x === emptyTile_x
        )) {
             // Swap tiles
            [tiles[tile_x][tile_y], tiles[emptyTile_x][emptyTile_y]] = [tiles[emptyTile_x][emptyTile_y], tiles[tile_x][tile_y]]
        }
        
        // Save new position of tiles
        this.setState({
           tiles: tiles,
        });
        
        this.checkForWin();
    }
    
    checkForWin() {
        let win = true;
        let index = 0;
        for (let i=0; i<4; i++) {
            for (let j=0; j<4; j++) {
                if (this.state.tiles[i][j].index != index) {
                    win = false;
                    i = j = 4;
                    break;
                }
                index++;
            }
        }
        if (win) {
            alert("You win!");
            this.scrambleTiles();
        }
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
});
