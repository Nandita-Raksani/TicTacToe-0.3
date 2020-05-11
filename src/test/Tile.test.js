import React from 'react';
import Tile from '../component/Tile';
import { shallow } from 'enzyme';
import Constants from './constants/Constants';

describe(("<Tile/> component"), () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Tile value={Constants.PLAYER_X} onClick={jest.fn()} />);
    });

    it("should render correctly", () => {
        expect(wrapper).toMatchSnapshot();
    });

    it("should render the button with styles", () => {
        expect(wrapper.find("button").hasClass(Constants.EXPECT_TILE_BUTTON)).toBeTruthy();
    });
});

describe(("<Tile/> component functionality"), () => {
    it("should display symbol X when value passed from Game is X", () => {
        const wrapper = shallow(<Tile value={Constants.PLAYER_X} onClick={jest.fn()} />);
        expect(wrapper.find('button').props()[Constants.DATA_SYMBOL_COLOR]).toBe(Constants.EXPECT_PLAYER_X);
        expect(wrapper.find("button").text()).toEqual(Constants.EXPECT_PLAYER_X);
    });

    it("should display symbol O when value passed from Game is O", () => {
        const wrapper = shallow(<Tile value={Constants.PLAYER_O} onClick={jest.fn()} />);
        expect(wrapper.find('button').props()[Constants.DATA_SYMBOL_COLOR]).toBe(Constants.EXPECT_PLAYER_O);
        expect(wrapper.find("button").text()).toEqual(Constants.EXPECT_PLAYER_O);
    });

    it("should not allow player to play on played tile", () => {
        const wrapper = shallow(<Tile value={Constants.PLAYER_X} onClick={jest.fn()} />);
        expect(wrapper.find('button').props()[Constants.DISABLED]).toBeTruthy();
    });
});