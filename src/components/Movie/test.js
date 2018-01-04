import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Movie from './';


Enzyme.configure({ adapter: new Adapter() });

const defaultProps = {
    id: 0,
    original_title: 'unknown',
    release_date: 'unknown',
    popularity: 0
};
const props = {
    id: 550,
    original_title: 'Fight Club',
    poster_path: 'https://image.tmdb.org/t/p/w500/adw6Lq9FiC9zjYEpOqfq03ituwp.jpg',
    release_date: '15-10-1999',
    popularity: 777
};
const state = {
    modalIsOpened: false
};
const mutatedState = {
    modalIsOpened: true
};
const movie = mount(
    <Movie movie = {props} />
);

describe('Movie component', () => {
    test('Should have an \'a\' element', () => {
        expect(movie.find('a')).toHaveLength(1);
    });

    test('Should have a \'figure\' element', () => {
        expect(movie.find('figure')).toHaveLength(1);
    });

    test('Should have an \'img\' element inside the \'figure\'', () => {
        expect(movie.find('figure').find('img')).toHaveLength(1);
    });

    test('Should have a \'figcaption\' element inside the \'figure\'', () => {
        expect(movie.find('figure').find('figcaption')).toHaveLength(1);
    });

    test('Should have an \'h3\' element inside the \'figcaption\'', () => {
        expect(movie.find('figcaption').find('h3')).toHaveLength(1);
    });

    test('Should have two \'span\' elements inside the \'figcaption\'', () => {
        expect(movie.find('figcaption').find('span')).toHaveLength(2);
    });

    test('Should have props that are passed', () => {
        movie.setProps({ props });
        expect(movie.props().props).toEqual(props);
    });

    test('Should have a name with the value from the passed props', () => {
        movie.setProps({ props });
        expect(movie.props().props).toEqual(props);
    });

    test('Should have a default text in \'h3\' if props not passed', () => {
        movie.setProps({ movie: defaultProps });
        expect(movie.find('h3').text()).toBe(defaultProps.original_title);
    });
    
    test('Should show Modal when Movie is clicked', () => {
        expect(movie.state()).toEqual(state);
        movie.find('a').simulate('click');
        expect(movie.state()).toEqual(mutatedState);
    });
});
