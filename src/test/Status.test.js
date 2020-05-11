import React from 'react';
import { mount } from 'enzyme';
import Status from '../component/Status';
import Constants from './constants/Constants';

describe(("<Status/> component"), () => {
    let wrapper, board;

    beforeEach(() => {
        board = ['', '', '', '', '', '', '', '', ''];
        wrapper = mount(<Status currentPlayer={Constants.PLAYER_X} board={board} onPlayerWin={jest.fn()} />);
    });

    it("should render correctly", () => {
        expect(wrapper).toMatchSnapshot();
    });

    it("should render label to display game status", () => {
        expect(wrapper.find("label")).toBeDefined();
        expect(wrapper.find("label").text()).toBe(Constants.EXPECT_CURRENT_PLAYER_X);
    });
});

describe(("<Status/> functionality"), () => {
    it("should render status on game won by player", () => {
        const board = ['X', 'X', 'X', 'O', 'O'];
        const wrapper = mount(<Status currentPlayer={Constants.PLAYER_X} board={board} onPlayerWin={jest.fn()} />);
        expect(wrapper.find('label').text()).toBe(Constants.EXPECT_WINNER_X);
    });

    it("Should not allow player to play once player has won", () => {
        const board = ['X', 'X', 'X', '', 'O', '', 'O'];
        const onPlayerWonMockFn = jest.fn();
        expect(onPlayerWonMockFn).toHaveBeenCalledTimes(0);

        const wrapper = mount(<Status currentPlayer={Constants.PLAYER_O} board={board} onPlayerWin={onPlayerWonMockFn} />);
        expect(onPlayerWonMockFn).toHaveBeenCalled();
        expect(onPlayerWonMockFn).toHaveBeenCalledTimes(1);
        expect(wrapper.find('label').text()).toBe(Constants.EXPECT_WINNER_X);
    })
});