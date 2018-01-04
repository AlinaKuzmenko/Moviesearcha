import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Header from './';


Enzyme.configure({ adapter: new Adapter() });
const activeTab = 'all';
const toggleTabs = (event) => {
    const text = event.target.innerHTML;
    header.setProps({
        activeTab: text
    })
};
const header = mount(
    <Header
        activeTab = { activeTab }
        sortByLatest = {() => null}
        sortByPopularity = {() => null}
    />
);

const link = mount(
    <a
        href = '/'
        onClick = { toggleTabs }>
        popular
    </a>
);

describe('Header component', () => {
    test('Should have one \'header\' element', () => {
        expect(header.find('header')).toHaveLength(1);
    });

    test('Should have one \'h1\' element', () => {
        expect(header.find('header h1')).toHaveLength(1);
    });

    test('Should have \'h1\' tag with one \'a\' element', () => {
        expect(header.find('h1 a')).toHaveLength(1);
    });
    
    test('Should have one \'nav\' element', () => {
        expect(header.find('nav')).toHaveLength(1);
    });
    
    test('Should have three links in \'nav\' element', () => {
        expect(header.find('nav').children()).toHaveLength(3);
    });
    
    test('Should get a correct activeTab', () => {
        link.simulate('click');
        const tab = header.find('nav').childAt(1).text();
        expect(header.props().activeTab).toBe(tab);
    });
});
