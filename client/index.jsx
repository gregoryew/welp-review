import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { Container, CardDeck, Card, Row } from 'reactstrap';
import ReviewList from './ReviewList.jsx';
import TopReviewBar from './TopReviewBar.jsx';

const queryString = require('query-string');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.search = this.search.bind(this);
    this.sort = this.sort.bind(this);
    this.increaseVote = this.increaseVote.bind(this);
    this.state = {
      reviews: [],
      restaurantId: 0,
      name: '',
      sort: 1,
      page: 0,
      keyword: '',
    };
  }

  componentDidMount() {
    const parsed = queryString.parse(location.search);
    this.setState({
      restaurantId: parsed.restaurant_id,
      page: parsed.page,
      sort: parsed.sort,
    });
    this.retrieveReviews(parsed.restaurant_id);
  }

  retrieveReviews(id, sort, page, keyword = '') {
    const context = this;
    const parsed = queryString.parse(location.search);
    if (id === undefined) { id = this.state.restaurantId; }
    if (sort === undefined) { sort = this.state.sort; }
    if (page === undefined) { page = this.state.page; }
    let urlString = `/api/review/${id}/${sort}/${page}`;
    if (keyword !== '') { urlString += `\\${keyword}`; }
    $.ajax({
      url: urlString,
      dataType: 'json',
      success: data => context.setState({
        reviews: data,
        name: data[0].business_id.name,
      }),
      type: 'GET',
    });
  }

  search(keyword) {
    this.retrieveReviews(undefined, undefined, undefined, keyword);
  }

  sort(option) {
    this.setState({
      sort: option,
    });
    this.retrieveReviews(undefined, option, undefined);
  }

  increaseVote(reviewId, whichButton) {
    alert(reviewId);
    alert(whichButton);
    $.ajax({
      url : `/api/review/votes/${reviewId}/${whichButton}/`,
      error: (err) => {alert(err)},
      success: (data) => {alert('success' + data)},
      type : 'GET',
    });
  }

  render() {
    return (
      <div>
        <div>
          <TopReviewBar name={this.state.name} search={this.search} sort={this.sort} />
        </div>
        <div>
          <ReviewList reviews={this.state.reviews} click={this.increaseVote} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
