const express = require('express');
const bodyParser = require("body-parser");
const db = require('../db/index.js');
let app = express();

var jsonParser = bodyParser.json();

app.use(express.static(__dirname + '/../public'));

app.use(jsonParser);

app.get('/welp/review/:id', function (req, res) {
  db.retrieve(req.params.id, function(err, reviews) {
    if (err) {res.sendStatus(500)}
    else {res.json(reviews)};
  });
});

let port = process.env.PORT || 3004;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
