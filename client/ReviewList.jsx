import React from 'react';
import ReviewItem from './ReviewItem.jsx';

const ReviewList = props => (
  <div>
    <div>
      <h4> Reviews </h4>
    </div>
    <div>
      <table>
        <tbody>
          {props.reviews.map(review => <ReviewItem review={review} />)}
        </tbody>
      </table>
    </div>
  </div>
);

export default ReviewList;
