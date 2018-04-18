import React from 'react';
import moment from 'moment';
import VoteButton from './VoteButton.jsx';

const ReviewItem = props => (
  <li className="review-wrapper">
    <table>
    <tr>
    <td width="130" valign="top">
    <div className="review review--with-sidebar">
      <div className="review-sidebar">
        <div className="review-sidebar">
          <div className="review-sidebar-content">
            <div className="ypassport media-block">
              <div className="media-avatar responsive-photo-box">
                <div className="photo-box pb-60s">
                  <img src={props.review.user_id.picture} className="js-analytics-click" alt={props.review.user_id.name} width="60" />
                </div>
              </div>
            </div>
            <div className="media-story">
              <ul className="user-passport-status">
                <li className="user-display-name js-analytics-click">
                  {props.review.user_id.name}
                </li>
                <li className="friend-count responsive-small-display-inline-block">
                  {props.review.user_id.friends.length}&nbsp;friends
                </li>
                <li className="review-count responsive-small-display-inline-block">
                  {props.review.user_id.review_count}&nbsp;reviews
                </li>
              </ul>
            </div>
          </div>
        </div>
        </div>
        </div>
      </td>
      <td>
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
    </td>
    </tr>
    </table>
    <br/><br/>
  </li>
);

const Paragraph = props => (
  <p>
    {props.paragraph}
  </p>
);

export default ReviewItem;
