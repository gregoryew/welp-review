import React from 'react';
import ReviewItem from './ReviewItem.jsx';

const ReviewList = props => (
  
  <div>
    <ul>
      {props.reviews.map((review, index) => <ReviewItem review={review} key={index} />)}
    </ul>
  </div>
);

export default ReviewList;
