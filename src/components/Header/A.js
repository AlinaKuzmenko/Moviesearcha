import React, { Component } from 'react';
import { func, string } from 'prop-types';


export default class A extends Component {
    static contextTypes = {
        toggleTabs: func.isRequired
    };
    static propTypes = {
        className: string.isRequired,
        tabName:   string.isRequired
    };
    constructor () {
        super();
        this.toggleTabs = ::this._toggleTabs;
    }
    _toggleTabs (event) {
        event.preventDefault();
        const { toggleTabs } = this.context;
        const { tabName } = this.props;

        toggleTabs(tabName);
    }
    render () {
        const { className, tabName } = this.props;

        return (
            <a
                className = { className }
                href = '/'
                onClick = { this.toggleTabs }>
                {tabName}
            </a>
        );
    }
}
