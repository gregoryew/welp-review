import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ReviewList from './ReviewList.jsx';
const queryString = require('query-string');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = { 
      reviews: []
    }
  }

  componentDidMount() {
    var context = this;
    const parsed = queryString.parse(location.search);
    $.ajax({
     url: "/welp/review/" + parsed.restaurant_id,
     error: function() {
        alert('error')
     },
     dataType: 'json',
     success: function(data) {
       context.setState({reviews: data});
     },
     type: 'GET'
    });
  }

  render () {
    return (<div>
      <h1>Reviews</h1>
      <ReviewList reviews={this.state.reviews}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));