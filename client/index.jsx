import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {Container,Row} from 'reactstrap';
import ReviewList from './ReviewList.jsx';
import TopReviewBar from './TopReviewBar.jsx';

const queryString = require('query-string');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      reviews: [],
      name: '',
    };
  }

  componentDidMount() {
    const context = this;
    const parsed = queryString.parse(location.search);
    $.ajax({
      url: `/api/review/${parsed.restaurant_id}`,
      dataType: 'json',
      success: data => context.setState({ reviews: data, name: data[0].business_id.name }),
      type: 'GET',
    });
  }

  render() {
    return (
      <Container>
        <Row><TopReviewBar name={this.state.name} /></Row>
        <Row><ReviewList reviews={this.state.reviews} /></Row>
      </Container>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
