const mongoose = require('mongoose');

const retrieve = (id, sort, page, keyword, callback) => {
  mongoose.connect('mongodb://localhost/test');
  const { connection } = mongoose;

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
              stars = `./stars/${Math.floor(stars).toString()}_5.png`;
            } else {
              stars = `./stars/${stars}.png`;
            }
            data[i].stars = stars;
          }
          callback(null, data);
        }
      });
    });
  });
};

const update = (reviewId, voteId, callback) => {
  mongoose.connect('mongodb://localhost/test');
  const { connection } = mongoose;

  const columnObj = JSON.parse(`{"${voteId}": 1}`);

  connection.on('error', console.error.bind(console, 'connection error:'));
  connection.once('open', () => {
    connection.db.collection('reviews', (err, collection) => {
      collection.findOneAndUpdate({ review_id: reviewId },
        { $inc: columnObj },
        (err2, review) => {
          if (err2) {
            callback(err2, null);
          } else {
            callback(null, review);
          }
        })
      });
    })
};

module.exports.retrieve = retrieve;
module.exports.update = update;
