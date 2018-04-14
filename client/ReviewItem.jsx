import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import VoteButton from './VoteButton.jsx';

const ReviewItem = props => (
  <div className="review-wrapper">
    <div className="review-content">
      Stars: {props.review.stars}
      <br />
      {props.review.text.map(line => <Line line={line} />)}
    </div>
    <div className="review-footer clearfix">
      <div className="rateReview voting-feedback">
        <p className="voting-intro voting prompt">
          1 person voted for this review
        </p>
        <ul>
          <VoteButton title="useful" imageUrl="./useful.png" count={props.review.useful} />&nbsp;
          <VoteButton title="funny" imageUrl="./funny.png" count={props.review.funny} />&nbsp;
          <VoteButton title="cool" imageUrl="./cool.png" count={props.review.cool} />
        </ul>
      </div>
    </div>
  </div>
);

const Line = props => (
  <p>
    {props.line}
  </p>
);

export default ReviewItem;
