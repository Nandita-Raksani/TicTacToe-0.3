import React, { useState } from 'react';
import '../App.css';
import Tile from './Tile';
import Status from './Status';
import Constants from '../constants/Constants';
import StyleConstants from '../constants/StyleConstants';

const Game = () => {
    const [board, setBoard] = useState(Array(Constants.MAXIMUM_NUMBER_OF_TILES).fill(Constants.EMPTY_VALUE));
    const [currentPlayer, setCurrentPlayer] = useState(Constants.PLAYER_X);
    const [gameWinningTiles, setGameWinningTiles] = useState([]);
    const [gameHasWinner, setGameHasWinner] = useState(false);

    const renderBoard = () => {
        let tiles = [];
        for (let tile = Constants.INITIAL_TILE_POSITION; tile < Constants.MAXIMUM_NUMBER_OF_TILES; tile++) {
            tiles.push(
                <Tile key={tile}
                    onClick={() => handleCurrentPlayerTurn(tile)}
                    value={board[tile]}
                    gameHasWinner={gameHasWinner}
                    isWinningTile={gameWinningTiles && gameWinningTiles.includes(tile)}
                />
            );
        }
        return tiles;
    }

    const handleCurrentPlayerTurn = (tile) => {
        const gameBoard = board.slice();
        gameBoard[tile] = currentPlayer;
        setBoard(gameBoard);
        togglePlayer();
    }

    const togglePlayer = () => {
        setCurrentPlayer(currentPlayer === Constants.PLAYER_X ? Constants.PLAYER_O : Constants.PLAYER_X);
    }

    const handlePlayerWon = (winningTiles) => {
        setGameWinningTiles(winningTiles);
        setGameHasWinner(true);
    }

    return (
        <div className={StyleConstants.APP}>
            <header className={StyleConstants.APP_HEADER}>
                {StyleConstants.APP_TITLE}
            </header>
            <div>
                <div className={StyleConstants.STATUS}>
                    <Status currentPlayer={currentPlayer}
                        board={board}
                        onPlayerWin={(winningTiles) => handlePlayerWon(winningTiles)} />
                </div>
                <ul className={StyleConstants.BOARD}>
                    {renderBoard()}
                </ul>
            </div>
        </div>
    );
}
export default Game;