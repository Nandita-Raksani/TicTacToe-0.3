import React from 'react';
import Game from '../component/Game';
import Constants from './constants/Constants';
import Tile from '../component/Tile';
import Status from '../component/Status';
import { shallow, mount } from 'enzyme';

describe(("<Game/> component"), () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Game />);
    });

    it("should render correctly", () => {
        expect(wrapper).toMatchSnapshot();
    });

    it("should render title correctly", () => {
        expect(wrapper.find("header").text()).toEqual(Constants.EXPECT_TIC_TAC_TOE);
    });

    it("should render styles correctly", () => {
        expect(wrapper.find("div").at(0).hasClass(Constants.EXPECT_APP)).toBeTruthy();
        expect(wrapper.find("header").hasClass(Constants.EXPECT_APP_HEADER)).toBeTruthy();
    })
});

describe(("<Game/> component functionality"), () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(<Game />);
    });

    it("Should render 9 empty Tiles", () => {
        expect(wrapper.find(Tile).length).toBe(Constants.EXPECT_MAXIMUM_NUMBER_OF_TILES);
        wrapper.find(Tile).forEach(tile => {
            expect(tile.find('button').text()).toBe(Constants.EXPECT_EMPTY_VALUE);
        });
    })

    it("Should always assign first move to Player X", () => {
        playerPlays(Constants.INPUT_PLAYER_X_FIRST_TURN);
        expect(wrapper.find(Tile).at(0).find('button').text()).toBe(Constants.EXPECT_PLAYER_X);
    })

    it("Should assign the next move to Player O", () => {
        playerPlays(Constants.INPUT_PLAYER_O_SECOND_TURN);
        expect(wrapper.find(Tile).at(1).find('button').text()).toBe(Constants.EXPECT_PLAYER_O);
    })

    it("Should display the status of game with current player turn", () => {
        expect(wrapper.find(Status).find('label').text()).toBe(Constants.EXPECT_CURRENT_PLAYER_X);

        playerPlays(Constants.INPUT_PLAYER_X_FIRST_TURN);
        expect(wrapper.find(Tile).at(0).find('button').text()).toBe(Constants.EXPECT_PLAYER_X);
        expect(wrapper.find(Status).find('label').text()).toBe(Constants.EXPECT_CURRENT_PLAYER_O);

        playerPlays(Constants.INPUT_PLAYER_O_NEXT_TURN);
        expect(wrapper.find(Tile).at(1).find('button').text()).toBe(Constants.EXPECT_PLAYER_O);
        expect(wrapper.find(Status).find('label').text()).toBe(Constants.EXPECT_CURRENT_PLAYER_X);
    })

    it("Should not allow play to play on played tile", () => {
        playerPlays(Constants.INPUT_PLAYER_X_FIRST_TURN);
        expect(wrapper.find(Tile).at(0).find('button').text()).toBe(Constants.EXPECT_PLAYER_X);
        expect(wrapper.find(Tile).at(0).find('button').props()[Constants.DISABLED]).toBeTruthy();
    })

    it("should declare X as winner if first row is completely filled by X ", () => {
        playerPlays(Constants.INPUT_PLAYER_X_WIN_BY_FIRST_ROW);
        expect(wrapper.find(Status).find('label').text()).toBe(Constants.EXPECT_WINNER_X);
    });

    it("should declare O as winner if first row is completely filled by O ", () => {
        playerPlays(Constants.INPUT_PLAYER_O_WIN_BY_FIRST_ROW);
        expect(wrapper.find(Status).find('label').text()).toBe(Constants.EXPECT_WINNER_O);
    });

    it("Should disable tiles and highlight the winning tile on player won", () => {
        playerPlays(Constants.INPUT_PLAYER_X_WIN_BY_FIRST_ROW);
        const tiles = wrapper.find(Tile);
        checkPlayerWon(tiles, Constants.FIRST_ROW_TILES);
    });

    it("should declare X as winner if second row is completely filled by X ", () => {
        playerPlays(Constants.INPUT_PLAYER_X_WIN_BY_SECOND_ROW);
        const tiles = wrapper.find(Tile);
        checkPlayerWon(tiles, Constants.SECOND_ROW_TILES);
        expect(wrapper.find('label').text()).toBe(Constants.EXPECT_WINNER_X);
    });

    it("should declare O as winner if second row is completely filled by O ", () => {
        playerPlays(Constants.INPUT_PLAYER_O_WIN_BY_SECOND_ROW);
        const tiles = wrapper.find(Tile);
        checkPlayerWon(tiles, Constants.SECOND_ROW_TILES);
        expect(wrapper.find('label').text()).toBe(Constants.EXPECT_WINNER_O);
    });

    it("should declare X as winner if third row is completely filled by X ", () => {
        playerPlays(Constants.INPUT_PLAYER_X_WIN_BY_THIRD_ROW);
        const tiles = wrapper.find(Tile);
        checkPlayerWon(tiles, Constants.THIRD_ROW_TILES);
        expect(wrapper.find('label').text()).toBe(Constants.EXPECT_WINNER_X);
    });

    it("should declare O as winner if third row is completely filled by O ", () => {
        playerPlays(Constants.INPUT_PLAYER_O_WIN_BY_THIRD_ROW);
        const tiles = wrapper.find(Tile);
        checkPlayerWon(tiles, Constants.THIRD_ROW_TILES);
        expect(wrapper.find('label').text()).toBe(Constants.EXPECT_WINNER_O);
    });

    it("should declare X as winner if first column is completely filled by X ", () => {
        playerPlays(Constants.INPUT_PLAYER_X_WIN_BY_FIRST_COLUMN);
        const tiles = wrapper.find(Tile);
        checkPlayerWon(tiles, Constants.FIRST_COLUMN_TILES);
        expect(wrapper.find('label').text()).toBe(Constants.EXPECT_WINNER_X);
    });

    it("should declare O as winner if first column is completely filled by O ", () => {
        playerPlays(Constants.INPUT_PLAYER_O_WIN_BY_FIRST_COLUMN);
        const tiles = wrapper.find(Tile);
        checkPlayerWon(tiles, Constants.FIRST_COLUMN_TILES);
        expect(wrapper.find('label').text()).toBe(Constants.EXPECT_WINNER_O);
    });

    it("should declare X as winner if second column is completely filled by X ", () => {
        playerPlays(Constants.INPUT_PLAYER_X_WIN_BY_SECOND_COLUMN);
        const tiles = wrapper.find(Tile);
        checkPlayerWon(tiles, Constants.SECOND_COLUMN_TILES);
        expect(wrapper.find('label').text()).toBe(Constants.EXPECT_WINNER_X);
    });

    it("should declare O as winner if second column is completely filled by O ", () => {
        playerPlays(Constants.INPUT_PLAYER_O_WIN_BY_SECOND_COLUMN);
        const tiles = wrapper.find(Tile);
        checkPlayerWon(tiles, Constants.SECOND_COLUMN_TILES);
        expect(wrapper.find('label').text()).toBe(Constants.EXPECT_WINNER_O);
    });

    it("should declare X as winner if third column is completely filled by X ", () => {
        playerPlays(Constants.INPUT_PLAYER_X_WIN_BY_THIRD_COLUMN);
        const tiles = wrapper.find(Tile);
        checkPlayerWon(tiles, Constants.THIRD_COLUMN_TILES);
        expect(wrapper.find('label').text()).toBe(Constants.EXPECT_WINNER_X);
    });

    it("should declare O as winner if third column is completely filled by O ", () => {
        playerPlays(Constants.INPUT_PLAYER_O_WIN_BY_THIRD_COLUMN);
        const tiles = wrapper.find(Tile);
        checkPlayerWon(tiles, Constants.THIRD_COLUMN_TILES);
        expect(wrapper.find('label').text()).toBe(Constants.EXPECT_WINNER_O);
    });

    it("should declare X as winner if left diagonal is completely filled by X ", () => {
        playerPlays(Constants.INPUT_PLAYER_X_WIN_BY_LEFT_DIAGONAL);
        const tiles = wrapper.find(Tile);
        checkPlayerWon(tiles, Constants.LEFT_DIAGONAL_TILES);
        expect(wrapper.find('label').text()).toBe(Constants.EXPECT_WINNER_X);
    });

    it("should declare O as winner if left diagonal is completely filled by O ", () => {
        playerPlays(Constants.INPUT_PLAYER_O_WIN_BY_LEFT_DIAGONAL);
        const tiles = wrapper.find(Tile);
        checkPlayerWon(tiles, Constants.LEFT_DIAGONAL_TILES);
        expect(wrapper.find('label').text()).toBe(Constants.EXPECT_WINNER_O);
    });

    it("should declare X as winner if right diagonal is completely filled by X ", () => {
        playerPlays(Constants.INPUT_PLAYER_X_WIN_BY_RIGHT_DIAGONAL);
        const tiles = wrapper.find(Tile);
        checkPlayerWon(tiles, Constants.RIGHT_DIAGONAL_TILES);
        expect(wrapper.find('label').text()).toBe(Constants.EXPECT_WINNER_X);
    });

    it("should declare O as winner if right diagonal is completely filled by O ", () => {
        playerPlays(Constants.INPUT_PLAYER_O_WIN_BY_RIGHT_DIAGONAL);
        const tiles = wrapper.find(Tile);
        checkPlayerWon(tiles, Constants.RIGHT_DIAGONAL_TILES);
        expect(wrapper.find('label').text()).toBe(Constants.EXPECT_WINNER_O);
    });

    const playerPlays = (board) => {
        board.forEach(position => {
            wrapper.find(Tile).at(position).find('button').simulate('click');
        })
    }

    const checkPlayerWon = (tiles, winningTiles) => {
        tiles.forEach(checkStyles);
        function checkStyles(tile, index) {
            expect(tile.find('button').props()[Constants.DISABLED]).toBeTruthy();
            if (winningTiles.includes(index)) {
                expect(tile.find("button").hasClass(Constants.TILE_WINNING)).toBeTruthy();
            } else {
                expect(tile.find("button").hasClass(Constants.TILE_WINNING)).toBeFalsy();
            }
        }
    };

});