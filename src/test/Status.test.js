import React from 'react';
import { shallow } from 'enzyme';
import Status from '../component/Status';
import Constants from './constants/Constants';

describe(("<Status/> component"), () => {
    let wrapper, board;

    beforeEach(() => {
        board = ['', '', '', '', '', '', '', '', ''];
        wrapper = shallow(<Status currentPlayer={Constants.PLAYER_X} board={board} />);
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
        const wrapper = shallow(<Status currentPlayer={Constants.PLAYER_X} board={board} />);
        expect(wrapper.find('label').text()).toBe(Constants.EXPECT_WINNER_X);
    });
});