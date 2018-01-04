import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Favourites from './';


Enzyme.configure({ adapter: new Adapter() });
const props = {
    movies: []
};
const mutatedProps= {
    movies: [
        {
            title: 'Star Wars'
        },
        {
            title: 'V'
        },
        {
            title: 'Arrival'
        }
    ]
};
const favourites = mount(
    <Favourites movies = {props.movies} />
);

describe('Favourites component', () => {
  test('should have one aside element', () => {
    expect(favourites.find('aside')).toHaveLength(1);
  });
  
  test('should have one header element within the aside element', () => {
    expect(favourites.find('aside header')).toHaveLength(1);
  });
  
  test('should have a ul', () => {
    expect(favourites.find('ul')).toHaveLength(1);
  });
  
  test('should have as many li elements as movies in props', () => {
    favourites.setProps({ movies: mutatedProps.movies });
    expect(favourites.find('ul li')).toHaveLength(mutatedProps.movies.length);
  });
  
  test('should have img elements within each li element if movies array is not empty', () => {
      favourites.setProps({ movies: mutatedProps.movies });
      favourites.find('li').forEach((node) => {
          expect(node.find('img')).toHaveLength(1);
      })
  });
});
