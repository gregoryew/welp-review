import React from 'react';
import ReactDOM from 'react-dom';
import { Container, CardDeck, Card, Row } from 'reactstrap';
import $ from 'jquery';
import ReviewList from './ReviewList.jsx';
import TopReviewBar from './TopReviewBar.jsx';
import { CookiesProvider } from 'react-cookie';

const queryString = require('query-string');

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.search = this.search.bind(this);
    this.sort = this.sort.bind(this);
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
    // If the querystring has no paramaters then check the props
    // This is done for testing purposes to interface with jest and snapshots. 
    const parsed = queryString.parse(location.search);
    if (Object.keys(parsed).length !== 0) {
      this.setState({
        restaurantId: parsed.id,
        page: parsed.page,
        sort: parsed.sort,
      });
      this.retrieveReviews(parsed.id);
    } else {
      this.setState({
        restaurantId: this.props.restaurantId,
        page: this.props.page,
        sort: this.props.sort,
        reviews: JSON.parse(this.props.data),
      });
    }
  }

  retrieveReviews(id, sort, page, keyword = '') {
    const context = this;
    const parsed = queryString.parse(location.search);
    if (id === undefined) { id = this.state.restaurantId; }
    if (sort === undefined) { sort = this.state.sort; }
    if (page === undefined) { page = this.state.page; }
    let urlString = `http://127.0.0.1:3004/api/review/${id}/${sort}/${page}`;
    if (keyword !== '') { urlString += `\\${keyword}`; }
    $.ajax({
      url: urlString,
      dataType: 'json',
      success: (data) => {
        context.setState({
          reviews: data,
          name: data[0].business_id.name,
        });
      },
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

  render() {
    return (
      <CookiesProvider>
        <div>
          <div>
            <TopReviewBar name={this.state.name} search={this.search} sort={this.sort} />
          </div>
          <div>
            <ReviewList reviews={this.state.reviews} />
          </div>
        </div>
      </CookiesProvider>
    );
  }
}

ReactDOM.render(<Reviews />, document.getElementById('Reviews'));

export default Reviews;
