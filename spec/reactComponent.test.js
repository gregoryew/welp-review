import React from 'react';
import renderer from 'react-test-renderer';
import App from '../client';
import EXAMPLE_REVIEW from './Data/exampleReview.js';

describe('App component renders the app correctly', () => {
  it('renders correctly', () => {
    let ex = EXAMPLE_REVIEW.EXAMPLE_REVIEW;
    const rendered = renderer.create(
      < App restaurantId={5} page={0} sort={0} data={EXAMPLE_REVIEW}/>
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });
});
