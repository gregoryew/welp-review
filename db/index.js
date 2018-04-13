var mongoose = require("mongoose");

var retrieve = function(id, callback) {

    mongoose.connect('mongodb://localhost/test');
    var connection = mongoose.connection;

    connection.on('error', console.error.bind(console, 'connection error:'));
    connection.once('open', function () {
        connection.db.collection("reviews", function(err, collection){
            collection.find({ "business_id._id" : Number.parseInt(id) }).toArray(function(err, data){
                if (err) { callback(err, null) } else
                {
                    callback(null, data)
                }; // it will print your collection data
            })
        });
    });
}

module.exports.retrieve = retrieve;