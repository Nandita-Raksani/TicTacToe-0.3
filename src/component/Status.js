import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Constants from '../constants/Constants';
import determineWinner from '../helper/DetermineWinner';

const Status = (props) => {
    const [gameStatus, setGameStatus] = useState();

    useEffect(() => {
        const { currentPlayer, board } = props;

        const getStatus = () => {
            if (determineWinner(board)) {
                hasPlayerWon();
            } else if (isDraw(board)) {
                setGameStatus(Constants.GAME_DRAW);
            } else {
                setGameStatus(Constants.CURRENT_PLAYER + currentPlayer);
            }
        };

        const hasPlayerWon = () => {
            setGameStatus(Constants.WINNER + getWinningPlayer());
            props.onPlayerWin();
        };

        const getWinningPlayer = () => {
            return currentPlayer === Constants.PLAYER_X ? Constants.PLAYER_O : Constants.PLAYER_X;
        };

        getStatus();

    }, [props]);

    const isDraw = (board) => {
        return board.indexOf(Constants.EMPTY_VALUE) === Constants.INDEX_NOT_FOUND;
    };

    return <label>{gameStatus}</label>;
};
Status.propTypes = {
    currentPlayer: PropTypes.string.isRequired,
    board: PropTypes.array.isRequired,
    onPlayerWin: PropTypes.func.isRequired
};
export default Status;