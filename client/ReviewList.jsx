import React from 'react';
import ReviewItem from './ReviewItem.jsx';

const ReviewList = props => (
  
  <div>
    <ul>
      {props.reviews.map(review => <ReviewItem review={review} key={review.id} />)}
    </ul>
  </div>
);

export default ReviewList;
