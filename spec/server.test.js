import EXAMPLE_REVIEW from './data/exampleReview.js';
import reviewdateasc from './data/exampleReviewSortedDateAsc.js';
import exampleReviewDateDesc from './data/exampleReviewSortedDateDesc.js';
import exReviewSortedRateAsc from './data/exampleReviewSortedRateAsc.js';
import exReviewSortedRateDesc from './data/exampleReviewSortedRateDesc.js';
import exampleReviewKeywordMatch from './data/exampleReviewKeywordMatch.js';

const request = require('request');

const uri = 'http://127.0.0.1:3004';

const identical = function (a, b, sortArrays) {
  function sort(object) {
      if (sortArrays === true && Array.isArray(object)) {
          return object.sort();
      }
      else if (typeof object !== "object" || object === null) {
          return object;
      }

      return Object.keys(object).sort().map(function(key) {
          return {
              key: key,
              value: sort(object[key])
          };
      });
  }
  
  return JSON.stringify(sort(a)) === JSON.stringify(sort(b));
};

describe('Testing server', () => {
  test('Should match sample review', (done) => {
    request({
      method: 'GET',
      uri: uri + '/api/review/2/0/0',
    }, (err, res, body) => {
      expect(err).toBe(null);
      let exampleReview = JSON.parse(EXAMPLE_REVIEW);
      let actualReview = JSON.parse(body);
      expect(identical(exampleReview, actualReview)).toBe(true);
      done();
    });
  });

  test('Should match sample review date desc', (done) => {
    request({
      method: 'GET',
      uri: uri + '/api/review/5/1/0',
    }, (err, res, body) => {
      expect(err).toBe(null);
      expect(res.statusCode).toBe(200);
      let exampleDateDesc = JSON.parse(exampleReviewDateDesc);
      let actualReview = JSON.parse(body);
      expect(identical(exampleDateDesc, actualReview)).toBe(true);
      done();
    });
  });

  test('Should match sample review date asc', (done) => {
    request({
      method: 'GET',
      uri: uri + '/api/review/5/2/0',
    }, (err, res, body) => {
      expect(err).toBe(null);
      expect(res.statusCode).toBe(200);
      let reviewdateasc2 = JSON.parse(reviewdateasc);
      let actualReview = JSON.parse(body);
      expect(identical(reviewdateasc2, actualReview)).toBe(true);
      done();
    });
  });

  test('Should match sample review rate desc', (done) => {
    request({
      method: 'GET',
      uri: uri + '/api/review/5/3/0',
    }, (err, res, body) => {
      expect(err).toBe(null);
      expect(res.statusCode).toBe(200);
      let reviewratedesc2 = JSON.parse(exReviewSortedRateDesc);
      let actualReview = JSON.parse(body);
      expect(identical(reviewratedesc2, actualReview)).toBe(true);
      done();
    });
  });

  test('Should match sample review rate asc', (done) => {
    request({
      method: 'GET',
      uri: uri + '/api/review/5/4/0',
    }, (err, res, body) => {
      expect(err).toBe(null);
      expect(res.statusCode).toBe(200);
      let reviewrateasc2 = JSON.parse(exReviewSortedRateAsc);
      let actualReview = JSON.parse(body);
      expect(identical(reviewrateasc2, actualReview)).toBe(true);
      done();
    });
  });

  test('Should match sample review keyword match employees', (done) => {
    request({
      method: 'GET',
      uri: uri + '/api/review/5/4/0/employees',
    }, (err, res, body) => {
      expect(err).toBe(null);
      expect(res.statusCode).toBe(200);
      let exReviewKeywordMatch = JSON.parse(exampleReviewKeywordMatch);
      let actualReview = JSON.parse(body);
      expect(identical(exReviewKeywordMatch, actualReview)).toBe(true);
      done();
    });
  });

  test('Should return 404 when no id provided', (done) => {
    request({
      method: 'GET',
      uri: uri + '/api/review/',
    }, (err, res, body) => {
      expect(err).toBe(null);
      expect(res.statusCode).toBe(404);
      done();
    });
  });
});