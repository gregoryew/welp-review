import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ReviewList from './ReviewList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      reviews: []
    }
  }

  componentDidMount() {
    var context = this;
    console.log('testing');
    const urlParams = new URLSearchParams(this.props.location.search)
    console.log('urlParams begin');
    console.log(urlParams);
    console.log('urlParams end');
    //const key = urlParams.get('id')
    $.ajax({
     url: "/welp/review/46",
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