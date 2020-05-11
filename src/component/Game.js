import React, { useState } from 'react';
import '../App.css';
import Tile from './Tile';
import Constants from '../constants/Constants';
import StyleConstants from '../constants/StyleConstants';

const Game = () => {
    const [board, setBoard] = useState(Array(Constants.MAXIMUM_NUMBER_OF_TILES).fill(Constants.EMPTY_VALUE));
    const [currentPlayer, setCurrentPlayer] = useState(Constants.PLAYER_X);

    const renderBoard = () => {
        let tiles = [];
        for (let tile = Constants.INITIAL_TILE_POSITION; tile < Constants.MAXIMUM_NUMBER_OF_TILES; tile++) {
            tiles.push(
                <Tile key={tile}
                    onClick={() => handleCurrentPlayerTurn(tile)}
                    value={board[tile]}
                />
            );
        }
        return tiles;
    }

    const handleCurrentPlayerTurn = (tile) => {
        const gameBoard = board.slice();
        gameBoard[tile] = currentPlayer;
        setBoard(gameBoard);
        setCurrentPlayer(currentPlayer === Constants.PLAYER_X ? Constants.PLAYER_O : Constants.PLAYER_X);
    }

    return (
        <div className={StyleConstants.APP}>
            <header className={StyleConstants.APP_HEADER}>
                {StyleConstants.APP_TITLE}
            </header>
            <div>
                <ul className={StyleConstants.BOARD}>
                    {renderBoard()}
                </ul>
            </div>
        </div>
    );
}
export default Game;