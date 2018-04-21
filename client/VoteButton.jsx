import React from 'react';

const VoteButton = props => (
  <li className="vote-item inline-block" >
    <span className={props.userVoted} onClick={() => {props.click(props.reviewId, props.title)}}>
      <span aria-hidden="true" className="icon icon--18-useful-outline icon--size-18 icon--currentColor button-content u-space-r-half" >
        <img src={props.imageUrl} width="18" height="18" alt="button" />
      </span>
      <span className="vote-type" >{props.title} {props.count}</span>
    </span>
  </li>
);

export default VoteButton;
