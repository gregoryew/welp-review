const db = require('../db');

describe('Database Tests', () => {
  test('Should retrieve reviews', (done) => {
    db.retrieve(46, 0, 0, '', (err, data) => {
      expect(Array.isArray(data)).toBe(true);
      done();
    });
  });

  test('Should retrieve no reviews when given a key that has no reviews', (done) => {
    db.retrieve(101, 0, 0, '', (err, data) => {
      expect(data.length).toBe(0);
      done();
    });
  });

  test('Should retrieve reviews in descending chronological order', (done) => {
    db.retrieve(46, 1, 0, '', (err, data) => {
      expect(data[0].date > data[data.length - 1].date).toBe(true);
      done();
    });
  });

  test('Should retrieve reviews in ascending chronological order', (done) => {
    db.retrieve(46, 2, 0, '', (err, data) => {
      expect(data[0].date < data[data.length - 1].date).toBe(true);
      done();
    });
  });

  test('Should retrieve reviews in descending rating order', (done) => {
    db.retrieve(46, 3, 0, '', (err, data) => {
      expect(data[0].stars > data[data.length - 1].stars).toBe(true);
      done();
    });
  });

  test('Should retrieve reviews in descending rating order', (done) => {
    db.retrieve(46, 4, 0, '', (err, data) => {
      expect(data[0].stars < data[data.length - 1].stars).toBe(true);
      done();
    });
  });

  test('Should retrieve reviews containing the keyword employees', (done) => {
    db.retrieve(5, 0, 0, 'employees', (err, data) => {
      expect(data[0].text[0].indexOf('employees') > 0).toBe(true);
      done();
    });
  });

  test('Should not retrieve reviews searching for keyword employees', (done) => {
    db.retrieve(46, 0, 0, 'employees', (err, data) => {
      expect(data.length === 0).toBe(true);
      done();   
    });
  });

  // (reviewId, voteId, direction, userID, callback)

  test('Should update the coolvoting array', (done) => {
    db.update('L29UAh3Ew-MbWurDEVr4HQ', 'cool', 'up', '1', (err, data) => {
      expect(err).toBe(null);
      done();
    });
  });

  test('Should update the funnyvoting array', (done) => {
    db.update('L29UAh3Ew-MbWurDEVr4HQ', 'funny', 'up', '1', (err, data) => {
      expect(err).toBe(null);
      done();
    });
  });

  test('Should update the funnyvoting array', (done) => {
    db.update('L29UAh3Ew-MbWurDEVr4HQ', 'useful', 'up', '1', (err, data) => {
      expect(err).toBe(null);
      done();
    });
  });

  test('Should remove from the coolvoting array', (done) => {
    db.update('L29UAh3Ew-MbWurDEVr4HQ', 'cool', 'down', '1', (err, data) => {
      expect(err).toBe(null);
      done();
    });
  });

  test('Should remove from the funnyvoting array', (done) => {
    db.update('L29UAh3Ew-MbWurDEVr4HQ', 'funny', 'down', '1', (err, data) => {
      expect(err).toBe(null);
      done();
    });
  });

  test('Should remove from usefulvoting array', (done) => {
    db.update('L29UAh3Ew-MbWurDEVr4HQ', 'useful', 'down', '1', (err, data) => {
      expect(err).toBe(null);
      done();
    });
  });
});
