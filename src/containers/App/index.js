import React, { Component } from 'react';
import { string } from 'prop-types';

import HomePage from '../../components/HomePage';


const APIKey = 'a6f017bd0704106423cc1e6ff3a6cc1e';

export const options = {
    api:           'https://api.themoviedb.org/3',
    discoverMovie: 'discover/movie?sort_by=revenue.desc&',
    moviesGenres:  'genre/movie/list',
    key:           `api_key=${APIKey}`,
    latest:        '',
    popular:       'movie/popular',
    posterURL:     `https://image.tmdb.org/t/p/w500`
};

export default class App extends Component {
    static childContextTypes = {
        api:           string.isRequired,
        discoverMovie: string,
        moviesGenres:  string,
        key:           string.isRequired,
        latest:        string,
        popular:       string,
        posterURL:     string
    };
    getChildContext () {
        return options;
    }
    render () {

        return (
            <HomePage />
        );
    }
}
