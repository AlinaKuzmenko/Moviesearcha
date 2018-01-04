import React, { Component } from 'react';
import { bool, func, number, object } from 'prop-types';

import star from '../../theme/assets/star.png';
import Styles from './styles.scss';


export default class Star extends Component {
    static propTypes = {
        addToFavourites:      func.isRequired,
        deleteFromFavourites: func.isRequired,
        id:                   number.isRequired,
        isFavourite:          bool.isRequired,
        setOfFavourites:      object.isRequired
    };
    static defaultProps = {
        isFavourite: false
    };
    constructor (props) {
        super(props);
        this.addToFavourites = :: this._addToFavourites;
        this.deleteFromFavourites = :: this._deleteFromFavourites;
    }
    _addToFavourites () {
        const { id, addToFavourites } = this.props;

        addToFavourites(id);
    }
    _deleteFromFavourites () {
        const { id, deleteFromFavourites } = this.props;

        deleteFromFavourites(id);
    }
    render () {
        const { isFavourite } = this.props;
        const className = isFavourite
            ? 'starActive'
            : 'star';
        const handleFavourites = isFavourite
            ? this.deleteFromFavourites
            : this.addToFavourites;

        return (
            <img
                className = { Styles[className] }
                src = { star }
                onClick = { handleFavourites }
            />
        );
    }
}
