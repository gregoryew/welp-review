const mongoose = require('mongoose');

const retrieve = (id, callback) => {
  mongoose.connect('mongodb://localhost/test');
  const { connection } = mongoose;

  connection.on('error', console.error.bind(console, 'connection error:'));
  connection.once('open', () => {
    connection.db.collection('reviews', (err, collection) => {
      collection.find({ 'business_id._id': Number.parseInt(id, 10) }).toArray((err2, data) => {
        if (err2) {
          callback(err2, null);
        } else {
          for (let i = 0; i < data.length; i += 1) {
            let text = data[i].text.split('\n');
            console.log(text);
            data[i].text = text;
          }
          callback(null, data);
        } // it will print your collection data
      });
    });
  });
}

module.exports.retrieve = retrieve;
