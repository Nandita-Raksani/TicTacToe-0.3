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
        const positions = Constants.FIRST_ROW_TILES;
        if (positions.map((position) => board[position]).every((value, index, arr) => value && value === arr[0])) {
            return { player: board[positions[Constants.INITIAL_TILE_POSITION]], positions: positions };
        }
        return null;
    };

    const isSecondRowCompletedByAPlayer = (board) => {
        const positions = Constants.SECOND_ROW_TILES;
        if (positions.map((position) => board[position]).every((value, index, arr) => value && value === arr[0])) {
            return { player: board[positions[Constants.INITIAL_TILE_POSITION]], positions: positions };
        }
        return null;
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