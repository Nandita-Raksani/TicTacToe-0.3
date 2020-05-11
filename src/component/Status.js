import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Constants from '../constants/Constants';

const Status = (props) => {
    const [gameStatus, setGameStatus] = useState();

    useEffect(() => {
        getStatus();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.board])

    const getStatus = () => {
        const { currentPlayer, board } = props;
        const winner = isFirstRowCompletedByAPlayer(board) || isSecondRowCompletedByAPlayer(board);
        if (winner && winner.player) {
            setGameStatus(Constants.WINNER + winner.player);
            props.onPlayerWin(winner.positions);
        } else {
            setGameStatus(Constants.CURRENT_PLAYER + (currentPlayer));
        }
    };

    const isFirstRowCompletedByAPlayer = (board) => {
        return isPositionsOccupiedBySamePlayer(board, Constants.FIRST_ROW_TILES);
    };

    const isSecondRowCompletedByAPlayer = (board) => {
        return isPositionsOccupiedBySamePlayer(board, Constants.SECOND_ROW_TILES);
    };

    const isPositionsOccupiedBySamePlayer = (board, tiles) => {
        if (tiles.map((position) => board[position]).every((tile, index, arr) => tile && tile === arr[0])) {
            return { player: board[tiles[Constants.INITIAL_TILE_POSITION]], positions: tiles };
        }
        return Constants.EMPTY_VALUE;
    };

    return (
        <label>{gameStatus}</label>
    );
}
Status.propTypes = {
    currentPlayer: PropTypes.string.isRequired,
    board: PropTypes.array.isRequired
};
export default Status;