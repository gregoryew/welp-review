import React from 'react';

const ReviewItem = (props) => (
  <tr>
    <td>Stars: {props.review.stars}<br/>
    Review: {props.review.text}<br/>
    Useful: {props.review.useful}&nbsp;Funny: {props.review.funny}&nbsp;Cool: {props.review.cool}
    </td>
  </tr>
)

export default ReviewItem;
