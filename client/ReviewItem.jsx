import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const ReviewItem = props => (
  <Container>
  <Row>
  Stars: {props.review.stars}
  </Row>
  <Row>
  Review: {props.review.text}
  </Row>
  <Row>
  Useful: {props.review.useful}&nbsp;Funny: {props.review.funny}&nbsp;Cool: {props.review.cool}
  </Row>
  </Container>
);

export default ReviewItem;
