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
        expect(wrapper.find("div").at(3).hasClass(Constants.RESTART)).toBeTruthy();
        expect(wrapper.find('button').hasClass(Constants.RESTART_BUTTON)).toBeTruthy();
        expect(wrapper.find("ul").hasClass('board')).toBeTruthy();
        expect(wrapper.find("div").at(2).hasClass('status')).toBeTruthy();
    })
});

describe(("<Game/> component functionality"), () => {
    let wrapper, PLAYER_X, PLAYER_O;

    beforeEach(() => {
        wrapper = mount(<Game />);

        PLAYER_X = {
            play: function (tile) {
                wrapper.find(Tile).at(tile).find('button').simulate('click');
            }
        }

        PLAYER_O = {
            play: function (tile) {
                wrapper.find(Tile).at(tile).find('button').simulate('click');
            }
        }
    });

    it("Should render 9 empty Tiles", () => {
        expect(wrapper.find(Tile).length).toBe(Constants.EXPECT_MAXIMUM_NUMBER_OF_TILES);
        wrapper.find(Tile).forEach(tile => {
            expect(tile.find('button').text()).toBe(Constants.EXPECT_EMPTY_VALUE);
        });
    })

    it("Should always assign first move to Player X", () => {
        PLAYER_X.play(Constants.TOP_LEFT_TILE);

        expect(wrapper.find(Tile).at(0).find('button').text()).toBe(Constants.EXPECT_PLAYER_X);
    })

    it("Should assign the alternate move to Player O", () => {
        PLAYER_X.play(Constants.TOP_LEFT_TILE);
        PLAYER_O.play(Constants.TOP_MIDDLE_TILE);

        expect(wrapper.find(Tile).at(1).find('button').text()).toBe(Constants.EXPECT_PLAYER_O);
    })

    it("Should display the status of game with current player turn", () => {
        expect(wrapper.find(Status).find('label').text()).toBe(Constants.EXPECT_CURRENT_PLAYER_X);

        PLAYER_X.play(Constants.TOP_LEFT_TILE);

        expect(wrapper.find(Tile).at(0).find('button').text()).toBe(Constants.EXPECT_PLAYER_X);
        expect(wrapper.find(Status).find('label').text()).toBe(Constants.EXPECT_CURRENT_PLAYER_O);

        PLAYER_O.play(Constants.TOP_MIDDLE_TILE);

        expect(wrapper.find(Tile).at(1).find('button').text()).toBe(Constants.EXPECT_PLAYER_O);
        expect(wrapper.find(Status).find('label').text()).toBe(Constants.EXPECT_CURRENT_PLAYER_X);
    })

    it("Should not allow play to play on played tile", () => {
        PLAYER_X.play(Constants.TOP_LEFT_TILE);

        expect(wrapper.find(Tile).at(0).find('button').text()).toBe(Constants.EXPECT_PLAYER_X);
        expect(wrapper.find(Tile).at(0).find('button').props()[Constants.DISABLED]).toBeTruthy();
    })

    it("should declare X as winner if first row is completely filled by X ", () => {
        PLAYER_X.play(Constants.TOP_LEFT_TILE);
        PLAYER_O.play(Constants.CENTER_LEFT_TILE);
        PLAYER_X.play(Constants.TOP_MIDDLE_TILE);
        PLAYER_O.play(Constants.CENTER_TILE);
        PLAYER_X.play(Constants.TOP_RIGHT_TILE);

        expect(wrapper.find(Status).find('label').text()).toBe(Constants.EXPECT_WINNER_X);
    });

    it("should declare O as winner if first row is completely filled by O ", () => {
        PLAYER_X.play(Constants.CENTER_LEFT_TILE);
        PLAYER_O.play(Constants.TOP_LEFT_TILE);
        PLAYER_X.play(Constants.CENTER_TILE);
        PLAYER_O.play(Constants.TOP_MIDDLE_TILE);
        PLAYER_X.play(Constants.BOTTOM_LEFT_TILE);
        PLAYER_O.play(Constants.TOP_RIGHT_TILE);

        expect(wrapper.find(Status).find('label').text()).toBe(Constants.EXPECT_WINNER_O);
    });

    it("Should disable tiles on winning game", () => {
        PLAYER_X.play(Constants.TOP_LEFT_TILE);
        PLAYER_O.play(Constants.CENTER_LEFT_TILE);
        PLAYER_X.play(Constants.TOP_MIDDLE_TILE);
        PLAYER_O.play(Constants.CENTER_TILE);
        PLAYER_X.play(Constants.TOP_RIGHT_TILE);

        wrapper.find(Tile).forEach(tile => {
            expect(tile.find('button').props()[Constants.DISABLED]).toBeTruthy();
        });
    });

    it("should declare X as winner if second row is completely filled by X ", () => {
        PLAYER_X.play(Constants.CENTER_LEFT_TILE);
        PLAYER_O.play(Constants.TOP_LEFT_TILE);
        PLAYER_X.play(Constants.CENTER_TILE);
        PLAYER_O.play(Constants.TOP_MIDDLE_TILE);
        PLAYER_X.play(Constants.CENTER_RIGHT_TILE);

        wrapper.find(Tile).forEach(tile => {
            expect(tile.find('button').props()[Constants.DISABLED]).toBeTruthy();
        });
        expect(wrapper.find('label').text()).toBe(Constants.EXPECT_WINNER_X);
    });

    it("should declare O as winner if second row is completely filled by O ", () => {
        PLAYER_X.play(Constants.TOP_LEFT_TILE);
        PLAYER_O.play(Constants.CENTER_LEFT_TILE);
        PLAYER_X.play(Constants.TOP_MIDDLE_TILE);
        PLAYER_O.play(Constants.CENTER_TILE);
        PLAYER_X.play(Constants.BOTTOM_LEFT_TILE);
        PLAYER_O.play(Constants.CENTER_RIGHT_TILE);

        wrapper.find(Tile).forEach(tile => {
            expect(tile.find('button').props()[Constants.DISABLED]).toBeTruthy();
        });
        expect(wrapper.find('label').text()).toBe(Constants.EXPECT_WINNER_O);
    });

    it("should declare X as winner if third row is completely filled by X ", () => {
        PLAYER_X.play(Constants.BOTTOM_LEFT_TILE);
        PLAYER_O.play(Constants.CENTER_LEFT_TILE);
        PLAYER_X.play(Constants.BOTTOM_MIDDLE_TILE);
        PLAYER_O.play(Constants.CENTER_TILE);
        PLAYER_X.play(Constants.BOTTOM_RIGHT_TILE);

        wrapper.find(Tile).forEach(tile => {
            expect(tile.find('button').props()[Constants.DISABLED]).toBeTruthy();
        });
        expect(wrapper.find('label').text()).toBe(Constants.EXPECT_WINNER_X);
    });

    it("should declare O as winner if third row is completely filled by O ", () => {
        PLAYER_X.play(Constants.CENTER_LEFT_TILE);
        PLAYER_O.play(Constants.BOTTOM_LEFT_TILE);
        PLAYER_X.play(Constants.CENTER_TILE);
        PLAYER_O.play(Constants.BOTTOM_MIDDLE_TILE);
        PLAYER_X.play(Constants.TOP_RIGHT_TILE);
        PLAYER_O.play(Constants.BOTTOM_RIGHT_TILE);

        wrapper.find(Tile).forEach(tile => {
            expect(tile.find('button').props()[Constants.DISABLED]).toBeTruthy();
        });
        expect(wrapper.find('label').text()).toBe(Constants.EXPECT_WINNER_O);
    });

    it("should declare X as winner if first column is completely filled by X ", () => {
        PLAYER_X.play(Constants.TOP_LEFT_TILE);
        PLAYER_O.play(Constants.TOP_MIDDLE_TILE);
        PLAYER_X.play(Constants.CENTER_LEFT_TILE);
        PLAYER_O.play(Constants.CENTER_TILE);
        PLAYER_X.play(Constants.BOTTOM_LEFT_TILE);

        wrapper.find(Tile).forEach(tile => {
            expect(tile.find('button').props()[Constants.DISABLED]).toBeTruthy();
        });
        expect(wrapper.find('label').text()).toBe(Constants.EXPECT_WINNER_X);
    });

    it("should declare O as winner if first column is completely filled by O ", () => {
        PLAYER_X.play(Constants.TOP_MIDDLE_TILE);
        PLAYER_O.play(Constants.TOP_LEFT_TILE);
        PLAYER_X.play(Constants.CENTER_TILE);
        PLAYER_O.play(Constants.CENTER_LEFT_TILE);
        PLAYER_X.play(Constants.BOTTOM_RIGHT_TILE);
        PLAYER_O.play(Constants.BOTTOM_LEFT_TILE);

        wrapper.find(Tile).forEach(tile => {
            expect(tile.find('button').props()[Constants.DISABLED]).toBeTruthy();
        });
        expect(wrapper.find('label').text()).toBe(Constants.EXPECT_WINNER_O);
    });

    it("should declare X as winner if second column is completely filled by X ", () => {
        PLAYER_X.play(Constants.TOP_MIDDLE_TILE);
        PLAYER_O.play(Constants.TOP_LEFT_TILE);
        PLAYER_X.play(Constants.CENTER_TILE);
        PLAYER_O.play(Constants.CENTER_LEFT_TILE);
        PLAYER_X.play(Constants.BOTTOM_MIDDLE_TILE);

        wrapper.find(Tile).forEach(tile => {
            expect(tile.find('button').props()[Constants.DISABLED]).toBeTruthy();
        });
        expect(wrapper.find('label').text()).toBe(Constants.EXPECT_WINNER_X);
    });

    it("should declare O as winner if second column is completely filled by O ", () => {
        PLAYER_X.play(Constants.TOP_LEFT_TILE);
        PLAYER_O.play(Constants.TOP_MIDDLE_TILE);
        PLAYER_X.play(Constants.CENTER_LEFT_TILE);
        PLAYER_O.play(Constants.CENTER_TILE);
        PLAYER_X.play(Constants.BOTTOM_RIGHT_TILE);
        PLAYER_O.play(Constants.BOTTOM_MIDDLE_TILE);

        wrapper.find(Tile).forEach(tile => {
            expect(tile.find('button').props()[Constants.DISABLED]).toBeTruthy();
        });
        expect(wrapper.find('label').text()).toBe(Constants.EXPECT_WINNER_O);
    });

    it("should declare X as winner if third column is completely filled by X ", () => {
        PLAYER_X.play(Constants.TOP_RIGHT_TILE);
        PLAYER_O.play(Constants.TOP_MIDDLE_TILE);
        PLAYER_X.play(Constants.CENTER_RIGHT_TILE);
        PLAYER_O.play(Constants.CENTER_TILE);
        PLAYER_X.play(Constants.BOTTOM_RIGHT_TILE);

        wrapper.find(Tile).forEach(tile => {
            expect(tile.find('button').props()[Constants.DISABLED]).toBeTruthy();
        });
        expect(wrapper.find('label').text()).toBe(Constants.EXPECT_WINNER_X);
    });

    it("should declare O as winner if third column is completely filled by O ", () => {
        PLAYER_X.play(Constants.TOP_MIDDLE_TILE);
        PLAYER_O.play(Constants.TOP_RIGHT_TILE);
        PLAYER_X.play(Constants.CENTER_TILE);
        PLAYER_O.play(Constants.CENTER_RIGHT_TILE);
        PLAYER_X.play(Constants.BOTTOM_LEFT_TILE);
        PLAYER_O.play(Constants.BOTTOM_RIGHT_TILE);

        wrapper.find(Tile).forEach(tile => {
            expect(tile.find('button').props()[Constants.DISABLED]).toBeTruthy();
        });
        expect(wrapper.find('label').text()).toBe(Constants.EXPECT_WINNER_O);
    });

    it("should declare X as winner if left diagonal is completely filled by X ", () => {
        PLAYER_X.play(Constants.TOP_LEFT_TILE);
        PLAYER_O.play(Constants.TOP_MIDDLE_TILE);
        PLAYER_X.play(Constants.CENTER_TILE);
        PLAYER_O.play(Constants.CENTER_RIGHT_TILE);
        PLAYER_X.play(Constants.BOTTOM_RIGHT_TILE);

        wrapper.find(Tile).forEach(tile => {
            expect(tile.find('button').props()[Constants.DISABLED]).toBeTruthy();
        });
        expect(wrapper.find('label').text()).toBe(Constants.EXPECT_WINNER_X);
    });

    it("should declare O as winner if left diagonal is completely filled by O ", () => {
        PLAYER_X.play(Constants.TOP_MIDDLE_TILE);
        PLAYER_O.play(Constants.TOP_LEFT_TILE);
        PLAYER_X.play(Constants.CENTER_LEFT_TILE);
        PLAYER_O.play(Constants.CENTER_TILE);
        PLAYER_X.play(Constants.CENTER_RIGHT_TILE);
        PLAYER_O.play(Constants.BOTTOM_RIGHT_TILE);

        wrapper.find(Tile).forEach(tile => {
            expect(tile.find('button').props()[Constants.DISABLED]).toBeTruthy();
        });
        expect(wrapper.find('label').text()).toBe(Constants.EXPECT_WINNER_O);
    });

    it("should declare X as winner if right diagonal is completely filled by X ", () => {
        PLAYER_X.play(Constants.TOP_RIGHT_TILE);
        PLAYER_O.play(Constants.TOP_MIDDLE_TILE);
        PLAYER_X.play(Constants.CENTER_TILE);
        PLAYER_O.play(Constants.CENTER_LEFT_TILE);
        PLAYER_X.play(Constants.BOTTOM_LEFT_TILE);

        wrapper.find(Tile).forEach(tile => {
            expect(tile.find('button').props()[Constants.DISABLED]).toBeTruthy();
        });
        expect(wrapper.find('label').text()).toBe(Constants.EXPECT_WINNER_X);
    });

    it("should declare O as winner if right diagonal is completely filled by O ", () => {
        PLAYER_X.play(Constants.TOP_MIDDLE_TILE);
        PLAYER_O.play(Constants.TOP_RIGHT_TILE);
        PLAYER_X.play(Constants.CENTER_LEFT_TILE);
        PLAYER_O.play(Constants.CENTER_TILE);
        PLAYER_X.play(Constants.CENTER_RIGHT_TILE);
        PLAYER_O.play(Constants.BOTTOM_LEFT_TILE);
        wrapper.find(Tile).forEach(tile => {
            expect(tile.find('button').props()[Constants.DISABLED]).toBeTruthy();
        });
        expect(wrapper.find('label').text()).toBe(Constants.EXPECT_WINNER_O);
    });

    it("should be draw when all tiles are completely filled and no winner", () => {
        PLAYER_X.play(Constants.TOP_LEFT_TILE);
        PLAYER_O.play(Constants.TOP_MIDDLE_TILE);
        PLAYER_X.play(Constants.TOP_RIGHT_TILE);
        PLAYER_O.play(Constants.CENTER_LEFT_TILE);
        PLAYER_X.play(Constants.CENTER_TILE);
        PLAYER_O.play(Constants.BOTTOM_RIGHT_TILE);
        PLAYER_X.play(Constants.CENTER_RIGHT_TILE);
        PLAYER_O.play(Constants.BOTTOM_LEFT_TILE);
        PLAYER_X.play(Constants.BOTTOM_MIDDLE_TILE);

        expect(wrapper.find('label').text()).toBe(Constants.EXPECT_GAME_DRAW);
    });

    it("Should restart game to initial state on clicking Restart button", () => {
        PLAYER_X.play(Constants.TOP_MIDDLE_TILE);
        PLAYER_O.play(Constants.TOP_RIGHT_TILE);
        PLAYER_X.play(Constants.CENTER_LEFT_TILE);
        PLAYER_O.play(Constants.CENTER_TILE);
        PLAYER_X.play(Constants.CENTER_RIGHT_TILE);
        PLAYER_O.play(Constants.BOTTOM_LEFT_TILE);

        expect(wrapper.find('button').at(9).text()).toBe('Restart');
        wrapper.find('button').at(9).simulate('click');
        wrapper.find(Tile).forEach(tile => {
            expect(tile.find('button').text()).toBe(Constants.EXPECT_EMPTY_VALUE);
            expect(tile.find('button').props()[Constants.DISABLED]).toBeFalsy();
        });
        expect(wrapper.find(Status).find('label').text()).toBe(Constants.EXPECT_CURRENT_PLAYER_X);
    });

});