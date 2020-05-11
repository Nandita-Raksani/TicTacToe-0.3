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
            setGameStatus(Constants.WINNER + winner.player);
            props.onPlayerWin(winner.positions);
        } else if (board.indexOf(Constants.EMPTY_VALUE) === Constants.INDEX_NOT_FOUND) {
            setGameStatus(Constants.GAME_DRAW);
        } else {
            setGameStatus(Constants.CURRENT_PLAYER + (currentPlayer));
        }
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