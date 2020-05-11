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
        const winner = isRowCompletedByAPlayer(board) || isColumnCompletedByAPlayer(board)
            || isLeftDiagonalCompletedByAPlayer(board);
        if (winner && winner.player) {
            setGameStatus(Constants.WINNER + winner.player);
            props.onPlayerWin(winner.positions);
        } else {
            setGameStatus(Constants.CURRENT_PLAYER + (currentPlayer));
        }
    };

    const isRowCompletedByAPlayer = (board) => {
        return isFirstRowCompletedByAPlayer(board) || isSecondRowCompletedByAPlayer(board)
            || isThirdRowCompletedByAPlayer(board);
    };

    const isColumnCompletedByAPlayer = (board) => {
        return isFirstColumnCompletedByAPlayer(board)
            || isSecondColumnCompletedByAPlayer(board) || isThirdColumnCompletedByAPlayer(board)
    };

    const isFirstRowCompletedByAPlayer = (board) => {
        return isPositionsOccupiedBySamePlayer(board, Constants.FIRST_ROW_TILES);
    };

    const isSecondRowCompletedByAPlayer = (board) => {
        return isPositionsOccupiedBySamePlayer(board, Constants.SECOND_ROW_TILES);
    };

    const isThirdRowCompletedByAPlayer = (board) => {
        return isPositionsOccupiedBySamePlayer(board, Constants.THIRD_ROW_TILES);
    };

    const isFirstColumnCompletedByAPlayer = (board) => {
        return isPositionsOccupiedBySamePlayer(board, Constants.FIRST_COLUMN_TILES);
    };

    const isSecondColumnCompletedByAPlayer = (board) => {
        return isPositionsOccupiedBySamePlayer(board, Constants.SECOND_COLUMN_TILES);
    };

    const isThirdColumnCompletedByAPlayer = (board) => {
        return isPositionsOccupiedBySamePlayer(board, Constants.THIRD_COLUMN_TILES);
    };

    const isLeftDiagonalCompletedByAPlayer = (board) => {
        return isPositionsOccupiedBySamePlayer(board, Constants.LEFT_DIAGONAL_TILES);
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