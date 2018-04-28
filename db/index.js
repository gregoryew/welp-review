const mongoose = require('mongoose');

const retrieve = (redis, id, sort, page, keyword, callback) => {
  
  const conf = { 
    hostname: process.env.MONGO_HOSTNAME || 'localhost', 
    port: process.env.MONGO_PORT || 27017, 
    env: process.env.MONGO_ENV || 'local', 
  };
  
  let dbUser
  if (process.env.MONGO_USER && process.env.MONGO_PASS) { 
    dbUser = {user: process.env.MONGO_USER, pass: process.env.MONGO_PASS} 
  } else {
    dbUser = undefined; // on local dev not required 
  }
  //console.log(`mongodb://${conf.hostname}:${conf.port}/${conf.env}`);
  // mongoose.connect(`mongodb://${conf.hostname}:${conf.port}/${conf.env}`, dbUser);
  mongoose.connect('mongodb://student:student@ds157639.mlab.com:57639/welp');
  //mongoose.connect('mongodb://database:27017/welp');

  //mongoose.connect('mongodb://localhost/welp');
  const { connection } = mongoose;

  redis.get(id, sort, page, keyword, (err, reply) => {
    connection.on('error', console.error.bind(console, 'connection error:'));
    connection.once('open', () => {
      connection.db.collection('reviews', (err, collection) => {    
        let criteria = {};
        if (keyword !== '') {
          criteria = { 'business_id._id': Number.parseInt(id, 10), text: new RegExp(keyword, 'i') };
        } else {
          criteria = { 'business_id._id': Number.parseInt(id, 10) };
        }

        const sortingOptions = [{}, { date: -1 }, { date: 1 }, { stars: -1 }, { stars: 1 }, {}];
        const sortBy = sortingOptions[parseInt(sort, 10)];

        collection.find(criteria).sort(sortBy).toArray((err2, data) => {
          if (err2) {
            callback(err2, null);
          } else {
            for (let i = 0; i < data.length; i += 1) {
              const text = data[i].text.split('\n');
              data[i].text = text;

              let { stars } = data[i];
              if (Math.trunc(stars) !== stars) {
                stars = `https://s3.amazonaws.com/hrsf93welpusers/${Math.floor(stars).toString()}_5.png`;
              } else {
                stars = `https://s3.amazonaws.com/hrsf93welpusers/${stars}.png`;
              }
              data[i].stars = stars;
            }
            redis.set(id, sort, page, keyword, JSON.stringify(data), () => {
              callback(null, data);
            });
          }
        });
      });
    });
  });
};

const update = (reviewId, voteId, direction, userID, callback) => {
  mongoose.connect('mongodb://student:student@ds157639.mlab.com:57639/welp');
  const { connection } = mongoose;

  let columnObj = {};
  let columnElm = {};
  if (direction === 'up') {
    columnObj = JSON.parse(`{"${voteId}": 1}`);
    columnElm = JSON.parse(`{"${voteId}_votes": "${userID}"}`);
    let findCriteria = {};
    if (voteId === 'cool') {
      findCriteria = { review_id: reviewId, $or: [{ cool_votes: { $nin: [userID] } }, { cool_votes: null }] };
    } else if (voteId === 'useful') {
      findCriteria = { review_id: reviewId, $or: [{ useful_votes: { $nin: [userID] } }, { useful_votes: null }] };
    } else if (voteId === 'funny') {
      findCriteria = { review_id: reviewId, $or: [{ funny_votes: { $nin: [userID] } }, { funny_votes: null }] };
    }
    connection.on('error', console.error.bind(console, 'connection error:'));
    connection.once('open', () => {
      connection.db.collection('reviews', (err, collection) => {
        collection.update(findCriteria,
          { $inc: columnObj, $push: columnElm }, true,
          (err2, review) => {
            if (err2) {
              callback(err2, null);
            } else {
              callback(null, review);
            }
          })
        });
      })
  } else {
    columnObj = JSON.parse(`{"${voteId}": -1}`);    
    columnElm = JSON.parse(`{"${voteId}_votes": "${userID}"}`);
    connection.on('error', console.error.bind(console, 'connection error:'));
    connection.once('open', () => {
      connection.db.collection('reviews', (err, collection) => {
        collection.update({ review_id: reviewId },
          { $inc: columnObj, $pull: columnElm }, true,
          (err2, review) => {
            if (err2) {
              callback(err2, null);
            } else {
              callback(null, review);
            }
          })
        });
      })
  }

};

module.exports.retrieve = retrieve;
module.exports.update = update;
