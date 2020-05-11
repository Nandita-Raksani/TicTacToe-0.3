import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Constants from '../constants/Constants';
import determineWinner from '../helper/DetermineWinner';

const Status = (props) => {
    const [gameStatus, setGameStatus] = useState();

    useEffect(() => {
        getStatus();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.board])

    const getStatus = () => {
        const { currentPlayer, board } = props;
        const winner = determineWinner(board);
        if (winner && winner.player) {
            hasPlayerWon(winner);
        } else if (isDraw(board)) {
            setGameStatus(Constants.GAME_DRAW);
        } else {
            setGameStatus(Constants.CURRENT_PLAYER + (currentPlayer));
        }
    };

    const hasPlayerWon = (winner) => {
        setGameStatus(Constants.WINNER + winner.player);
        props.onPlayerWin(winner.positions);
    };

    const isDraw = (board) => {
        return board.indexOf(Constants.EMPTY_VALUE) === Constants.INDEX_NOT_FOUND;
    };

    return (
        <label>{gameStatus}</label>
    );
}
Status.propTypes = {
    currentPlayer: PropTypes.string.isRequired,
    board: PropTypes.array.isRequired,
    onPlayerWin: PropTypes.func.isRequired
};
export default Status;