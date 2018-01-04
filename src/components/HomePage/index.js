import React, { Component } from 'react';
import { func, string } from 'prop-types';

import { filterFavourites, getMovies } from '../../helpers';
import Content from '../../components/Content';
import Favourites from '../../components/Favourites';
import Header from '../../components/Header';
import Styles from './styles.scss';


export default class HomePage extends Component {
    static childContextTypes = {
        toggleTabs: func.isRequired
    };
    static contextTypes = {
        api:           string.isRequired,
        discoverMovie: string,
        moviesGenres:  string,
        key:           string.isRequired,
        latest:        string,
        popular:       string,
        posterURL:     string
    };
    constructor () {
        super();
        this.getMovies = ::this._getMovies;
        this.getFavourites = ::this._getFavourites;
        this.addToFavourites = ::this._addToFavourites;
        this.deleteFromFavourites = ::this._deleteFromFavourites;
        this.toggleTabs = ::this._toggleTabs;
        this.sortByLatest = ::this._sortByLatest;
        this.sortByPopularity = ::this._sortByPopularity;
    }
    state = {
        activeTab: 'all',
        movies:    {
            all:        [],
            favourites: [],
            filtered:   [],
            latest:     [],
            popular:    []
        }
    };
    getChildContext () {
        return {
            toggleTabs: this.toggleTabs
        };
    }
    componentWillMount () {
        this.getMovies(4);
        this.getFavourites();
    }
    async _getMovies (pagesNumber) {
        const all = await getMovies(this.context, pagesNumber);

        this.setState(({ movies }) =>
            Object.assign({}, this.state, {
                movies: Object.assign({}, movies, {
                    all,
                    latest:  this.sortByLatest(all),
                    popular: this.sortByPopularity(all)
                })
            })
        );
    }
    _toggleTabs (tabName) {
        const { activeTab } = this.state;

        if (tabName !== activeTab) {
            this.setState(({ movies }) => ({
                activeTab: tabName,
                movies
            }));
        }
    }
    _sortByLatest (movies) {
        const sortByDate = (a, b) => {
            const aDate = new Date(a.release_date).getTime();
            const bDate = new Date(b.release_date).getTime();

            return bDate - aDate;
        };

        return [...movies].sort(sortByDate);
    }
    _sortByPopularity (movies) {
        const sortByPopularity = (a, b) => b.popularity - a.popularity;

        return [...movies].sort(sortByPopularity);
    }
    _getFavourites () {
        const favourites = [];
        const isLocalStorageEmpty = localStorage.length === 0;
        const isLocalStorageFavouritesEmpty = localStorage.favourites
            ? localStorage.favourites.length === 0
            : false;

        if (!isLocalStorageEmpty && !isLocalStorageFavouritesEmpty) {
            favourites.push(...localStorage.getItem('favourites').split(','));
        }
        this.setState(({ movies }) =>
            Object.assign({}, this.state, {
                movies: Object.assign({}, movies, {
                    favourites
                })
            })
        );
    }
    _addToFavourites (id) {
        const { movies: { favourites }} = this.state;
        const _id = id.toString();
        const setOfFavourites = new Set(favourites);

        setOfFavourites.add(_id);
        localStorage.setItem('favourites', [...setOfFavourites]);
        this.getFavourites();
    }
    _deleteFromFavourites (id) {
        const { movies: { favourites }} = this.state;
        const _id = id.toString();
        const setOfFavourites = new Set(favourites);

        setOfFavourites.delete(_id);
        localStorage.setItem('favourites', [...setOfFavourites]);
        this.getFavourites();
    }
    render () {
        const {
            activeTab,
            movies: {
                all,
                favourites,
                latest,
                popular
            }
        } = this.state;
        let moviesShown = '';

        switch (activeTab) {
            case 'all':
                moviesShown = all;
                break;
            case 'popular':
                moviesShown = popular;
                break;
            case 'latest':
                moviesShown = latest;
                break;
            default:
                moviesShown = all;
                break;
        }

        return (
            <div className = { Styles.homePage }>
                <Header
                    activeTab = { activeTab }
                    toggleTabs = { this.toggleTabs }
                />
                <main>
                    <Favourites movies = { filterFavourites(all, favourites) } />
                    <Content
                        addToFavourites = { this.addToFavourites }
                        deleteFromFavourites = { this.deleteFromFavourites }
                        favourites = { favourites }
                        movies = { moviesShown }
                    />
                </main>
            </div>
        );
    }
}
