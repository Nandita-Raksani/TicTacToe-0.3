import Constants from '../constants/Constants';

const determineWinner = (board) => {
    return isRowCompletedByAPlayer(board)
        || isColumnCompletedByAPlayer(board)
        || isDiagonalCompletedByAPlayer(board);
};

const isRowCompletedByAPlayer = (board) => {
    return isFirstRowCompletedByAPlayer(board)
        || isSecondRowCompletedByAPlayer(board)
        || isThirdRowCompletedByAPlayer(board);
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

const isColumnCompletedByAPlayer = (board) => {
    return isFirstColumnCompletedByAPlayer(board)
        || isSecondColumnCompletedByAPlayer(board) 
        || isThirdColumnCompletedByAPlayer(board)
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

const isDiagonalCompletedByAPlayer = (board) => {
    return isLeftDiagonalCompletedByAPlayer(board)
        || isRightDiagonalCompletedByAPlayer(board);
};

const isLeftDiagonalCompletedByAPlayer = (board) => {
    return isPositionsOccupiedBySamePlayer(board, Constants.LEFT_DIAGONAL_TILES);
};

const isRightDiagonalCompletedByAPlayer = (board) => {
    return isPositionsOccupiedBySamePlayer(board, Constants.RIGHT_DIAGONAL_TILES);
};

const isPositionsOccupiedBySamePlayer = (board, tiles) => {
    return tiles.map((tile) => board[tile])
        .every((value, index, arr) => value && value === arr[Constants.INITIAL_TILE_POSITION]);
};

export default determineWinner;