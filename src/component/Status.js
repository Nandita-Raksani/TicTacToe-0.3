import React from "react";
import PropTypes from "prop-types";
import Constants from '../constants/Constants';

const Status = (props) => {
    const getStatus = () => {
        const { currentPlayer } = props;
        return Constants.CURRENT_PLAYER + currentPlayer;
    };

    return (
        <label>{getStatus()}</label>
    );
}
Status.propTypes = {
    currentPlayer: PropTypes.string.isRequired
};
export default Status;