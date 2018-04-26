import React from 'react';
import moment from 'moment';
import VotePanel from './VotePanel.jsx';

const ReviewItem = props => (
  <li className="review-wrapper">
    <div style={{ 'verticalAlign': 'top', 'alignContent': 'center', display: 'inline-block', width: '25%', boxsizing: 'border-box' }}>
      <div style={{ 'verticalAlign': 'top', padding: '10px', display: 'inline-block', width: '10px', boxsizing: 'border-box' }}>
        &nbsp;
      </div>
      <div style={{ 'verticalAlign': 'top', padding: '10px', display: 'inline-block', width: '70px', boxsizing: 'border-box' }}>
        <img src={props.review.user_id.picture} alt={props.review.user_id.name} width="60" style={{ 'borderRadius': '5px' }} />
      </div>
      <div className="media-story" style={{ 'verticalAlign': 'top', padding: '8px', display: 'inline-block', boxsizing: 'border-box' }} >
        <ul>
          <li>
            <a herf="#">
              <b>{props.review.user_id.name}</b>
            </a>
          </li>
          <li style={{ 'fontSize': '12px' }}>
            <span aria-hidden="true" style={{ fill: '#f15c00', width: '18px', height: '18px' }} className="icon icon--18-friends icon--size-18">
              <svg className="icon_svg">
                <svg id="18x18_friends" height="100%" viewBox="0 0 18 18" width="100%">
                  <g>
                    <path d="M7.904 9.43l-2.098 4.697a.9.9 0 0 1-1.612 0L2.096 9.43a.902.902 0 0 1 .806-1.305h4.196c.67 0 1.105.705.806 1.305zM5 7.375a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
                    <path d="M15.904 9.43l-2.098 4.697a.89.89 0 0 1-.806.498.89.89 0 0 1-.806-.498L10.096 9.43a.902.902 0 0 1 .806-1.305h4.195c.67 0 1.106.705.807 1.305zM13 7.375a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" opacity=".502" />
                  </g>
                </svg>
              </svg>
            </span>
            <b>{props.review.user_id.friends.length}</b>&nbsp;friends
          </li>
          <li style={{ 'fontSize': '12px' }}>
            <span aria-hidden="true" style={{ fill: '#f15c00', width: '18px', height: '18px' }} className="icon icon--18-review icon--size-18">
              <svg className="icon_svg">
                <svg id="18x18_review" height="100%" viewBox="0 0 18 18" width="100%">
                  <path d="M13 3H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1.505 9.643l-2.526-1.55L6.526 12.7 7 9.934 5 7.977l2.766-.404L8.97 4.7l1.264 2.873L13 7.977l-2 1.957.495 2.71z" />
                </svg>
              </svg>
            </span>
            <b>{props.review.user_id.review_count}</b>&nbsp;reviews
          </li>
        </ul>
      </div>
    </div>
    <div className="review-content" style={{ 'verticalAlign': 'bottom', display: 'inline-block', width: '75%', boxsizing: 'border-box' }}>
      <img src={props.review.stars} alt="" /> &nbsp; {moment(props.review.date).format('M/D/YYYY')}
      <br /><br />
      {props.review.text.map((paragraph, index) => <Paragraph paragraph={paragraph} key={index} />)}
      <br /><br />
      <VotePanel review={props.review} />
    </div>
    <br/><br/>
  </li>
);

const Paragraph = props => (
  <p>
    {props.paragraph}
  </p>
);

export default ReviewItem;
