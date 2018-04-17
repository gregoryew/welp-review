import React from 'react';
import moment from 'moment';
import VoteButton from './VoteButton.jsx';

const ReviewItem = props => (
  <li className="review-wrapper">
    <div className="review-content">
      <img src={props.review.stars} alt="" /> &nbsp; {moment(props.review.date).format('M/D/YYYY')}
      <br /><br />
      {props.review.text.map((paragraph, index) => <Paragraph paragraph={paragraph} key={index} />)}
    </div>
    <div className="review-footer clearfix">
      <div className="rateReview voting-feedback">
        <p className="voting-intro voting prompt">
          1 person voted for this review
        </p>
        <ul>
          <VoteButton click={props.click} reviewId={props.review.review_id} title="useful" imageUrl="./useful.png" count={props.review.useful} />&nbsp;
          <VoteButton click={props.click} reviewId={props.review.review_id} title="funny" imageUrl="./funny.png" count={props.review.funny} />&nbsp;
          <VoteButton click={props.click} reviewId={props.review.review_id} title="cool" imageUrl="./cool.png" count={props.review.cool} />
        </ul>
      </div>
    </div>
    <br /><br />
  </li>
);

const Paragraph = props => (
  <p>
    {props.paragraph}
  </p>
);

export default ReviewItem;
