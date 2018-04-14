import React from 'react';
import ReviewItem from './ReviewItem.jsx';

const ReviewList = props => (
  <div>
    <div>
      {props.reviews.map(review => <ReviewItem review={review} />)}
    </div>
  </div>
);

export default ReviewList;
