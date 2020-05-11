import React from 'react';
import '../App.css';
import StyleConstants from '../constants/StyleConstants';

const Game = () => {
    return (
        <div className={StyleConstants.APP}>
            <header className={StyleConstants.APP_HEADER}>
                {StyleConstants.APP_TITLE}
            </header>
        </div>
    );
}
export default Game;