import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Tile from './components/Tile';
import EmptyTile from './components/EmptyTile';
import Moves from './components/Moves';

// Tile constructor
function tile(index) {
    this.index = index;
}

type Props = {};
export default class App extends Component<Props> {
    
    // Create and scramble tiles
    constructor(props) {
        super(props);
        
        this.state = {
            tiles: (() => this.scrambleTiles(this.generateTiles()))(),
            emptyTile: {
                pos_x: 3,
                pos_y: 3,
            },
        };
    }
    
    // Generate 2D array of tiles
    generateTiles() {
        let index = 0;
        const tiles = [];
        
        for (let i=0; i<4; i++) {
            const row = [];
            
            for (let j=0; j<4; j++) {
                row.push(new tile(index));
                index++;
            }
            
            tiles.push(row);
        }
        
        return tiles;
    }
    
    // Randomize indexes of tiles
    scrambleTiles(tiles) {
        
        // Scarmble array of random numbers (leave last item unchanged)
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
        
        return tiles;
    }
    
    // Create table for rendering
    renderTable() {
        
        // Generate 2D array of tiles
        const table = [];
        for (let i=0; i<4; i++) {
            const row = [];
            
            for (let j=0; j<4; j++) {
                if (this.state.emptyTile.pos_x !== i || this.state.emptyTile.pos_y !== j) {
                    row.push(<Tile key={this.state.tiles[i][j].index} onPress={() => this.tileTapped(i, j)} id={this.state.tiles[i][j].index + 1}></Tile>);
                } else {
                    row.push(<EmptyTile key={this.state.tiles[i][j].index}></EmptyTile>);
                }
            }
            table.push(<View key={i} style={styles.tableRow}>{row}</View>);
        }
        return table;
    }
    
    tileTapped(tile_x, tile_y) {
        
        let empty_x = this.state.emptyTile.pos_x;
        let empty_y = this.state.emptyTile.pos_y;
        
        if ((
            // Tiles are adjacent on X axis and on the same Y axis
            (tile_x+1 === empty_x ||
            tile_x-1 === empty_x
            ) && tile_y === empty_y
        ) || ((
            // Tiles are adjacent on Y axis and on the same X axis
            tile_y+1 === empty_y ||
            tile_y-1 === empty_y
            ) && tile_x === empty_x
        )) {
            // Swap tiles
            const tiles = this.state.tiles;
            [tiles[tile_x][tile_y], tiles[empty_x][empty_y]] = [tiles[empty_x][empty_y], tiles[tile_x][tile_y]];
            
            this.setState({
               tiles: tiles,
                emptyTile: {
                    pos_x: tile_x,
                    pos_y: tile_y,
                },
            });
            
            this.refs.movesComponent.increaseMoveCount();
        }
        
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
            this.refs.movesComponent.win();
            this.refs.movesComponent.resetMovesCount();
            
            this.setState({
               tiles: (() => this.scrambleTiles(this.state.tiles))(),
                emptyTile: {
                    pos_x: 3,
                    pos_y: 3,
                },
            });
        }
    }
    
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Moves ref='movesComponent' {...this.props}/>
                </View>
                <View style={styles.content}>
                    <View style={styles.tilesContainer}>
                        {this.renderTable()}
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    header: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flex: 4,
    },
    tilesContainer: {
        margin: 2.5,
    },
    tableRow: {
        flexDirection: "row",
    },
});
