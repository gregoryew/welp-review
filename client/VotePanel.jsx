import React from 'react';
import { withCookies, Cookies } from 'react-cookie';
import $ from 'jquery';
import VoteButton from './VoteButton.jsx';

class VotePanel extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.increaseVote = this.increaseVote.bind(this);
    this.didUserVoteFor = this.didUserVoteFor.bind(this);
    // this.uniqueUnion = this.uniqueUnion.bind(this);
    // this.generateUUID = this.generateUUID.bind(this);
  }

  componentWillMount() {

    const { cookies } = this.props;
 
    let uid = cookies.get('UserID');
    if (uid === undefined) {
      uid = this.generateUUID();
      cookies.set('UserID', uid, { path: '/' });
    }

    let votes = this.uniqueUnion(this.props.review.cool_votes, this.uniqueUnion(this.props.review.useful_votes, this.props.review.funny_votes)).length;

    let coolClassStr = 'ybtn ybtn--small';
    let coolImgStr = 'cool.png';
    let usefulClassStr = 'ybtn ybtn--small';
    let usefulImgStr = 'useful.png';
    let funnyClassStr = 'ybtn ybtn--small';
    let funnyImgStr = 'funny.png';
    const userVotedCool = this.didUserVoteFor(this.props.review.cool_votes, uid);
    if (userVotedCool) { 
      coolClassStr = 'ybtn ybtn--small voted';
      coolImgStr = 'cool-white.png';
    }
    const userVotedFunny = this.didUserVoteFor(this.props.review.funny_votes, uid);
    if (userVotedFunny) {
      funnyClassStr = 'ybtn ybtn--small voted';
      funnyImgStr = 'funny-white.png';
    }
    const userVotedUseful = this.didUserVoteFor(this.props.review.useful_votes, uid);
    if (userVotedUseful) {
      usefulClassStr = 'ybtn ybtn--small voted';
      usefulImgStr = 'useful-white.png';
    }

    const voteString = this.generateVoteString(uid);

    this.state = {
      voteIntro: voteString,
      coolVote: userVotedCool,
      usefulVote: userVotedUseful,
      funnyVote: userVotedFunny,
      coolClass: coolClassStr,
      usefulClass: usefulClassStr,
      funnyClass: funnyClassStr,
      coolImg: coolImgStr,
      usefulImg: usefulImgStr,
      funnyImg: funnyImgStr,
      UserID: uid,
      coolCount: this.props.review.cool,
      usefulCount: this.props.review.useful,
      funnyCount: this.props.review.funny,
    };

  }

   generateVoteString(UserID) {
    const votes = this.uniqueUnion(this.props.review.cool_votes, this.uniqueUnion(this.props.review.useful_votes, this.props.review.funny_votes)).length;

    const userVotedCool = this.didUserVoteFor(this.props.review.cool_votes, UserID);
    const userVotedFunny = this.didUserVoteFor(this.props.review.funny_votes, UserID);
    const userVotedUseful = this.didUserVoteFor(this.props.review.useful_votes, UserID);

    let voteString = '';
    if (userVotedCool || userVotedFunny || userVotedUseful) {
        voteString = 'Thanks for your vote';
      } else if (votes === 0) {
        voteString = 'Was this review ...?';
      } else if (votes === 1) {
        voteString = 'A user voted for this review';
      } else {
        voteString = `${votes} voted for this review.`;
      }
      return voteString;
   }

   generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }

  removeVote(votes) {
    if (votes === undefined) { votes = []; }
    for (let i = votes.length - 1; i >= 0; i -= 1) {
      if (votes[i] === this.state.UserID) {
        votes.splice(i, 1);
      }
    }
    return votes;
  }

  addVote(votes) {
    if (votes === undefined) {votes = [];}
    votes.push(this.state.UserID);
    return votes;
  }

  increaseVote(reviewId, whichButton) {
    var direction = '';
    if (whichButton === 'cool') {
      if (this.state.coolVote) {
        direction = 'down';
        const c = this.state.coolCount - 1;
        this.props.review.cool_votes = this.removeVote(this.props.review.cool_votes);
        const vs = this.generateVoteString(this.state.UserID);
        this.setState({ voteIntro: vs, coolVote: false, coolCount: c, coolClass: 'ybtn ybtn--small', coolImg: './cool.png' });
      } else {
        direction = 'up';
        const c = this.state.coolCount + 1;
        this.props.review.cool_votes = this.addVote(this.props.review.cool_votes);
        const vs = this.generateVoteString(this.state.UserID);
        this.setState({ voteIntro: vs, coolVote: true, coolCount: c, coolClass: 'ybtn ybtn--small voted', coolImg: './cool-white.png' });
      }
    } else if (whichButton === 'funny') {
      if (this.state.funnyVote) {
        direction = 'down';
        const c = this.state.funnyCount - 1;
        this.props.review.funny_votes = this.removeVote(this.props.review.funny_votes);
        const vs = this.generateVoteString(this.state.UserID);
        this.setState({ voteIntro: vs, funnyVote: false, funnyCount: c, funnyClass: 'ybtn ybtn--small', funnyImg: './funny.png' });
      } else {
        direction = 'up';
        const c = this.state.funnyCount + 1;
        this.props.review.funny_votes = this.addVote(this.props.review.funny_votes);
        const vs = this.generateVoteString(this.state.UserID);
        this.setState({ voteIntro: vs, funnyVote: true, funnyCount: c, funnyClass: 'ybtn ybtn--small voted', funnyImg: './funny-white.png' });
      }
    } else if (whichButton === 'useful') {
      if (this.state.usefulVote) {
        direction = 'down';
        const c = this.state.usefulCount - 1;
        this.props.review.useful_votes = this.removeVote(this.props.review.useful_votes);
        const vs = this.generateVoteString(this.state.UserID);
        this.setState({ voteIntro: vs, usefulVote: false, usefulCount: c, usefulClass: 'ybtn ybtn--small', usefulImg: './useful.png' });
      } else {
        direction = 'up';
        const c = this.state.usefulCount + 1;
        this.props.review.useful_votes = this.addVote(this.props.review.useful_votes);
        const vs = this.generateVoteString(this.state.UserID);
        this.setState({ voteIntro: vs, usefulVote: true, usefulCount: c, usefulClass: 'ybtn ybtn--small voted', usefulImg: './useful-white.png' });
      }
    }

    $.ajax({
      url: `/api/review/votes/${reviewId}/${whichButton}/${direction}/${this.state.UserID}`,
      error: (err) => {console.log(err)},
      success: (data) => {console.log(data)},
      type: 'GET',
    });
  }

  uniqueUnion(a, b) {
    if (a === undefined) { a = []; }
    if (b === undefined) { b = []; }
    var c = a.concat(b.filter(function (item) {
      return a.indexOf(item) < 0;
    }));
    return c;
  }

  didUserVoteFor(voteCategory, UserID) {
    if (voteCategory === undefined) { return false; }
    var found = false;
    found = voteCategory.includes(UserID);
    return found;
  }

  render() {
    return (
      <div className="review-footer clearfix">
        <div className="rateReview voting-feedback">
          <p className="voting-intro voting prompt">
            {this.state.voteIntro}
          </p>
          <ul>
            <VoteButton click={this.increaseVote} reviewId={this.props.review.review_id} title="useful" imageUrl={this.state.usefulImg} count={this.state.usefulCount} userVoted={this.state.usefulClass} />&nbsp;
            <VoteButton click={this.increaseVote} reviewId={this.props.review.review_id} title="funny" imageUrl={this.state.funnyImg} count={this.state.funnyCount} userVoted={this.state.funnyClass} />&nbsp;
            <VoteButton click={this.increaseVote} reviewId={this.props.review.review_id} title="cool" imageUrl={this.state.coolImg} count={this.state.coolCount} userVoted={this.state.coolClass} />
          </ul>
        </div>
      </div>
    );
  }
}

export default withCookies(VotePanel);
