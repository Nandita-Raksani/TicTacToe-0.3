import React from "react";
import PropTypes from "prop-types";
import Constants from '../constants/Constants';

const Status = (props) => {
    const getStatus = () => {
        const { currentPlayer, board } = props;
        const winner = isFirstRowCompletedByAPlayer(board);
        if (winner && winner.player) {
            return Constants.WINNER + winner.player;
        }
        return Constants.CURRENT_PLAYER + currentPlayer;
    };

    const isFirstRowCompletedByAPlayer = (board) => {
        const positions = Constants.FIRST_ROW_TILES;
        if (positions.map((position) => board[position]).every((value, index, arr) => value && value === arr[0])) {
            return { player: board[positions[Constants.INITIAL_TILE_POSITION]], positions: positions };
        }
        return null;
    };

    return (
        <label>{getStatus()}</label>
    );
}
Status.propTypes = {
    currentPlayer: PropTypes.string.isRequired,
    board: PropTypes.array.isRequired
};
export default Status;