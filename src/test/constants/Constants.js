const Constants = {
    PLAYER_X: 'X',
    DATA_SYMBOL_COLOR: 'data-symbol-color',
    PLAYER_O: 'O',
    DISABLED: 'disabled',
    TILE_WINNING: 'tile-winning',

    EXPECT_TIC_TAC_TOE: "Tic-Tac-Toe",
    EXPECT_APP: "App",
    EXPECT_APP_HEADER: "App-header",
    EXPECT_TILE_BUTTON: "tile-button",
    EXPECT_MAXIMUM_NUMBER_OF_TILES: 9,
    EXPECT_EMPTY_VALUE: "",
    EXPECT_PLAYER_X: 'X',
    EXPECT_PLAYER_O: 'O',
    EXPECT_CURRENT_PLAYER_X: "Current Player : X",
    EXPECT_CURRENT_PLAYER_O: "Current Player : O",
    EXPECT_WINNER_X: "Winner is : X",
    EXPECT_WINNER_O: "Winner is : O",

    INPUT_PLAYER_X_FIRST_TURN: [0],
    INPUT_PLAYER_O_NEXT_TURN: [1],
    INPUT_PLAYER_O_SECOND_TURN: [0, 1],
    INPUT_PLAYER_X_WIN_BY_FIRST_ROW: [0, 3, 1, 4, 2],
    INPUT_PLAYER_O_WIN_BY_FIRST_ROW: [3, 0, 4, 1, 6, 2],
    INPUT_PLAYER_X_WIN_BY_SECOND_ROW: [3, 0, 4, 1, 5],
    INPUT_PLAYER_O_WIN_BY_SECOND_ROW: [0, 3, 1, 4, 6, 5],

    FIRST_ROW_TILES: [0, 1, 2],
    SECOND_ROW_TILES: [3, 4, 5]
};
export default Constants;